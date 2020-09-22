require('dotenv').config();
const mongoose = require('mongoose');
const server = require('./src/server.js');
const MONGOOSE_URL = process.env.MONGOOSE_URL;

const mongooseOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

mongoose.connect(MONGOOSE_URL, mongooseOptions);

server.start();