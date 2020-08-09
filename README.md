## Description

Gatsby source plugin for Google Cloud Platform Storage

## How to install

> `npm i gatsby-source-google-storage`

## Usage

1. Create a GCP Service Account with the role of _"Storage Object Admin"_.\
   [Console Link](https://console.cloud.google.com/apis/credentials)
2. Add a new Key of type JSON. The file will automatically download to your system. Save to your Gatsby project root. **Do not add to your static folder.**
3. Add plugin to _gatsby-config.js_\
   The **signedUrl** `expiration` property of this plugin is based upon build time, not real-time access; therefore, always ensure to set your expiration at a time later than the your next planned build.

```js
// In your gatsby-config.js
plugins: [
	{
		resolve: 'gatsby-source-google-storage',
		options: {
			projectId: 'my-project-name',
			keyFilename: path.resolve('my-service-account-credentials.json'),
			buckets: ['bucket-name-1', 'bucket-name-2'],
			expiration: Date.now() + 1000 * 60 * 60, // optional, default one-hour
		},
	},
]
```

## Spot me a coffee ☕

If you found this plugin useful, any donations are welcome.

![XRP QR Code](https://drive.google.com/thumbnail?id=1LSo_RQvLTgh3F3YNioQlmJNanTSLx7Wp&sz=w200-h200)
