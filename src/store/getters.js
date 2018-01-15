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

  tasksActive: state => {
    let retTasks = {}

    for (let key in state.tasks) {
      if (state.tasks.hasOwnProperty(key) &&
          state.tasks[key].completed === false) {
        // if a task is part of a project, only include its next action
        if (state.tasks[key].hasOwnProperty('projectId') &&
            state.tasks[key].projectId !== '' &&
            state.tasks[key].starred === false) {
          continue
        }

        // otherwise it's either not in a project or it is a next action,
        // add it to our return tasks...
        retTasks[key] = state.tasks[key]
      }
    }

    return retTasks
  },

  tasksStarred: state => {
    let retTasks = {}

    for (let key in state.tasks) {
      if (state.tasks.hasOwnProperty(key) &&
          state.tasks[key].completed === false &&
          state.tasks[key].starred === true) {
        retTasks[key] = state.tasks[key]
      }
    }

    return retTasks
  },

  tasksDue: state => {
    let retTasks = {}
    let compareDate = new Date(new Date().setHours(48, 0, 0))

    // return only tasks that are overdue, due today, or due tomorrow
    for (let key in state.tasks) {
      if (state.tasks[key].dueAt !== '') {
        console.log(state.tasks[key].dueAt)
        console.log(key + ' ' + Date(state.tasks[key].dueAt))
      }
      if (state.tasks.hasOwnProperty(key) &&
          state.tasks[key].completed === false &&
          state.tasks[key].dueAt !== '') {
        let dueAt = new Date(state.tasks[key].dueAt)
        if (dueAt < compareDate) {
          retTasks[key] = state.tasks[key]
        }
      }
    }

    return retTasks
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
  searchItems: state => searchCategory => {
    let retArray = []

    // first add our projects in
    if (searchCategory === 'all' || searchCategory === 'projects') {
      for (let key in state.projects) {
        // we only search active projects
        if (state.projects[key].completed === false) {
          let proj = state.projects[key]
          proj['id'] = key
          proj['type'] = 'project'
          retArray.push(proj)
        }
      }
    }

    if (searchCategory === 'all' || searchCategory === 'tasks') {
      // and now our tasks
      for (let key in state.tasks) {
        if (state.tasks[key].completed === false) {
          let task = state.tasks[key]
          task['id'] = key
          task['type'] = 'task'
          retArray.push(task)
        }
      }
    }

    return retArray
  },

  numTasksInProject: (state, getters) => projId => {
    const projTasks = getters.projectTasksActive(projId)

    return Object.keys(projTasks).length
  }

}
