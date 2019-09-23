export default function ({store, app, route}) {
  if (app.$auth.loggedIn) {
    app.$axios.$get('favoritos', {
      params: {
        usuario: app.$auth.user.id
      }
    })
    .then((normativas) => {
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

      let urls = [
        `https://fucer.com.ar/app/api/favoritos?usuario=${app.$auth.user.id}`
      ]
      normativas.map(item => {
        urls.splice(urls.length, 0,
          `https://fucer.com.ar/app/api/normativas/id/${item.url.params.id}`,
          `http://local.fucer.com.ar:3000/normativa/${item.url.params.id}/${item.url.params.slug}`,
          ...item.recursos
        )
      })
      caches.open(`workbox-runtime-http://local.fucer.com.ar:3000/`)
        .then(cache => cache.addAll(urls))
    })

  }
}