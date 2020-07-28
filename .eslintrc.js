module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: "babel-eslint",
  },
  globals: {
    $nuxt: true,
  },
  extends: [
    // https://medium.com/@gogl.alex/how-to-properly-set-up-eslint-with-prettier-for-vue-or-nuxt-in-vscode-e42532099a9c
    "plugin:vue/recommended",
    "plugin:vue-a11y/recommended",
    "plugin:nuxt/recommended",
    "plugin:cypress/recommended",
    "eslint:recommended",
    "plugin:json/recommended",
    "plugin:promise/recommended",
    "plugin:sonarjs/recommended",
    "prettier/vue",
    "plugin:prettier/recommended",
  ],
  plugins: [
    "sonarjs",
    "promise",
    "json",
    "vue-a11y",
    "nuxt",
    "no-secrets",
    "cypress",
  ],
  rules: {
    "no-secrets/no-secrets": "error",
    "vue/component-name-in-template-casing": ["error", "PascalCase"],
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    // https://github.com/maranran/eslint-plugin-vue-a11y/issues/15#issuecomment-507698383
    "vue-a11y/label-has-for": [
      2,
      {
        components: ["label"],
        required: {
          some: ["nesting", "id"],
        },
        allowChildren: false,
      },
    ],
  },
};
