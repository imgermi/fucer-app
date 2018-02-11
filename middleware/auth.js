import api from '~/api'

export default function ({store}) {
  api.getFavoritos(store.state.usuario.id).then((normativas) => {
    store.dispatch('favoritos/cargarFavoritos', normativas)
  })
}