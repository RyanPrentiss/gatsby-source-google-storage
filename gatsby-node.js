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

exports.sourceNodes = async (
	{ actions, createNodeId, createContentDigest },
	config
) => {
	const files = await getFiles(config)

	files.forEach((file) => {
		const node = {
			id: createNodeId(`GCPStorage-${file.id}`),
			internal: {
				type: 'GCPStorage',
				contentDigest: createContentDigest(file),
			},
			metadata: file.metadata,
			baseUrl: file.baseUrl,
			name: file.name,
		}
		actions.createNode(node)
	})
}
