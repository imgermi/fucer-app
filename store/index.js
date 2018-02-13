export const state = () => ({
  pagina: {
    cargando: false
  }
})

export const mutations = {
  'SET_PAGINA_CARGANDO' (state, payload) {
    state.pagina.cargando = payload
  }
}

export const actions = {
  setPaginaCargando ({ commit }, cargando) {
    commit('SET_PAGINA_CARGANDO', cargando)
  }
}
