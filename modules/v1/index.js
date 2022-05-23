// Dependencies
const express = require('express');
const v1Route = express.Router();
v1Route.use('/user', require('./user/userRoutes'));
module.exports = v1Route;
