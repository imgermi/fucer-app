export default function ({store, app, route}) {
  if (app.$auth.loggedIn) {

    // Restringimos el acceso al contenido a los usuarios sin plan premium y con trial vencido
    if (!store.getters.usuarioPremium && route.name!=='contenido-no-disponible') {
      if (!store.getters.esTrial) {
        app.router.push({ name: 'contenido-no-disponible' })
        return
      }
    }
  }
}