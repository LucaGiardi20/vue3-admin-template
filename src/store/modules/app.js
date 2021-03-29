// initial state
const state = () => ({
  sidebarOpened: true
});

// getters
const getters = {
  sidebarOpened: (state) => {
    return state.sidebarOpened;
  }
};

// actions
const actions = {
  resetState({ commit }) {
    commit("resetState");
  },
  toggleSidebar({ commit }) {
    commit("toggleSidebar");
  }
};

// mutations
const mutations = {
  resetState(state) {
    state.sidebarOpened = false;
  },
  toggleSidebar(state) {
    state.sidebarOpened = !state.sidebarOpened;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};