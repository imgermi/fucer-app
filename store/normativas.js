export const state = () => ({
  byId: {},
  idsByFilter: {
    todas: [],
    favoritas: [],
    destacadas: [],
    recientes: [],
    busqueda: [],
  },
  busquedaGuardada: '',
  todas: false,
})

export const mutations = {
  'RECEIVE_NORMATIVAS'(state, {response, filter=''}) {
    const byId = { ...state.byId }
    response.forEach(normativa => {
      byId[normativa.id] = normativa
    });
    state.byId = byId

    switch (filter) {
      case 'destacadas':
      case 'favoritas':
      case 'busqueda':
        state.idsByFilter[filter] = response.map(normativa => normativa.id)
        break;
    
      case 'recientes':
        state.idsByFilter[filter] = [
          ...state.idsByFilter[filter],
          ...response.map(normativa => normativa.id)
        ]
        break;
    }
  },
  'SET_BUSQUEDA'(state, payload) {
    state.busquedaGuardada = payload
  },
  'AGREGAR_FAVORITO'(state, payload) {
    state.idsByFilter['favoritas'] = [
      ...state.idsByFilter['favoritas'],
      payload
    ]
  },
  'QUITAR_FAVORITO'(state, payload) {
    let indice = state.idsByFilter['favoritas'].findIndex(
      id => payload === id
    )
    if (indice !== -1) {
      state.idsByFilter['favoritas'] = [
        ...state.idsByFilter['favoritas'].slice(0, indice),
        ...state.idsByFilter['favoritas'].slice(indice + 1)
      ]
    }
  }
}

export const actions = {
  async getById({ commit }, id) {
    const normativa = await this.$axios.$get(`normativas/id/${id}`)
    commit('RECEIVE_NORMATIVAS', {
      response: normalizarNormativas([normativa])
    })
  },
  async getDestacadas({ commit }) {
    const normativas = await this.$axios.$get('normativas/destacadas/5')
    commit('RECEIVE_NORMATIVAS', {
      response: normalizarNormativas(normativas),
      filter: 'destacadas',
    })
  },
  async getRecientes({ commit, state }, pagina = 1) {
    const normativas = await this.$axios.$get('normativas/ultimas/' + pagina)
    // TODO: Set state.todas
    commit('RECEIVE_NORMATIVAS', {
      response: normalizarNormativas(normativas),
      filter: 'recientes',
    })
  },
  async buscar({ commit }, busqueda) {
    if (!busqueda) {
      return
    }
    const normativas = await this.$axios.$get('normativas/buscar', {
      params: { busqueda }
    })
    commit('RECEIVE_NORMATIVAS', {
      response: normalizarNormativas(normativas),
      filter: 'busqueda',
    })
    commit('SET_BUSQUEDA', busqueda)
  },
  async getFavoritas({ commit }) {
    const normativas = await this.$axios.$get('favoritos', {
      params: {
        usuario: this.$auth.user.id
      }
    })
    commit('RECEIVE_NORMATIVAS', {
      response: normalizarNormativas(normativas),
      filter: 'favoritas',
    })
  },
  async agregarFavorito({ commit }, idNormativa) {
    await this.$axios.post('favoritos', {
      usuario: this.$auth.user.id,
      normativa: idNormativa
    })
    commit('AGREGAR_FAVORITO', idNormativa)
  },
  async quitarFavorito({ commit }, idNormativa) {
    await this.$axios.delete('favoritos', {
      params: {
        usuario: this.$auth.user.id,
        normativa: idNormativa
      }
    })
    commit('QUITAR_FAVORITO', idNormativa)
  },
}

export const getters = {
  destacadas: state => state.idsByFilter.destacadas.map(id => state.byId[id]),
  favoritas: state => state.idsByFilter.favoritas.map(id => state.byId[id]),
  recientes: state => state.idsByFilter.recientes.map(id => state.byId[id]),
  busqueda: state => state.idsByFilter.busqueda.map(id => state.byId[id]),
  enFavoritos: state => id => {
    return state.idsByFilter.favoritas.filter(idFav => idFav === id).length > 0
  }
}

// Utils
const normalizarNormativas = (normativas) => {
  return normativas.map(item => ({
    ...item,
    url: {
      name: 'normativa',
      params: {
        id: item.id,
        slug: decodeURIComponent(item.uri)
      }
    }
  }))
}