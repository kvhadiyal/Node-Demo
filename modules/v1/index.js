// Dependencies
const express = require('express');
const auth = require('../../helper/auth');

const v1Route = express.Router();

v1Route.use('/user', require('./users/userRoutes'));

module.exports = v1Route;
