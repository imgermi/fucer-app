export const state = () => ({
  normativas: [],
  busqueda: ''
})

export const mutations = {
  'SET_NORMATIVAS' (state, {normativas, busqueda}) {
    state.normativas = [...normativas]
    state.busqueda = busqueda
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
    commit('SET_NORMATIVAS', {normativas, busqueda})
  }
}
