import api from '~/api'

export const state = () => ({
  normativas: [],
})

export const mutations = {
  'AGREGAR_FAVORITO' (state, normativa) {
    state.normativas.push(normativa)
  },
  'QUITAR_FAVORITO' (state, idNormativa) {
    let indiceFavorito = state.normativas.findIndex(
      favorito => idNormativa === favorito.id
    )
    if (indiceFavorito !== -1) {
      state.normativas.splice(indiceFavorito, 1)
    }
  }
}

export const actions = {
  async agregarFavorito ({ commit }, normativa) {
    commit('AGREGAR_FAVORITO', normativa)
  },
  async quitarFavorito ({ commit }, idNormativa) {
    commit('QUITAR_FAVORITO', idNormativa)
  },
}
