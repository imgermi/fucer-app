// http://vee-validate.logaretm.com/v2/concepts/bundle-size.html#minimal-bundle
import Vue from 'vue';

import { Validator, install as VeeValidate } from 'vee-validate/dist/vee-validate.minimal.esm.js';
import * as veeRules from 'vee-validate/dist/rules.esm.js';
import veeEs from 'vee-validate/dist/locale/es';

// Add rules
Object.keys(veeRules).forEach(rule => {
	Validator.extend(rule, veeRules[rule]);
});

// Merge the messages.
Validator.localize('es', veeEs);

// install the plugin
Vue.use(VeeValidate);