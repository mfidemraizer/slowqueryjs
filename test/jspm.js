var fork = require('child_process').fork;
var child = fork("../node_modules/jspm/jspm.js", process.argv.slice(2));
