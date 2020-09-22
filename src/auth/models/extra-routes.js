'use strict';
const bearerMiddleware = require('../middleware/bearer-auth.js');
// const Users =require ('./users/usersmodel.js');
const express = require('express');
const extraRoutes = express.Router();


extraRoutes.get('/secret', bearerMiddleware, secretHandler);

function secretHandler(req, res, next){
    console.log('inside secretHandler');
    console.log('--------------',req.user);
    res.status(200).json(req.user);

}
module.exports = extraRoutes;