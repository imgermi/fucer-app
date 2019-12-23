import Vue from 'vue'
import VueAnnouncer from 'vue-announcer'

export default function({ app: {router} }) {
	Vue.use(VueAnnouncer, {
	  complementRoute: 'ha cargado'
	}, router) 
}