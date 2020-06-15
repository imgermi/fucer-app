// Este plugin se registra después de @nuxt/auth
export default async function ({ store }) {
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