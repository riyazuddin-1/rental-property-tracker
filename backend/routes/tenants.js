const express = require('express');
const app = express();

const controllers = require('../controllers').tenants;

app.post('/add-tenant', controllers.addTenant);

app.post('/get-tenant', controllers.getTenant);

app.post('/get-tenants-list', controllers.getTenantsList);

module.exports = app;