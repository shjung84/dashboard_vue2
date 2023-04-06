const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
});

module.exports = {
  // publicPath: "/dashboard_vue2/",
  publicPath: process.env.NODE_ENV === "production" ? "/dashboard_vue2/" : "/",
  outputDir: "docs",
};
