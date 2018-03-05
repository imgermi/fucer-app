import moment from 'moment'

export const state = () => ({
  pagina: {
    cargando: false
  }
})

export const mutations = {
  'SET_PAGINA_CARGANDO' (state, payload) {
    state.pagina.cargando = payload
  }
}

export const actions = {
  setPaginaCargando ({ commit }, cargando) {
    commit('SET_PAGINA_CARGANDO', cargando)
  }
}

export const getters = {
  usuarioPremium (state, getters, rootState) {
    let usuarioPremium = false
    if(!rootState.auth.user){
    	return false
    }
    if(rootState.auth.user.pago==1){
      usuarioPremium = true
    }else{
      let premiumHasta = moment(rootState.auth.user.pago_fecha).add(1, 'month')
      let hoy = moment()
      if (premiumHasta.diff(hoy, 'days') >= 0) {
        usuarioPremium = true
      }
    }
    return usuarioPremium
  },

  usuarioPremiumDias (state, getters, rootState) {
    if(! getters.usuarioPremium){
      return 0;
    }
    let premiumHasta = moment(rootState.auth.user.pago_fecha).add(1, 'month')
    let hoy = moment()
    return premiumHasta.diff(hoy, 'days')
  }
}
