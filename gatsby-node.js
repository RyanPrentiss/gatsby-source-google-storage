const { Storage } = require('@google-cloud/storage')

const getFiles = async ({ projectId, keyFilename, buckets }) => {
	const storage = new Storage({ projectId, keyFilename })

	let allFiles = []
	for (const bucket of buckets) {
		const [files] = await storage.bucket(bucket).getFiles()
		await allFiles.push.apply(allFiles, files)
	}
	return allFiles
}

getSignedUrl = async (
	bucket,
	file,
	{ projectId, keyFilename, expiration = Date.now() + 1000 * 60 * 60 }
) => {
	const storage = new Storage({ projectId, keyFilename })

	const signedOptions = {
		version: 'v4',
		action: 'read',
		expires: expiration,
	}

	return await storage.bucket(bucket).file(file).getSignedUrl(signedOptions)
}

exports.sourceNodes = async (
	{ actions, createNodeId, createContentDigest },
	config
) => {
	const files = await getFiles(config)

	for (const file of files) {
		const node = {
			id: createNodeId(`GoogleStorage-${file.id}`),
			internal: {
				type: 'GoogleStorage',
				contentDigest: createContentDigest(file),
			},
			metadata: file.metadata,
			baseUrl: file.baseUrl,
			name: file.name,
			signedUrl: await getSignedUrl(file.bucket.name, file.name, config),
		}
		actions.createNode(node)
	}
}
