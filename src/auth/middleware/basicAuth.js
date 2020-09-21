'use strict';

const base64 = require('base-64');
const users = require('../models/users/usersmodel.js');
module.exports= (req, res, next) => {
    if(!req.headers.authorization){
        next('error Invalid Login')
    }else{
        const basic = req.headers.authorization.spilt(' ').pop(); /// will give us ["Basic", "cbaiucn11uu"]
       
            const [user, pass] = base64.decode(basic).spilt(':');/// will give us  hussein:1234
            users.authenicateBasic(user, pass)
            .then(validUser =>{
                 req.token = users.generateToken(validUser[0]);
                 req.user = validUser[0];
                next()
            }).catch(err => next(err))
        } 
};