const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLNonNull } = graphql;
const Models = require('../../_models.js');

module.exports = new GraphQLObjectType({
  name: `UserDef`,
  fields:  {
    id: {type:new GraphQLNonNull(GraphQLID)},
    username: {type: GraphQLString}
  }});
