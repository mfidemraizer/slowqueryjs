var fork = require('child_process').fork;
var child = fork("../node_modules/grunt/lib/grunt.js", process.argv.slice(2));
