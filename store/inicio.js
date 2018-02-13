const BASE_URL = 'https://fucer.com.ar/app/api/'

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
    commit('SET_NORMATIVAS_DESTACADAS', normativas)
  },
  async getNormativasMasNuevas ({ commit }, limit = 3) {
    const normativas = await this.$axios.$get('normativas/ultimas/' + limit)
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
  }
}
