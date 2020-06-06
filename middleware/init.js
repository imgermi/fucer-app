export default async function ({store, app, route}) {
  if (app.$auth.loggedIn) {
    store.dispatch('normativas/getFavoritas')

    // Cachea recursos de favoritos
    let urls = [
      `https://fucer.com.ar/app/api/favoritos?usuario=${app.$auth.user.id}`
    ]
    store.getters['normativas/favoritas'].map(item => {
      urls.splice(urls.length, 0,
        `https://fucer.com.ar/app/api/normativas/id/${item.url.params.id}`,
        `/normativa/${item.url.params.id}/${item.url.params.slug}`,
        ...item.recursos
      )
    })
    const cache = await window.caches.open('fucer-favoritos')
    cache.addAll(urls)
  }
}