export default function ({store}) {
  this.$axios.$get('favoritos', {
    params: {
      usuario: store.state.usuario.id
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