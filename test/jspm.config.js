SystemJS.config({
      transpiler: "plugin-babel"
});

SystemJS.config({
      packageConfigPaths: [
            "npm:@*/*.json",
            "npm:*.json",
            "github:*/*.json"
      ],
      map: {
            "css": "github:systemjs/plugin-css@0.1.20",
            "plugin-babel": "npm:systemjs-plugin-babel@0.0.8",
            "qunit": "github:jquery/qunit@1.22.0"
      },
      packages: {}
});
