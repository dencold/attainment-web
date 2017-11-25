import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

const state = {
  user: {},
  projects: {}
}

/*
const actions = {
  updateUser: (context, payload) => {
    context.commit('updateUser', payload)
  }
}
*/

const vx = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

export default vx
export { state, mutations, actions, getters }
