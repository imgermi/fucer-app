export default function ({store, app, route}) {

  // Bloqueo el acceso si el usuario está logueado
  let redirigir = route.name
  if (app.$auth.loggedIn) {
    if (store.getters.usuarioPremium || store.getters.esTrial) {
      redirigir = 'inicio'
    } else {
      // Si tiene suscripción es que no pagó, la suspendió, o está teniedo un problema con el pago
      if (store.state.auth.user.suscripcion.id) {
        redirigir = 'estado-suscripcion'
      // Usuario sin registrarse
      }else{
        redirigir = 'medio-de-pago'
      }
    }
  }
  
  if (route.name !== redirigir) {
    app.router.push({name: redirigir})
  }
}