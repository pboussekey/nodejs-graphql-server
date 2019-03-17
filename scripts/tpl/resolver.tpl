const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList } = graphql;
const Models = require('../../_models.js');
const {Name} = require('../definitions/{name}.def');

module.exports = new GraphQLObjectType({
  name: `{Name}Resolver`,
  fields: {
    }
  });
