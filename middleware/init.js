export default async function ({store, app, route}) {
  if (app.$auth.loggedIn) {
    let normativas = await app.$axios.$get('favoritos', {
      params: {
        usuario: app.$auth.user.id
      }
    })
    normativas.map(item => {
      item.url = {
        name: 'normativa',
        params: {
          id: item.id,
          slug: decodeURIComponent(item.uri)
        }
      }
      return item
    })
    store.dispatch('favoritos/cargarFavoritos', normativas)

    // Cachea recursos de favoritos
    let urls = [
      `https://fucer.com.ar/app/api/favoritos?usuario=${app.$auth.user.id}`
    ]
    normativas.map(item => {
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