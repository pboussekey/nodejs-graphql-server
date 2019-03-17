const glob = require("glob");
const path = require( 'path' );
const _ = require('lodash');

var models = {};
glob.sync( "./database/models/*.model.js" ).forEach( function( file ) {
  var model = require( path.resolve( file ) );
  var name = _.upperFirst(_.camelCase(file.replace(/^.*[\\\/]/, '').replace('.model.js','')));
  models[name] = model;
});

module.exports = models;
