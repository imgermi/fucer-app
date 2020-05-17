import Vue from 'vue'

// Really tell what’s going on in your application to people using screen readers.
import VueAnnouncer from 'vue-announcer'

// Polyfill for `:focus-visible`
import 'focus-visible'

// Trap the focus within a DOM element so you can't leave it with "Tab"
// https://www.npmjs.com/package/focus-trap-vue
import { FocusTrap } from 'focus-trap-vue'

export default function({ app: {router} }) {
	Vue.use(VueAnnouncer, {
	  complementRoute: 'ha cargado'
	}, router)

	Vue.component('FocusTrap', FocusTrap)
}