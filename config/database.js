// module.exports = ({ env }) => {
//   // Config for production
//   if (env("NODE_ENV") === "production") {
//     return {
//       connection: {
//         client: "postgres",
//         connection: {
//           connectionString: env("DATABASE_URL"),
//           ssl: {
//             rejectUnauthorized: false,
//           },
//         },
//       },
//     };
//     // Config for development
//   } else {
//     return {
//       connection: {
//         client: "postgres",
//         connection: {
//           host: env("DATABASE_HOST", "127.0.0.1"),
//           port: env.int("DATABASE_PORT", 5432),
//           database: env("DATABASE_NAME", "bigmamma"),
//           user: env("DATABASE_USERNAME", "bigmamma"),
//           password: env("DATABASE_PASSWORD", "bigmamma"),
//           ssl: env.bool("DATABASE_SSL", false),
//         },
//       },
//     };
//   }
// };

module.exports = ({ env }) => {
  return {
    connection: {
      client: "postgres",
      connection: {
        connectionString: env("DATABASE_URL"),
        ssl: {
          rejectUnauthorized: false,
        },
      },
    },
  };
};
