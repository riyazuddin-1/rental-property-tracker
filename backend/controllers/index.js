var controllers = {};

controllers.auth = require('./authentication');

controllers.property = require('./property');

controllers.tenants = require('./tenants');

controllers.finance = require('./finance');

module.exports = controllers;