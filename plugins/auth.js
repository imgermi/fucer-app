// Este plugin se registra después de @nuxt/auth
export default async function ({ store }) {
  store.watch(state => state.auth.loggedIn, () => {
    // Al loguearse
    if (store.state.auth.loggedIn) {
      // Obtiene favoritos y cachea sus recursos
      await store.dispatch('normativas/getFavoritas')
      let urls = [
        `https://fucer.com.ar/app/api/favoritos?usuario=${store.state.auth.user.id}`
      ]
      store.getters['normativas/favoritas'].map(item => {
        urls.splice(urls.length, 0,
          `https://fucer.com.ar/app/api/normativas/id/${item.url.params.id}`,
          `/normativa/${item.url.params.id}/${item.url.params.slug}`,
          ...item.recursos
        )
      })
      window.caches.open('fucer-favoritos')
        .then(cache => cache.addAll(urls))
    
    // Al desloguearse
    } else {
      store.dispatch('normativas/emptyFavoritas')
    }
  })
}