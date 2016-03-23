SystemJS.config({
  transpiler: "plugin-babel",
  packages: {
    "fluentquery": {
      "main": "fluentquery.js",
      "meta": {
        "*.js": {
          "loader": "plugin-babel"
        }
      }
    }
  }
});

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json"
  ],
  map: {
    "plugin-babel": "npm:systemjs-plugin-babel@0.0.8"
  },
  packages: {}
});
