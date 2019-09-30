const express = require('express');
const bodyParser = require('body-parser');
const graphQLHttp = require('express-graphql');
const mongoose = require('mongoose');
const config = require('config');

const absPath = require('app-module-path');
absPath.addPath(__dirname);

const schema = require('routes');
const { rootController } = require('controllers');

const app = express();
app.use(bodyParser.json());

app.use('/api/1.0', graphQLHttp({
  schema: schema,
  rootValue: rootController,
  graphiql: config.get('graph'),
}))

mongoose.connect(config.get('db'), { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (!err) {
    app.listen(process.env.PORT || config.get('port'));
  }
});