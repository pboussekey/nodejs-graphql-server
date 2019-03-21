const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLNonNull, GraphQLID, GraphQLInt } = graphql;
const User = require('../../loaders/models.js')['User'];
const UserDef = require('../defs/user.def');
const _ = require('lodash');

module.exports = new GraphQLObjectType({
  name: `UserMutator`,
  fields: () => {
    var fields = {}.toString.call(UserDef._fields) === '[object Function]' ? UserDef._fields() : UserDef._fields;
    var addArgs = {};
    var updateArgs = { id : {type:new GraphQLNonNull(GraphQLID)}};
    _.forIn(fields, (arg, field) => {
      if(arg.type.toString() == GraphQLString.toString() || arg.type.toString() == GraphQLNonNull(GraphQLString).toString()){
        addArgs[field] = { type : arg.type };
        updateArgs[field] = { type : GraphQLString };
      }
      if(arg.type.toString().endsWith('Def') || arg.type.toString().endsWith('Def!')){
        addArgs[`${field}_id`] = { type : arg.type.toString().endsWith('Def!') ? GraphQLNonNull(GraphQLID) : GraphQLID };
        updateArgs[`${field}_id`] = { type : GraphQLID };
      }
    });
    return {
      addUser: {
        type : UserDef,
        args : addArgs,
        resolve : (parent, args) =>  User.model.create(args)
      },
      updateUser: {
        type : GraphQLInt,
        args : updateArgs,
        resolve : (parent, args) =>  User.model.update(args, { where : { id : args.id }}).then(([affectedCount]) => { User.clear(args.id); return affectedCount; })
      }
    };
  }});
