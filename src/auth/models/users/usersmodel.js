'use strict';
const  schema = require('./user-schema.js');
const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken');
const SECRET = 'mytokensecret';
class User {
  /**
     * 
     * @param {object} schema 
     */
  constructor() {
    this.schema = schema;
  }
  // crud operations
  /**
   * 
   * @param object record 
   */
  async create(user) {
    let newUser = new this.schema(user);
    return await newUser.save();

  }
  async authenicateBasic (username, password){
    let user = await this.schema.find({ username: username });
    try {
      const valid = await bcrypt.compare(password, user[0].password);
      return valid ? user : Promise.reject('Password not correct');
    } catch (e) {
      console.log(e.message);
    }
  }
 
  generateToken(record){
    let token = jwt.sign({username: record.username}, SECRET);
    console.log('token>>>>>>>>>',token);
    return { token, record };
  }
  async list() {
    let allUsers = await this.schema.find({});
    return allUsers;
  }
  
}


module.exports =new User;