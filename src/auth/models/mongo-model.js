'use strict';

class Model {
  /**
     * 
     * @param {object} schema 
     */
  constructor(schema) {
    this.schema = schema;
  }
  // crud operations
  /**
   * 
   * @param object record 
   */
  create(record) {
    let newRecord = new this.schema(record);
    return newRecord.save();
  }
  /**
     * 
     * @param {String} _id 
     */
  get(_id) {
    let obj = _id ? _id : {};
    return this.schema.find(obj);
  }
  /**
 * 
 * @param {String} _id 
 * @param {object} record 
 */
  update(_id, record) {
    return this.schema.findByIdAndUpdate(_id, record, {new: true});
  }
  /**
     * 
     * @param {String} _id 
     */
  delete(_id) {
    return this.schema.findByIdAndDelete(_id);
  }
}

module.exports = Model;