'use strict';
const express = require('express');
const morgan = require('morgan');
const router = require ('./auth/router.js');
const extraRoutes = require ('../src/auth/models/extra-routes');
const oauth = require('../src/auth/middleware/Oauth.js')
const cors = require('cors');
const app = express();
const notFoundhandler = require('../src/middleware/404error.js');
const erorr5dhandler = require('../src/middleware/500.js');

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(express.static('./public'));

app.get('/oauth', oauth, (req, res) => {
  res.status(200).send(req.token);
  });
app.use(router);
app.use(extraRoutes);
app.get('*', notFoundhandler);
app.get(erorr5dhandler);

module.exports = {
  server: app,
  start: (port) => {
    const PORT = port || process.env.PORT || 3030;
    app.listen(PORT, () => console.log(`server is running on ${PORT}`));
  },
};