const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID } = graphql;
const User = require('../defs/user.def');
const UserModel = require('../../loaders/models.js')['User'];

module.exports = new GraphQLObjectType({
  name: `UserResolver`,
  fields: {
    'user': {
      type: new GraphQLList(User),
      args: {id : {type: GraphQLID}},
      resolve(parent, args, context){
        return UserModel.get(args.id);
      }
    },
    'users': {
      type: new GraphQLList(User),
      resolve(parent, args, context){
        return UserModel.getList();
      }
    }
  }
});
