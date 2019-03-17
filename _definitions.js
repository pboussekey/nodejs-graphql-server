const glob = require("glob");
const path = require( 'path' );
const _ = require('lodash');

var defs = {};
glob.sync( "./schema/defs/*.def.js" ).forEach( function( file ) {
  var def = require( path.resolve( file ) );
  var name = _.upperFirst(_.camelCase(file.replace(/^.*[\\\/]/, '').replace('.def.js','')));
  defs[name] = def;
});


module.exports = defs;
