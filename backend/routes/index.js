const express = require('express');
const app = express();

const authentication = require('./authentication');
const property = require('./property');
const tenants = require('./tenants');
const finance = require('./finance');

app.use('/auth', authentication);
app.use('/property', property);
app.use('/tenants', tenants);
app.use('/finance', finance);

module.exports = app;