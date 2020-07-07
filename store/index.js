export const state = () => ({
  pagina: {
    error: false,
    cargando: false,
  },
  menu: {
    activo: false,
  },
});

export const mutations = {
  SET_PAGINA_ERROR(state, payload) {
    state.pagina.error = payload;
  },
  SET_PAGINA_CARGANDO(state, payload) {
    state.pagina.cargando = payload;
  },
  SET_MENU_ACTIVO(state, payload) {
    state.menu.activo = !!payload;
  },
};

export const actions = {
  setPaginaError({ commit }, cargando) {
    commit("SET_PAGINA_ERROR", cargando);
  },
  setPaginaCargando({ commit }, cargando) {
    commit("SET_PAGINA_CARGANDO", cargando);
  },
  setMenuActivo({ commit }, activo) {
    commit("SET_MENU_ACTIVO", activo);
  },
};
