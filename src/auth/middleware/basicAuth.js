'use strict';

const base64 = require('base-64');
const users = require('../models/users/usersmodel.js');
module.exports= (req, res, next) => {
  let basic = req.headers.authorization.split(' ');
  if (basic[0] == 'Basic') {
    let [user, pass] = base64.decode(basic[1]).split(':');
    users.authenicateBasic(user, pass).then(valid => {
      if (!valid) {
        return next('Wrong pass or username');
      }
      return users.generateToken(valid);
    }).then(token => {
      req.token = token;
      req.user = user;
      next();

    }).catch(err => next(err));

  } else {
    next('Invalid Login!! ');
  }
};