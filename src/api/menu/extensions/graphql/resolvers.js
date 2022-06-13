const { getAvailableCategories } = require("../../../../utils/menu/checkers");
const { getAllProductsByMenu } = require("../../../../utils/menu/checkers");

// ---- QUERIES

const queries = (strapi) => {
  const FIELDS = [
    "localizations",
    "category",
    "category.product",
    "category.wine",
    "category.product.wine",
    "category.product.product",
    "category.product.product.image",
    "category.product.product.tags",
    "category.product.product.gif",
    "category.product.product.video",
    "category.product.product.allergens",
    "category.product.services",
    "category.product.sub_category",
    "services",
    "services.service",
    "services.days",
  ];
  const PRODUCTS = [
    "localizations",
    "localizations.category",
    "localizations.category.product",
    "category",
    "category.product.localizations",
    "category.product.product",
    "category.product.product.localizations",
  ];
  return {
    getAvailableCategories: {
      async resolve(obj, param, context) {
        const queryURL = param.queryURL?.toLowerCase();
        const locale = param.locale;
        let menu;

        if (locale === "en") {
          // Find the menu (default language is en)
          menu = await strapi.entityService.findMany("api::menu.menu", {
            filters: {
              slug: {
                $eq: param.slug,
              },
            },
            populate: FIELDS,
          });
          menu = menu[0];
        } else {
          // Find all the existing locale

          const allLocales = await strapi.entityService.findMany(
            "api::menu.menu",
            {
              filters: {
                slug: {
                  $eq: param.slug,
                },
              },
              populate: {
                localizations: true,
              },
            }
          );
          const getIdFromLocale = async (locale) => {
            return await allLocales[0].localizations.find(
              (l) => l.locale === locale
            )?.id;
          };

          const currentId = await getIdFromLocale(locale);
          // If locale exist get the menu

          if (currentId) {
            menu = await strapi.entityService.findOne(
              "api::menu.menu",
              await getIdFromLocale(locale),
              {
                populate: FIELDS,
              }
            );
          }
        }
        // console.dir(menu, { depth: null });
        return await getAvailableCategories(menu, queryURL);
      },
    },
    getAllProductsByMenu: {
      async resolve(obj, param, context) {
        const password = param.password?.toLowerCase();
        const menu = await strapi.entityService.findMany("api::menu.menu", {
          filters: {
            slug: {
              $eq: param.slug,
            },
          },
          populate: PRODUCTS,
        });

        // if (param.password === menu[0].password) {
        if (param.password === "pass") {
          return getAllProductsByMenu(menu);
        }
        return "Wrong password";
      },
    },
  };
};

// ---- MUTATIONS

const mutations = (strapi) => {
  return {};
};

const resolvers = {
  queries,
  mutations,
};

module.exports = {
  resolvers,
};
