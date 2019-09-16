export default function ({store, app, route}) {

  // Bloqueo el acceso si el usuario está logueado
  if (app.$auth.loggedIn) {
  	if (store.getters.usuarioPremium || store.getters.esTrial) {
    	app.router.push({name: 'inicio'})
  	} else {
      // Si tiene suscripción es que no pagó, la suspendió, o está teniedo un problema con el pago
  		if (store.state.auth.user.suscripcion.id) {
  	  		app.router.push({name: 'estado-suscripcion'})
      // Usuario sin registrarse
  		}else{
      		app.router.push({name: 'medio-de-pago'})
  		}
  	}
  }
}