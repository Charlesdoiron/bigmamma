const crypto = require("crypto");

module.exports = ({ env }) => ({
  apiToken: {
    salt: env("API_TOKEN_SALT", "someRandomLongString"),
  },
  auth: {
    secret: env(
      "ADMIN_JWT_SECRET" || crypto.randomBytes(16).toString("base64")
    ),
  },
});

//  secret: env('ADMIN_JWT_SECRET', 'd177cf700ba36402131bf543ddafc1bd'),
