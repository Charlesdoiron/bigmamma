'use strict';

/**
 * wine service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::wine.wine');
