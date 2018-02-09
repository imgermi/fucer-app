import api from '~/api'

export const state = () => ({
  normativasDestacadas: []
})

export const mutations = {
  'SET_NORMATVAS' (state, payload) {
    state.normativasDestacadas = payload
  }
}

export const actions = {
  async getNormativasDestacadas ({ commit }) {
    const normativas = await api.getNormativasDestacadas()
    commit('SET_NORMATVAS', normativas)
  }
}
