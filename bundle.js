var fork = require('child_process').fork;
var child = fork("jspm.js", [
      "build",
      "core.js",
      "../dist/slowquery.min.js",
      "--global-name", "SlowQuery",
      "--format", "umd",
      "--no-runtime",
      "--minify"
]);
