export default function ({redirect, app}) {

  // Bloqueo el acceso si el usuario tiene una suscripción manual
  if (app.$auth.loggedIn && app.$auth.user.condicion === 'premium-incondicional') {
    return redirect('/inicio')
  }
}