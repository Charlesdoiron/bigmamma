// Configure plugins

module.exports = {
  // GQL
  graphql: {
    config: {
      playgroundAlways: true,
      defaultLimit: 500,
      maxLimit: 10000,
      apolloServer: {
        introspection: true,
      },
    },
  },
};
