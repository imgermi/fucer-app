export default function ({store, app, route}) {

  // Bloqueo el acceso si el usuario está logueado
  if (app.$auth.state.loggedIn) {
    app.router.push({name: 'inicio'})
  }
}