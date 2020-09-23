'use strict';
const express = require('express');
const Users =require ('./models/users/usersmodel.js');
const basicAuth = require('./middleware/basicAuth.js');
const router = express.Router();
router.post('/signup', signUpHandler);
router.post('/signin', basicAuth, signInHandler);
router.get('/users', basicAuth, listHandler);

async function signUpHandler(req, res, next) {
  Users.create(req.body).then(async(user) => {
    const token = await Users.generateToken(user);
    res.status(200).json({ token });
  })
    .catch((err) => {
      console.log('Wrong!!');
      res.status(403).send(err.message);
    });
}
function signInHandler (req, res, next){
  try {
    res.cookie('token', req.token);
    res.set('token', req.token);
    res.json({ token: req.token, username: req.username });
  } catch (e) { res.status(403).json('Invalid credentials'); }

}
async function listHandler(req, res, next){
  const listAllUsers = await Users.list();
  res.status(200).json({Users:listAllUsers});
}

module.exports = router;