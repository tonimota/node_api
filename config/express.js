
const express = require('express');
const bodyParser = require('body-parser');
const config  = require('config');

module.exports = () => {
  const app = express();

  app.set('port', process.env.PORT || config.get('server.port'));

  app.use(bodyParser.json());

  app.get('/', (req, res) => {
    res.json({ status: 'Server is running!' })
  })
  
  require('../api/routes/products')(app);

  return app;
};