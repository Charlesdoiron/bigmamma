const dayjs = require("dayjs");
const isBetween = require("dayjs/plugin/isBetween");
const { getDayOfWeek } = require("./../days");

const utc = require("dayjs/plugin/utc");
const TZ = require("dayjs/plugin/timezone");

dayjs.extend(isBetween);
dayjs.extend(utc);
dayjs.extend(TZ);
const currentDay = dayjs().get("d");
async function getAvailableCategories(menu, queryURL) {
  if (!menu) {
    return "[]";
  }
  const servicesMenu = menu?.services;
  const timezone = menu.timezone;
  const categories = menu.category;
  let now = dayjs().tz(timezone);
  const servicesData = {};

  servicesMenu.forEach((service) => {
    const title = service?.service?.title?.toLowerCase();
    if (title) {
      servicesData[title] = {
        title,
        start: dayjs()
          .tz(timezone)
          .hour(service.startHours)
          .minute(service.endMinutes),
        end: dayjs()
          .tz(timezone)
          .hour(service.endHours)
          .minute(service.endMinutes),
        days: service?.days?.map((d) => getDayOfWeek(d?.title)),
      };
    }
  });

  const getAvailableCategories = () => {
    return categories.map((category) => {
      return {
        category: { title: category.title, description: category.description },
        products: category?.product?.map((p) => {
          if (!p?.is_unavailable) {
            const sub_category = p?.sub_category;

            const servicesProduct = p?.services?.map((s) =>
              s?.title?.toLowerCase()
            );

            const isAvailable = servicesProduct.some((service) => {
              // liste des services du produit.
              const serviceData = servicesData[service];

              if (queryURL === "all") {
                return true;
              }
              if (
                queryURL &&
                servicesProduct.some((title) => title === queryURL)
              ) {
                return true;
              }
              if (
                queryURL &&
                servicesProduct.every((title) => title !== queryURL)
              ) {
                return false;
              }

              // Heure du service
              if (serviceData) {
                // check si le jour courant est dans un jour du service
                const hasCurrentDay = serviceData.days[0].some((day) => {
                  return day === currentDay;
                });
                // check si now est entre le début du service ou la fin du service
                if (hasCurrentDay) {
                  const start = serviceData.start;
                  const end = serviceData.end;
                  // Si l'heure du service de fin est inférieur au début du service, on ajoute 24h pour l'heure de fin
                  if (end.isBefore(start)) {
                    return now.isBetween(start, end.add(1, "day"));
                  } else return now.isBetween(start, end);
                }
              }
            });

            if (isAvailable) {
              return {
                sub_category: {
                  id: sub_category?.id,
                  attributes: {
                    title: sub_category?.title,
                    description: sub_category?.description,
                    is_accordion: sub_category?.is_accordion,
                  },
                },
                product: {
                  id: p.id,
                  attributes: {
                    is_video_product: p.product?.is_video_product,
                    kcal: p.product?.kcal,
                    show_image: p.product?.show_image,
                    image: p.product?.image?.url,
                    title: p.product?.title,
                    description: p.product?.description,
                    price: p.price ? p.price : p.product?.default_price,
                    type: p.type,
                    gif: p.product?.gif?.url,
                    video: p.product?.video?.url,
                    allergens: p.product?.allergens?.map((a) => a?.title),
                  },
                },
              };
            } else return {};
          } else return {};
        }),
        // .filter((el) => Object.keys(el).length > 0),
      };
    });
    // .filter((el) => Object.values(el)[0].length > 0);
  };

  return JSON.stringify(getAvailableCategories());
}

module.exports = {
  getAvailableCategories,
};