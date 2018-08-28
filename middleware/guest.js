export default function ({store, app, route}) {

  // Bloqueo el acceso si el usuario está logueado
  if (app.$auth.loggedIn) {
  	if (store.getters.usuarioPremium || store.getters.esTrial) {
    	app.router.push({name: 'inicio'})
  	} else {
    	app.router.push({name: 'medio-de-pago'})
  	}
  }
}