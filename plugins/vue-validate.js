import Vue from 'vue';
import VeeValidate from 'vee-validate';
import es from 'vee-validate/dist/locale/es.js';


Vue.use(VeeValidate, {
	delay: 500,
	locale: 'es',
	dictionary: {
		es: es
	}
});
