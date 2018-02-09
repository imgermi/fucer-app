export const state = () => ({
  cargando: false
})

export const mutations = {
  'CARGANDO' (state, payload) {
    state.cargando = payload
  }
}

export const actions = {
  cargando ({ commit }, cargando) {
    commit('CARGANDO', cargando)
  }
}
