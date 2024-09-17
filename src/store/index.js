// store/index.js
import { plugin } from 'postcss'
import { createStore } from 'vuex'
import createPersistedState  from 'vuex-persistedstate'

export default createStore({
  state: {
    loginButtonName: '登录/注册'
  },
  mutations: {
    setUsername(state, newUsername) {
      console.log('----update store username----', newUsername)
      state.loginButtonName = newUsername
    }
  },
  actions: {
    updateUsername({ commit }, newUsername) {
      commit('setUsername', newUsername)
    }
  },
  plugins: [
    createPersistedState({
      storage: window.localStorage
    })
  ]
})
