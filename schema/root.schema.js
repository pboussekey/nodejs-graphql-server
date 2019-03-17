const graphql = require('graphql');
const { mergeSchemas } = require("graphql-tools");
const Defs = require('../_definitions');
const Models = require('../_models');
const Resolvers = require('../_resolvers');
const Schema = require('./abstract_schema');
const _ = require('lodash');

module.exports = mergeSchemas({
  schemas: _.values(_.mapValues(Defs,(value, key) => new Schema(key, Defs[key], Models[key], Resolvers[key]).schema ))
});
