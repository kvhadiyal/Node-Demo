const express = require('express');

const route = express.Router();
route.use('/', require('./modules'));

module.exports = route;
