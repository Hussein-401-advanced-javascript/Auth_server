// const base64 = require('base-64');usersmodel
const Users = require('../models/users/usersmodel.js');
module.exports= (req, res, next) => {
  if (!req.headers.authorization) {
    return next('Invalid Login, No Headers !!');
  }
  console.log('req.headers.authoriation : ',req.headers.authorization);
  let bearer = req.headers.authorization.split(' ');
  console.log('bearerbearer-----------<<',bearer);
   
  if (bearer[0] == 'Bearer') {
    const token = bearer[1];
    console.log('Bearertoken>>>>>>>>>>>>>',token);
    // authenticate this token and get the valid user
    // let user1= new Use
    Users.authenticateToken(token).then(validUser=> {
      console.log('validUser ---> ',validUser.tokenObject.record);
      req.user = validUser;
      next();
    }).catch(err=> next('Invalid Token!'));

  } else {
    return next('Invalid Bearer!!');
  }

};