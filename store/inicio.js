import normalizarNormativas from '~/utils/normalizar-normativas'

const BASE_URL = 'https://fucer.com.ar/app/api/'

export const state = () => ({
  normativasDestacadas: [],
  normativasMasNuevas: [],
  normativasTodas: []
})

export const mutations = {
  'SET_NORMATIVAS_DESTACADAS' (state, payload) {
    state.normativasDestacadas = [...payload]
  },
  'SET_NORMATIVAS_MAS_NUEVAS' (state, payload) {
    state.normativasMasNuevas = [...state.normativasMasNuevas, ...payload]
  },
  'SET_NORMATIVAS_TODAS' (state, payload) {
    state.normativasTodas = [...payload]
  }
}

export const actions = {
  async getNormativasDestacadas ({ commit }) {
    const normativas = await this.$axios.$get('normativas/destacadas/5')
    commit('SET_NORMATIVAS_DESTACADAS', normalizarNormativas(normativas).reverse())
  },
  async getNormativasMasNuevas ({ commit, state }, pagina = 1) {
    let total = state.normativasMasNuevas.length
    const normativas = await this.$axios.$get('normativas/ultimas/' + pagina)
    commit('SET_NORMATIVAS_MAS_NUEVAS', normalizarNormativas(normativas))
    if (total && total === state.normativasMasNuevas.length) {
      commit('SET_NORMATIVAS_TODAS', true)
    }
  }
}
