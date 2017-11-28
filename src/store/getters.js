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

  projectTasks: state => projId => {
    var matchingTasks = {}

    for (var key in state.tasks) {
      if (state.tasks.hasOwnProperty(key) && state.tasks[key].projectId === projId) {
        matchingTasks[key] = state.tasks[key]
      }
    }

    return matchingTasks
  },

  numTasksInProject: (state, getters) => projId => {
    const projTasks = getters.projectTasks(projId)

    return Object.keys(projTasks).length
  }

}
