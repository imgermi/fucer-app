import api from '~/api'

export const state = () => ({
  normativasDestacadas: [],
  normativasMasNuevas: []
})

export const mutations = {
  'SET_NORMATIVAS_DESTACADAS' (state, payload) {
    state.normativasDestacadas = payload
  },
  'SET_NORMATIVAS_MAS_NUEVAS' (state, payload) {
    state.normativasMasNuevas = payload
  }
}

export const actions = {
  async getNormativasDestacadas ({ commit }) {
    const normativas = await api.getNormativasDestacadas()
    commit('SET_NORMATIVAS_DESTACADAS', normativas)
  },
  async getNormativasMasNuevas ({ commit }, limit = 3) {
    const normativas = await api.getNormativasMasNuevas(limit)
    commit('SET_NORMATIVAS_MAS_NUEVAS', normativas)
  }
}
