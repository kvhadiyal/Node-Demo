// Dependencies
const express = require('express');

const moduleRoute = express.Router();

moduleRoute.use('/v1', require('./v1'));

module.exports = moduleRoute;
