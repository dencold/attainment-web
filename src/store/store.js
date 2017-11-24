import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  user: null,
  projects: [
    {name: 'Do this'},
    {name: 'No, do that'}
  ]
}

const mutations = {
  updateUser: (state, payload) => {
    state.user = payload
  }
}

const actions = {
  updateUser: (context, payload) => {
    context.commit('updateUser', payload)
  }
}

const vx = new Vuex.Store({
  state,
  mutations,
  actions
})

export default vx
