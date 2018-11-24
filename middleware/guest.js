export default function ({store, app, route}) {

  // Bloqueo el acceso si el usuario está logueado
  if (app.$auth.loggedIn) {
  	if (store.getters.usuarioPremium || store.getters.esTrial) {
    	app.router.push({name: 'inicio'})
  	} else {
  		// Hay usuarios que no figuran como premium en el store pero que desde
  		// la API sí lo son porque el cobro del último invoice no se hizo en el
  		// día (ya sea por falta de una autorización, por un proceso de gestión
  		// desde VISA por ejemplo o por falta de fondos).
  		//
  		// Estos usuarios van a figurar como premium desde la API porque se tiene
  		// encuenta el estad del invoice (en este caso pending o dunning) pero se
  		// les bloquea el acceso igualmente hasta que se confirme el pago de la
  		// suscripción.
		if (store.state.auth.user.es_premium) {
	  		app.router.push({name: 'estado-suscripcion'})
		}else{
    		app.router.push({name: 'medio-de-pago'})
		}
  	}
  }
}