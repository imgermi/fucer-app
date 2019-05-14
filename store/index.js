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
    let premiumHasta = moment(rootState.auth.user.suscripcion.fecha_proximo_pago)
    let hoy = moment()
    let fecha = premiumHasta.diff(hoy, 'days')
    return fecha > 0 ? fecha : 0
  },

  diasFinTrial (state, getters, rootState) {
    if (!rootState.auth || !rootState.auth.user) {
      return 0
    }
    let fechaFinTrial = moment(rootState.auth.user.suscripcion.fecha_fin_trial)
    let hoy = moment()
    let fecha = fechaFinTrial.diff(hoy, 'days') + 1
    return fecha > 0 ? fecha : 0
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

  usuarioPremium (state, getters, rootState) {
    return rootState.auth
      && rootState.auth.user
      && (rootState.auth.user.es_premium || rootState.auth.user.condicion === 'premium-incondicional')
  },

  estaSuscripto (state, getters, rootState) {
    return rootState.auth
      && rootState.auth.user
      && ((rootState.auth.user.suscripcion.activa && getters.diasFinSuscripcion)
        || rootState.auth.user.condicion === 'premium-incondicional'
      )
  },

  mensajePlan (state, getters) {
    if (getters.estaSuscripto) {
      return 'En ' + getters.diasFinSuscripcion +
        ' días se debitará el próximo pago.'
    } else {
      if (getters.esTrial) {
        return getters.mensajeDiasFinTrial
      }
      return getters.usuarioPremium
        ? (getters.diasFinSuscripcion
          ? 'Su suscripción ya fue cancelada pero le quedan ' + getters.diasFinSuscripcion + ' días premium.'
          : 'Su pago se está verificando, se mantendrá su suscripción solo si se confirma la operación.')
        : 'La versión de prueba ha caducado.'
    }
  }
}
