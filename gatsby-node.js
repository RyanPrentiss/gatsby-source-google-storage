const { Storage } = require('@google-cloud/storage')

exports.sourceNodes = async (
    { actions, createNodeId, createContentDigest },
    config
) => {
    const { projectId, keyFilename, bucket } = config
    const storage = new Storage({ projectId, keyFilename })
    const [files] = await storage.bucket(bucket).getFiles()

    files.forEach(file => {
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
