const express = require('express');
const app = express();

const controllers = require('../controllers').property;

app.post('/add-property', controllers.addProperty);

app.post('/get-properties', controllers.properties);

app.post('/get-property-info', controllers.propertyInfo);

module.exports = app;