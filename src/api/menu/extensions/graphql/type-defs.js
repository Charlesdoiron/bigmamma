// GraphQL SDL to extend Strapi GQL plugin
// TODO: ADD type here

const typeDefs = `
type Products {
    description:String
    title:String
    id:ID
    is_unavailable:Boolean
  }
type AllProductsRes {
  title:String
  products : [Products]
}
  extend type Query {
    getAvailableCategories(slug: String!,queryURL:String,locale:I18NLocaleCode): String
  }
  extend type Query {
    getAllProductsByMenu(slug: String!,password:String!): AllProductsRes 
  }
`;

module.exports = {
  typeDefs,
};

// type ProductType {
//   title: String
//   description: String
//   type: ENUM_PRODUCT_TYPE
//   kcal: Float
//   image: String
//   show_image: Boolean
//   tags: [String]
//   is_video_product: Boolean
//   gif: String
//   video: String
//   default_price: String
//   allergens: [String]
// }

// type ComponentCategoriesCategory {
//   id: ID!
//   title: String
//   product(
//     filters: ComponentProductsProductFiltersInput
//     pagination: PaginationArg = {}
//     sort: [String] = []
//   ): [ComponentProductsProduct]
//   hide_products: Boolean
//   background_color: String
//   gif_placement: ENUM_COMPONENTCATEGORIESCATEGORY_GIF_PLACEMENT
//   image: UploadFileEntityResponse
//   description: String
//   force_open: Boolean
//   force_show: Boolean
// }

// type Group {
//   category: ComponentCategoriesCategory
//   products: {
//     product:  ComponentProductsProduct
//     sub_category: {
//       id: ID!
//       attributes: {
//         title: String
//         description: String
//         is_accordion: Boolean
//       }
//     }
//   }
// }
