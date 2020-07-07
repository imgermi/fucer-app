import Vue from "vue";

if (process.env.NODE_ENV !== "production") {
  const VueAxe = require("vue-axe").default;
  Vue.use(VueAxe, {
    clearConsoleOnUpdate: true,
    // https://github.com/dequelabs/axe-core/blob/master/doc/API.md#api-name-axeconfigure
    config: {
      reporter: "no-passes",
    },
  });
}
