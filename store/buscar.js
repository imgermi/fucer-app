import normalizarNormativas from '~/utils/normalizar-normativas'

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
    commit('SET_NORMATIVAS', {
      'normativas': normalizarNormativas(normativas),
      busqueda
    })
  }
}
