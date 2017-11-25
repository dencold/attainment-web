import moment from 'moment'

/* eslint-disable no-param-reassign, no-undef, no-console, no-unused-vars */
export default {
  SET_USER (state, user) {
    state.user = user
    moment()
  },
  UNSET_USER (state) {
    state.user = {}
    // Resetting state for proper local storage sync.
    state.tasks = {}
  }
}
