
const express = require('express');
const bodyParser = require('body-parser');
const config  = require('config');
const cors = require('cors');


module.exports = () => {
  const app = express();

  app.use(cors());

  app.set('port', process.env.PORT || config.get('server.port'));

  app.use(bodyParser.json());

  app.get('/', (req, res) => {
    res.json({ status: 'Server is running!' })
  })
  
  require('../api/routes/products')(app);

  return app;
};