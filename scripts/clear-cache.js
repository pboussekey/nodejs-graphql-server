require('dotenv').config({ path: './envs/' + process.env.NODE_ENV + '.env' });

const Models = require('../_models');
const _ = require('lodash');

_.forIn(Models, M => { console.log("CLEAR CACHE",M.model.name); M._cache.clearAll();});


process.exit(0);
