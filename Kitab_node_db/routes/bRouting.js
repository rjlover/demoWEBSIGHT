const express = require("express");
const route = express.Router();

const bAuthController = require('../controllers/bAuth');

route.post('/contactUs', bAuthController.contactUs);

route.post('/register', bAuthController.register);

route.post('/login', bAuthController.login);


module.exports = route;