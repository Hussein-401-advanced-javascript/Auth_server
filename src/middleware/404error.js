'use strict';
module.exports = (req, res, next) => {
  res.status(404).send({ err: 'not found' });
};