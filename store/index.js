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
    if (!rootState.auth || !rootState.auth.user) {
      return 0
    }
    if (getters.esTrial) {
      return getters.diasFinTrial
    }
    // Trial > TODO: Si el día que se hace el primer pago se actualiza la fecha no haría falta sumar 15
    let premiumHasta = moment(rootState.auth.user.suscripcion_fecha)
      .add(15, 'days')
      .add(1, 'month')
    let hoy = moment()
    return premiumHasta.diff(hoy, 'days')
  },

  diasFinTrial (state, getters, rootState) {
    if (!rootState.auth || !rootState.auth.user) {
      return 0
    }
    let fechaSuscripcion = moment(rootState.auth.user.suscripcion_fecha)
    let hoy = moment()
    return 15 - hoy.diff(fechaSuscripcion, 'days')
  },

  mensajeDiasFinTrial (state, getters) {
    if (getters.diasFinTrial > 0) {
      return 'En <b>'
        + getters.diasFinTrial
        + ' '
        + (getters.diasFinTrial > 1 ? 'dias' : 'día')
        + ' se termina</b> su versión de prueba.'
    } else if (getters.diasFinTrial == 0) {
      return '<b>Hoy se termina</b> su versión de prueba.'
    } else {
      return 'Su versión de prueba <b>ha caducado</b>.'
    }
  },

  esTrial (state, getters) {
    return getters.diasFinTrial > 0
  },

  usuarioPremium (state, getters) {
    return getters.diasFinSuscripcion > 0
  },

  estaSuscripto (state, getters, rootState) {
    return rootState.auth && rootState.auth.user && rootState.auth.user.esta_suscrito == 1
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
        : 'La versión de prueba ha caducado.'
    }
  }
}
