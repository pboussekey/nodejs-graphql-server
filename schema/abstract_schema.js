const graphql = require('graphql');
const _ = require('lodash');
const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull, GraphQLSchema, GraphQLID } = graphql;

function abstract_schema(name, def, model, resolver, mutation){

  this.type = def;
  this.model = model;
  const Resolver =  resolver || new GraphQLObjectType({
    name: `${name}Resolver`,
    fields: {
      [name.toLowerCase()]: {
        type: new GraphQLList(this.type),
        args: {id : {type: GraphQLID}},
        resolve(parent, args, context){
          return model.get(args.id);
        }
      },
      [`${name.toLowerCase()}s`]: {
        type: new GraphQLList(this.type),
        resolve(parent, args, context){
          return model.getList();
        }
      }
    }
  });
  var fields = {}.toString.call(def._fields) === '[object Function]' ? def._fields() : def._fields;
  var mutation_fields = {};
  _.forIn(fields, (field, key) => {
    if(field.type === GraphQLString || field.type.toString() ==  new GraphQLNonNull(GraphQLString)){
      mutation_fields[key] = field;
    }
    else if(field.type.toString().endsWith('Def') || field.type.toString().endsWith('Def!')){
      mutation_fields[`${field.name}_id`] = field.type.toString().endsWith('Def') ? { type : GraphQLID } : { type : new GraphQLNonNull(GraphQLID) };
    }
  });

    this.schema = new GraphQLSchema({
      query : Resolver,
      mutation : mutation
    });
  }



  module.exports = abstract_schema;
