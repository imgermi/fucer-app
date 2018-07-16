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
  diasFinSuscripcion (state, getters, rootState) {
    let premiumHasta = moment('7/15/2018').add(1, 'month')
    let hoy = moment()
    return premiumHasta.diff(hoy, 'days')
  },

  diasFinTrial (state, getters, rootState) {
    let fechaSuscripcion = moment('7/15/2018')
    let hoy = moment()
    return 15 - hoy.diff(fechaSuscripcion, 'days')
  },

  mensajeDiasFinTrial (state, getters) {
    if (getters.diasFinTrial > 0) {
      return 'En <b>'
        + getters.diasFinTrial
        + ' '
        + (getters.diasFinTrial > 1 ? 'dias' : 'día')
        + ' se termina</b> su versión de trial.'
    } else if (getters.diasFinTrial == 0) {
      return '<b>Hoy se termina</b> su versión de trial.'
    } else {
      return 'Su versión de trial <b>ha caducado</b>.'
    }
  },

  esTrial (state, getters) {
    return getters.diasFinTrial > 0
  },

  estaSuscripto (state, getters, rootState) {
    return rootState.auth.user && rootState.auth.user.esta_suscrito == 1
      ? getters.diasFinSuscripcion > 0
      : false
  },

  mensajePlan (state, getters) {
    if (getters.estaSuscrito) {
      return 'En ' + getters.diasFinSuscripcion +
        ' días se debitará el próximo pago.'
    } else {
      if (getters.esTrial) {
        return getters.mensajeDiasFinTrial
      }
      return getters.usuarioPremium
        ? 'Su suscripción ya fue cancelada pero le quedan ' +
          getters.diasFinSuscripcion +
          ' días premium.'
        : 'La versión de trial ha caducado.'
    }
  }
}
