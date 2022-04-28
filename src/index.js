"use strict";
const data = require("./data/wine.json");

const removeDuplicatesFromArray = (arr) =>
  [...new Set(arr.map((el) => JSON.stringify(el)))].map((e) => JSON.parse(e));

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) {
    // removeDuplicatesFromArray(data).map(async ({ title }) => {
    //   await strapi.entityService.create("api::sub-category.sub-category", {
    //     data: {
    //       title,
    //     },
    //   });
    // });
    // removeDuplicatesFromArray(data).map(
    //   async ({ title, description, price }) => {
    //     await strapi.entityService.create("api::product.product", {
    //       data: {
    //         title,
    //         description,
    //       },
    //     });
    //   }
    // );
    // removeDuplicatesFromArray(data).map(
    //   async ({ title, description, price }) => {
    //     await strapi.entityService.create("api::wine.wine", {
    //       data: {
    //         title,
    //         description,
    //         price,
    //       },
    //     });
    //   }
    // );
  },
};
