SystemJS.config({
      baseURL: "/",
      paths: {
            "github:*": "jspm_packages/github/*",
            "npm:*": "jspm_packages/npm/*",
            "fluentquery/": "src/"
      },
      meta: {
            "qunit": {
                  "format": "amd",
                  "export": "qunit"
            }
      }
});
