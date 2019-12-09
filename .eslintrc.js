module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    'plugin:vue-a11y/recommended',
  ],
  plugins: [
    // required to lint *.vue files
    'vue',
    'vue-a11y',
  ],
  rules: {
    // https://github.com/maranran/eslint-plugin-vue-a11y/issues/15#issuecomment-507698383
    "vue-a11y/label-has-for": [ 2, {
      "components": [ "label" ],
      "required": {
        "some": [ "nesting", "id" ]
      },
      "allowChildren": false
    }]
  }
}
