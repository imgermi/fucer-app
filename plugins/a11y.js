import Vue from 'vue'

// Really tell what’s going on in your application to people using screen readers.
import VueAnnouncer from 'vue-announcer'

// Polyfill for `:focus-visible`
import 'focus-visible'

export default function({ app: {router} }) {
	Vue.use(VueAnnouncer, {
	  complementRoute: 'ha cargado'
	}, router) 
}