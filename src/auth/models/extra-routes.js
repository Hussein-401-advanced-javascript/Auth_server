'use strict';
const bearerMiddleware = require('../middleware/bearer-auth.js');
const aclMiddleware = require('../middleware/acl-middleware.js');
// const Users =require ('./users/usersmodel.js');
const express = require('express');
const extraRoutes = express.Router();


extraRoutes.get('/read', bearerMiddleware, aclMiddleware('read'), (req ,res)=>{
  res.status(201).send('Route /read worked');
});
extraRoutes.post('/add', bearerMiddleware, aclMiddleware('create'), (req ,res)=>{
  res.status(201).send('Route /create worked');

});
extraRoutes.put('/change', bearerMiddleware, aclMiddleware('update'), (req ,res)=>{
  res.status(201).send('Route /update worked');

});
extraRoutes.delete('/remove', bearerMiddleware, aclMiddleware('delete'), (req ,res)=>{
  res.status(201).send('Route /delete worked');

});
extraRoutes.get('/secret', bearerMiddleware, secretHandler);

function secretHandler(req, res, next){
  // console.log('inside secretHandler');
  // console.log('--------------',req.user);
  res.status(200).json(req.user);

}
module.exports = extraRoutes;