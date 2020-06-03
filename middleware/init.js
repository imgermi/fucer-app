import normalizarNormativas from '~/utils/normalizar-normativas'

export default async function ({store, app, route}) {
  if (app.$auth.loggedIn) {
    let normativas = await app.$axios.$get('favoritos', {
      params: {
        usuario: app.$auth.user.id
      }
    })
    normativas = normalizarNormativas(normativas)
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