// Configure plugins

module.exports = ({ env }) => ({
  // BUCKET
  upload: {
    config: {
      provider: "aws-s3",
      providerOptions: {
        accessKeyId: env("AWS_ACCESS_KEY_ID"),
        secretAccessKey: env("AWS_ACCESS_SECRET"),
        region: env("AWS_REGION"),
        params: {
          Bucket: env("AWS_BUCKET"),
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
      },
    },
  },
});
