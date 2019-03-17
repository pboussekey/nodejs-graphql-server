const fs = require('fs');
const _ = require('lodash');

var argv = process.argv.slice(2);
if(!argv.length){
  console.log('You must provide a model name.');
  process.exit(-1);
}

function createFromTpl(name, source, destination){

  console.log(`Read ${source}`);
  fs.exists(destination, function (exists) {
    if (exists) {
        console.log(`${destination} already exists`);
        process.exit(-1);
    }
  });
  fs.readFile(source, "utf8", function(err, content) {
    content = content.replace(/{name}/g, name).replace(/{Name}/g, _.upperFirst(name));
    if(err){
      console.log(err);
      process.exit(-1);
    }
    console.log(`Write ${destination}`);
    fs.writeFile(destination, content, function(err) {
      if(err) {
        console.log(err);
        process.exit(-1);
      }
      console.log(`${destination} created`);

    });

  });

}

var modelName = argv[0];
createFromTpl(modelName, 'scripts/tpl/model.tpl', `database/models/${modelName}.model.js`);

argv = argv.slice(1);
argv.forEach(type => createFromTpl(modelName, `scripts/tpl/${type}.tpl`, `schema/${type}s/${modelName}.${type}.js`));
