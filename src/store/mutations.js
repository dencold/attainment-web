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
  ADD_OR_UPDATE_PROJECT (state, {id, newProj}) {
    Vue.set(state.projects, id, newProj)
  },
  DELETE_PROJECT (state, id) {
    Vue.delete(state.projects, id)
  },
  ADD_OR_UPDATE_TASK (state, {id, newTask}) {
    Vue.set(state.tasks, id, newTask)
  },
  DELETE_TASK (state, id) {
    Vue.delete(state.tasks, id)
  }
}
