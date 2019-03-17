require('dotenv').config({ path: './envs/' + process.env.NODE_ENV + '.env' });
const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/root.schema');
var jwt = require('express-jwt');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const UserModel = require('./database/models/user.model');

const configuration = process.env;
const app = express();

app.use(express.json());

app.post('/login', (req, res) => {
  UserModel.model.findOne({
    raw: true,
    where:{
      email: req.body.email
    }
  }).then(user => {
    if (!user) {
      return res.status(400).json({
        type : 'error',
        error : 'User not found',
        body : req.body
      });
    }

    bcrypt.compare(req.body.password, user.password).then(function(valid){
      if (!valid) {

        return res.status(400).json({
          type : 'error',
          error : 'Invalid password'
        });
      }

      // signin user and generate a jwt
      const token = jsonwebtoken.sign({
        id: user.id
      }, configuration.AUTH_SECRET, { expiresIn: '1y' });

      return firebase.getToken().then(fbToken => res.json({
        user: user,
        token: token,
        fbtoken : fbToken
      }));

    });
  })});

  const auth = jwt({
    secret: configuration.AUTH_SECRET
  });

  app.use(auth).use('/api', graphqlHTTP(req => ({
    schema,
    graphiql:true,
    context: {
      user: req.user
    }
  })));

  app.listen(configuration.APP_PORT, () => {
    console.log("SERVER STARTED");
  });
