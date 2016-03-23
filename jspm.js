var fs = require("fs");
fs.createReadStream("./package.json").pipe(fs.createWriteStream("./src/package.json"));

process.chdir("./src");

var fork = require('child_process').fork;
var child = fork("../node_modules/jspm/jspm.js", process.argv.slice(2));


child.on("close", function() {
      fs.createReadStream("./package.json").pipe(fs.createWriteStream("../package.json"));
      fs.unlinkSync("./package.json");
});
