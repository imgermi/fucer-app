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
    if (!busqueda) {
      return
    }
    const normativas = await this.$axios.$get('normativas/buscar', {
      params: {
        busqueda: busqueda
      }
    })
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
    commit('SET_NORMATIVAS', normativas)
  }
}
