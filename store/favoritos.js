export const state = () => ({
  normativas: [],
})

export const mutations = {
  'CARGAR_FAVORITOS' (state, normativas) {
    state.normativas = normativas
  },
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
  async agregarFavorito ({ commit, rootState }, normativa) {
    await this.$axios.post('favoritos', {
      usuario: rootState.usuario.id,
      normativa: normativa.id
    })
    commit('AGREGAR_FAVORITO', normativa)
  },
  async quitarFavorito ({ commit, rootState }, idNormativa) {
    await this.$axios.delete('favoritos', {
      params: {
        usuario: rootState.usuario.id,
        normativa: idNormativa
      }
    })
    commit('QUITAR_FAVORITO', idNormativa)
  },
  async cargarFavoritos ({ commit }, normativas) {
    commit('CARGAR_FAVORITOS', normativas)
  }
}
