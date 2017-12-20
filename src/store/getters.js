export default {
  isLoggedIn: state => {
    // yep, it's 2017 & this is how we check that an Object is empty
    // javascript, you are an amazing language
    if (Object.keys(state.user).length === 0 && state.user.constructor === Object) {
      // we have an empty user, return false
      return false
    }

    return true
  },

  projectTasksActive: state => projId => {
    var matchingTasks = {}

    for (var key in state.tasks) {
      if (state.tasks.hasOwnProperty(key) &&
          state.tasks[key].projectId === projId &&
          state.tasks[key].completed === false) {
        matchingTasks[key] = state.tasks[key]
      }
    }

    return matchingTasks
  },

  projectTasksCompleted: state => projId => {
    var matchingTasks = {}

    for (var key in state.tasks) {
      if (state.tasks.hasOwnProperty(key) &&
          state.tasks[key].projectId === projId &&
          state.tasks[key].completed === true) {
        matchingTasks[key] = state.tasks[key]
      }
    }

    return matchingTasks
  },

  numTasksInProject: (state, getters) => projId => {
    const projTasks = getters.projectTasksActive(projId)

    return Object.keys(projTasks).length
  }

}
