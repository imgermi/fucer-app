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
    })
  }
}