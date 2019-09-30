const express = require('express');
const bodyParser = require('body-parser');
const graphQLHttp = require('express-graphql');
const mongoose = require('mongoose');

const absPath = require('app-module-path');
absPath.addPath(__dirname);
const User = require('models/User');
const { UserSchema } = require('schema');
const schema = require('routes');
const app = express();
app.use(bodyParser.json());

app.use('/api/1.0', graphQLHttp({
  schema: schema,
  rootValue: {
    getUser: async () => {
      const users = await User.find();
      return users;
    },
    createUser: async ({ ILogin }) => {
      const user = await new User({
        username: ILogin.username,
        password: ILogin.password
      }).save();
      return user;
    }
  },
  graphiql: true,
}))

mongoose.connect('mongodb://admin:admin123@ds263460.mlab.com:63460/pantherapi', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (!err) {
    app.listen(5000);
    console.log('Server is running..');
  }
});