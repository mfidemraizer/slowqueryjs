module.exports = function(grunt) {
      grunt.initConfig({
            exec: {
                  bundle: {
                        command: "npm run bundle",
                        stdout: true,
                        stderr: true
                  },

            },
            connect: {
                  dev: {
                        options: {
                              port: 8080,
                              hostname: "localhost",
                              base: "./",
                              keepalive: true
                        }
                  },
                  test: {
                        options: {
                              port: 8080,
                              hostname: "localhost",
                              base: "./"
                        }
                  }
            },
            babel: {
                  options: {
                        sourceMap: true,
                        presets: ["es2015"]
                  },
                  test: {
                        files: {
                              "./test/test.transpiled.js": "./test/test.js"
                        }
                  }
            },
            qunit: {
                  all: {
                        options: {
                              urls: ["http://localhost:8080/test/index.html"]
                        }
                  }
            }
      });

      grunt.loadNpmTasks("grunt-babel");
      grunt.loadNpmTasks("grunt-exec");
      grunt.loadNpmTasks("grunt-contrib-qunit");
      grunt.loadNpmTasks("grunt-contrib-connect");

      grunt.registerTask("default", ["exec:bundle"]);
      grunt.registerTask("test", ["exec:bundle", "babel:test", "connect:test", "qunit"]);
};
