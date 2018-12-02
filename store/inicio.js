const BASE_URL = 'https://fucer.com.ar/app/api/'

export const state = () => ({
  normativasDestacadas: [],
  normativasMasNuevas: [],
  normativasTodas: false
})

export const mutations = {
  'SET_NORMATIVAS_DESTACADAS' (state, payload) {
    state.normativasDestacadas = payload
  },
  'SET_NORMATIVAS_MAS_NUEVAS' (state, payload) {
    state.normativasMasNuevas.push(...payload)
  },
  'SET_NORMATIVAS_TODAS' (state, payload) {
    state.normativasTodas = payload
  }
}

export const actions = {
  async getNormativasDestacadas ({ commit }) {
    const normativas = await this.$axios.$get('normativas/destacadas')
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
    commit('SET_NORMATIVAS_DESTACADAS', normativas.reverse())
  },
  async getNormativasMasNuevas ({ commit, state }, pagina = 1) {
    let total = state.normativasMasNuevas.length
    const normativas = await this.$axios.$get('normativas/ultimas/' + pagina)
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
    commit('SET_NORMATIVAS_MAS_NUEVAS', normativas)
    if (total && total === state.normativasMasNuevas.length) {
      commit('SET_NORMATIVAS_TODAS', true)
    }
  }
}
