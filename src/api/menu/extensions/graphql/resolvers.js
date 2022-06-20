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
const PRODUCTS = [
  "category",
  "category.localizations",
  "category.product.localizations",
  "category.product.product",
  "category.product.product.localizations",
];
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
            slug: {
              $eq: param.slug,
            },
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

        let menu = await strapi.entityService.findMany("api::menu.menu", {
          filters: {
            slug: {
              $eq: "giorgiatrattoria",
            },
          },
          populate: PRODUCTS,
        });

        console.dir(menu, { depth: null });
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

// Will remove comment later
// if (locale === "en") {
//   // Find the menu (default language is en)
//   menu = await strapi.entityService.findMany("api::menu.menu", {
//     filters: {
//       slug: {
//         $eq: param.slug,
//       },
//     },
//     populate: FIELDS,
//   });
//   menu = menu[0];
// } else {
//   // Find all the existing locale
//   const allLocales = await strapi.entityService.findMany(
//     "api::menu.menu",
//     {
//       filters: {
//         slug: {
//           $eq: param.slug,
//         },
//       },
//       populate: {
//         localizations: true,
//       },
//     }
//   );
//   const getIdFromLocale = async (locale) => {
//     return await allLocales[0].localizations.find(
//       (l) => l.locale === locale
//     )?.id;
//   };

//   const currentId = await getIdFromLocale(locale);
//   // If locale exist get the menu

//   if (currentId) {
//     menu = await strapi.entityService.findOne(
//       "api::menu.menu",
//       await getIdFromLocale(locale),
//       {
//         populate: FIELDS,
//       }
//     );
//   }
// }
