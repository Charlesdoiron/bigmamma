const { getAvailableCategories } = require("../../../../utils/menu/checkers");
const { getAllProductsByMenu } = require("../../../../utils/menu/checkers");
const bcrypt = require("bcryptjs");
// ---- QUERIES
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
const PRODUCTS = ["category", "category.product.product"];
const queries = (strapi) => {
  return {
    getAvailableCategories: {
      async resolve(obj, param, context) {
        const queryURL = param.queryURL?.toLowerCase();
        const locale = param.locale;
        let menu;

        menu = await strapi.entityService.findMany("api::menu.menu", {
          filters: {
            $and: [
              {
                slug: {
                  $eq: param.slug,
                },
                locale: { $eq: locale },
              },
            ],
          },
          populate: FIELDS,
          locale,
        });
        menu = menu[0];

        return await getAvailableCategories(menu, queryURL, locale);
      },
    },
    getAllProductsByMenu: {
      async resolve(obj, param, context) {
        const password = param.password?.toLowerCase();
        const menu = await strapi.entityService.findMany("api::menu.menu", {
          filters: {
            $and: [
              {
                slug: {
                  $eq: param.slug,
                },
                locale: { $eq: "en" },
              },
            ],
          },
          populate: PRODUCTS,
        });

        if (!menu[0]) {
          throw new Error("Menu not found");
        }
        const validatePassword = async (password, hash) =>
          await bcrypt.compare(password, hash);

        const isValid = await validatePassword(password, menu[0].password);

        if (isValid) {
          return getAllProductsByMenu(menu);
        }
        throw new Error("Wrong password");
      },
    },
  };
};

// ---- MUTATIONS

const mutations = (strapi) => {
  // TODO: GET FROM PARAMS

  return {
    updateProductAvailablity: {
      async resolve(obj, param, context) {
        const RELATIONAL_PROD_ID = parseInt(param.relational_product_id);
        const PRODUCT_ID = parseInt(param.product_id);
        const DEFAULT_LOCALE = "en";

        let menu = await strapi.entityService.findMany("api::menu.menu", {
          filters: {
            $and: [
              {
                slug: {
                  $eq: param.slug,
                },
                locale: { $eq: DEFAULT_LOCALE },
              },
            ],
          },
          populate: PRODUCTS,
        });

        const categories = menu[0].category;
        const MENU_ID = menu[0].id;

        categories.forEach((cat) =>
          cat.product.forEach((p) => {
            if (p.id === RELATIONAL_PROD_ID) {
              p.is_unavailable = !p.is_unavailable;
            }
          })
        );

        strapi.entityService.update("api::menu.menu", MENU_ID, {
          data: {
            category: [...categories],
          },
        });

        let locales = await strapi.entityService.findMany("api::menu.menu", {
          filters: {
            $and: [
              {
                slug: {
                  $eq: param.slug,
                },
              },
            ],
          },
        });
        const availableLocales = locales.map((el) => {
          return {
            locale: el.locale,
            id: el.id,
          };
        });

        if (!availableLocales.every((el) => el.locale === DEFAULT_LOCALE)) {
          availableLocales.forEach(async (el, idx) => {
            let menu = await strapi.entityService.findMany("api::menu.menu", {
              filters: {
                $and: [
                  {
                    slug: {
                      $eq: param.slug,
                    },
                    locale: { $eq: el.locale },
                  },
                ],
              },
              populate: PRODUCTS,
            });
            const categories = await menu[0].category;
            let MENU_ID = menu[0].id;

            await categories.forEach((cat) =>
              cat?.product.forEach((p) => {
                if (p.product?.id === PRODUCT_ID) {
                  p.is_unavailable = !p.is_unavailable;
                }
              })
            );

            await strapi.entityService.update("api::menu.menu", MENU_ID, {
              data: {
                category: [...categories],
              },
            });
          });
        }
      },
    },
  };
};

const resolvers = {
  queries,
  mutations,
};

module.exports = {
  resolvers,
};
