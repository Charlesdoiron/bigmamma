module.exports = ({ env }) => ({
  auth: {
    // secret: env('ADMIN_JWT_SECRET', 'd177cf700ba36402131bf543ddafc1bd'),
    secret: env(
      "ADMIN_JWT_SECRET" || crypto.randomBytes(16).toString("base64")
    ),
  },
});
