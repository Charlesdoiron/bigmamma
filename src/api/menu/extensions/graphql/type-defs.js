// GraphQL SDL to extend Strapi GQL plugin
// TODO: ADD type here
const typeDefs = `
  extend type Query {
    getAvailableCategories(slug: String!,queryURL:String,locale:I18NLocaleCode):String
  }
`;

module.exports = {
  typeDefs,
};
