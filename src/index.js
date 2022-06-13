"use strict";
// const wines = require("./data/wine.json");
// const products = require("./data/products.json");
// const categories = require("./data/categories.json");

// const removeDuplicatesFromArray = (arr) =>
//   [...new Set(arr.map((el) => JSON.stringify(el)))].map((e) => JSON.parse(e));

// Extending menu
const {
  typeDefs: menuTypes,
} = require("./api/menu/extensions/graphql/type-defs");
const {
  resolvers: menuResolvers,
} = require("./api/menu/extensions/graphql/resolvers");

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }) {
    const extensionService = strapi.plugin("graphql").service("extension");
    const typeDefs = `
      ${menuTypes}
    `;
    const extension = ({ nexus }) => ({
      // GQL SDL
      typeDefs: typeDefs,

      // GQL Resolvers
      resolvers: {
        Query: {
          ...menuResolvers.queries(strapi),
        },
        Mutation: {
          ...menuResolvers.mutations(strapi),
        },
      },
      // GQL Config
      resolversConfig: {
        "Query.getAvailableCategories": {
          auth: false,
        },
        "Query.getAllProductsByMenu": {
          auth: false,
        },
      },
    });

    extensionService.use(extension);
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) {
    // removeDuplicatesFromArray(categories).map(async ({ title }) => {
    //   await strapi.entityService.create("api::sub-category.sub-category", {
    //     data: {
    //       title,
    //     },
    //   });
    // });
    // removeDuplicatesFromArray(products).map(
    //   async ({ title, description, default_price }) => {
    //     await strapi.entityService.create("api::product.product", {
    //       data: {
    //         title,
    //         description,
    //         default_price: default_price.toString(),
    //       },
    //     });
    //   }
    // );
    // removeDuplicatesFromArray(wines).map(
    //   async ({ title, description, default_price }) => {
    //     await strapi.entityService.create("api::wine.wine", {
    //       data: {
    //         title,
    //         description,
    //         default_price: default_price.toString(),
    //       },
    //     });
    //   }
    // );
  },
};
