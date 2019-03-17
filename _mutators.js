const glob = require("glob");
const path = require( 'path' );
const _ = require('lodash');

var mutators = {};
glob.sync( "./schema/mutators/*.mutator.js" ).forEach( function( file ) {
  var mutator = require( path.resolve( file ) );
  var name = _.upperFirst(_.camelCase(file.replace(/^.*[\\\/]/, '').replace('.mutator.js','')));
  resolvers[name] = resolver;
});

module.exports = mutators;
