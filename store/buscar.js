import api from '~/api'

export const state = () => ({
  normativas: [],
})

export const mutations = {
  'SET_NORMATIVAS' (state, payload) {
    state.normativas = payload
  }
}

export const actions = {
  async buscarNormativas ({ commit }, busqueda) {
    const normativas = await api.buscarNormativas(busqueda)
    commit('SET_NORMATIVAS', normativas)
  }
}
