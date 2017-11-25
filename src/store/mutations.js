import Vue from 'vue'

/* eslint-disable no-param-reassign, no-undef, no-console, no-unused-vars */
export default {
  SET_USER (state, user) {
    state.user = user
  },
  UNSET_USER (state) {
    state.user = {}
    // Resetting state for proper local storage sync.
    state.tasks = {}
  },
  ADD_PROJECT (state, {id, newProj}) {
    Vue.set(state.projects, id, newProj)
  }
}
