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

  // note there is probably a much better way to do this, its mostly used
  // for fuse.js which needs to operate on an array and not an array-like object
  searchItems: state => {
    let retArray = []

    // first add our projects in
    for (let key in state.projects) {
      // we only search active projects
      if (state.projects[key].completed === false) {
        let proj = state.projects[key]
        proj['id'] = key
        proj['type'] = 'project'
        retArray.push(proj)
      }
    }

    // and now our tasks
    for (let key in state.tasks) {
      if (state.tasks[key].completed === false) {
        let task = state.tasks[key]
        task['id'] = key
        task['type'] = 'task'
        retArray.push(task)
      }
    }

    return retArray
  },

  numTasksInProject: (state, getters) => projId => {
    const projTasks = getters.projectTasksActive(projId)

    return Object.keys(projTasks).length
  }

}
