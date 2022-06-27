"use strict";

/**
 * tag service.
 */

/*****************************
 * Service "import".
 ****************************/

/**
 * Get the service.
 */
// const service = strapi.plugin("import-export-entries").service("import");

// const importT = async () =>
//   await service.importData({ dataRaw: [{ id: "898980", title: "test" }] });

// importT();
const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::tag.tag");
