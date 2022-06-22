// Configure plugins

module.exports = ({ env }) => ({
  // BUCKET
  upload: {
    config: {
      provider: "aws-s3",
      providerOptions: {
        accessKeyId: env("BUCKETEER_AWS_ACCESS_KEY_ID"),
        secretAccessKey: env("BUCKETEER_AWS_SECRET_ACCESS_KEY"),
        region: env("BUCKETEER_AWS_REGION"),
        params: {
          Bucket: env("BUCKETEER_BUCKET_NAME"),
        },
      },
    },
  },
  // GQL
  graphql: {
    config: {
      endpoint: "/graphql",
      shadowCRUD: true,
      playgroundAlways: true,
      defaultLimit: 500,
      maxLimit: 10000,
      apolloServer: {
        introspection: true,
        tracing: true,
      },
    },
  },
  "import-export-entries": {
    enabled: true,
  },
});
