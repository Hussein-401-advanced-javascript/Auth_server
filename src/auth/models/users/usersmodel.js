'use strict';
const  schema = require('./user-schema.js')
const Model = require('../mongo-model.js')
const bcrypt = require('bcrypt')
const jwt = require ('jsonwebtoken');
const SECRET = 'mytokensecret';
class Users extends Model {
  /**
     * 
     * @param {object} schema 
     */
  constructor() {
    super (schema)
  }
  // crud operations
  /**
   * 
   * @param object record 
   */
  async save(record) {
    const result =  await this.get({username: record.username});
    if (result.length == 0){
      record.password = await bcrypt.hash(record.password, 5);
      const user = await this.create(record);
      return user;
    }
  };
   async authenicateBasic (user, pass){
    let result = await this.get({username:user})
    console.log('dataRecord', dataRecord);
    console.log(' username>>>>>>>>>',  username);
    let valid = await bcrypt.compare(pass,result[0].password )
    return valid ? result : Promise.reject('password incorrect');
 };
 
   generateToken(user){
    let token = jwt.sign({username:user.username}, SECRET);
    console.log('token>>>>>>>>>',token);
    return token;  
    }
  
}

module.exports =new Users;