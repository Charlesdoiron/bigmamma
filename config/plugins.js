// Configure plugins

module.exports = {
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
};
