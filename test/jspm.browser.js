SystemJS.config({
      baseURL: "/test",
      paths: {
            "github:*": "jspm_packages/github/*",
            "npm:*": "jspm_packages/npm/*",
            "dist:*": "../dist/*"
      }
});
