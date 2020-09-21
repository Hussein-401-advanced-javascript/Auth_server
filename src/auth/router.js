'use strict'
const express = require('express');
const users =require ('./models/users/usersmodel.js')
const basicAuth = require('./middleware/basicAuth.js')
const router = express.Router();
router.post('/signup', signUpHandler);
router.post('/signin', basicAuth, signIn)
router.get('/users', basicAuth, listHandler)

async function signUpHandler(req, res, next) {
    try{
        console.log('>>>>>>>>>>users>>.', users);
        let user = await users.save(req.body);
        console.log('>>>>>>>>>>user>>.', user);

        let token = users.generateToken(user);
        console.log('>>>>>>>>>>token>>.', token);

        res.status(201).json({token});
    }catch(err){
        res.status(403).send('action forbiden');
    }
};
function signIn (req, res, next){
    res.status(201).json({token: req.token, user: req.user})
}
async function listHandler(req, res, next){
const listAllUsers = await users.get({});
res.status(201).json({users:listAllUsers})
}

module.exports = router;