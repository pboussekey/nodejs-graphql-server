const glob = require("glob");
const path = require( 'path' );
const _ = require('lodash');

var resolvers = {};
glob.sync( "./schema/resolvers/*.resolver.js" ).forEach( function( file ) {
  var resolver = require( path.resolve( file ) );
  var name = _.upperFirst(_.camelCase(file.replace(/^.*[\\\/]/, '').replace('.resolver.js','')));
  resolvers[name] = resolver;
});


module.exports = resolvers;
