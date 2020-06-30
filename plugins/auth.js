// Este plugin se registra después de @nuxt/auth
export default async function ({ store , app }) {
  // Fix redirect on login/logout
  // https://github.com/nuxt-community/auth-module/issues/205#issuecomment-420913076
  const oldLogout = app.$auth.logout.bind(app.$auth)
  const oldLogin = app.$auth.login.bind(app.$auth)

  app.$auth.logout = (...args) => {
    const _ = oldLogout(...args)
    _.then(() => app.$auth.redirect('logout'))
    return _
  }
  app.$auth.login = (...args) => {
    // sometimes doesn't work when the user tries to get to the admin page
    // before being logged in.

    const _ = oldLogin(...args)
    _.then(() => {
      app.$auth.redirect('home')
    })
    return _
  }

  // Actualiza favoritos del usuario
  store.watch(state => state.auth.loggedIn, async () => {
    // Al loguearse
    if (store.state.auth.loggedIn) {
      // Obtiene favoritos y cachea sus recursos
      await store.dispatch('normativas/getFavoritas')
      let urlsAPI = [
        `/api/favoritos?usuario=${store.state.auth.user.id}`
      ]
      let urlsCMS = []
      store.getters['normativas/favoritas'].map(item => {
        urlsAPI = [...urlsAPI, `/api/normativas/id/${item.url.params.id}`]
        urlsCMS = [...urlsCMS, ...item.recursos]
      })
      window.caches.open('fucer-cms')
        .then(cache => cache.addAll(urlsCMS))
      window.caches.open('fucer-api')
        .then(cache => cache.addAll(urlsAPI))
    
    // Al desloguearse
    } else {
      store.dispatch('normativas/emptyFavoritas')
    }
  })
}