// http://vee-validate.logaretm.com/v2/concepts/bundle-size.html#minimal-bundle
import Vue from "vue";

import {
  Validator,
  install as VeeValidate,
} from "vee-validate/dist/vee-validate.minimal.esm.js";
import { required, email, confirmed } from "vee-validate/dist/rules.esm.js";
import veeEs from "vee-validate/dist/locale/es";

// Add rules
// http://vee-validate.logaretm.com/v2/guide/rules.html
Validator.extend("required", required);
Validator.extend("email", email);
Validator.extend("confirmed", confirmed);

// Merge the messages.
Validator.localize("es", veeEs);

// install the plugin
Vue.use(VeeValidate, {
  locale: "es",
});
