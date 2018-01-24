function isCompleted (entry) {
  const val = entry[1]

  // if the entry doesn't have completed property it isn't completed
  if (!val.hasOwnProperty('completed')) {
    return false
  }

  return val.completed
}

function isStarred (entry) {
  const val = entry[1]

  if (!val.hasOwnProperty('starred')) {
    return false
  }

  return val.starred
}

function isProjectTask (entry) {
  const val = entry[1]

  if (!val.hasOwnProperty('projectId')) {
    return false
  }

  if (val.projectId === '') {
    return false
  }

  return true
}

function isMatchingProject (entry, projectId) {
  const val = entry[1]

  if (!val.hasOwnProperty('projectId')) {
    return false
  }

  return (val.projectId === projectId)
}

function isNextAction (entry) {
  if (isProjectTask(entry)) {
    return isStarred(entry)
  }

  // all non-project tasks are next actions
  return true
}

function excludeOlderThanDate (entry, dateProperty, compareDate) {
  const val = entry[1]

  if (val.hasOwnProperty(dateProperty) && val[dateProperty] !== '') {
    const entryDate = new Date(val[dateProperty])

    if (entryDate <= compareDate) {
      return true
    }
  }

  // we have to have a dateProperty, if not, default to inclusion
  return false
}

function excludeSnoozed (entry) {
  const compareDate = new Date()
  return excludeOlderThanDate(entry, 'snoozedUntil', compareDate)
}

export default {
  isLoggedIn: state => {
    // yep, it's 2017 & this is how we check that an Object is empty
    // javascript, you are an amazing language
    if (Object.keys(state.user).length === 0 &&
      state.user.constructor === Object) {
      // we have an empty user, return false
      return false
    }

    return true
  },

  projectTasksActive: state => projId => {
    var retTasks = {}

    let filtered = Object.entries(state.tasks)
      .filter((entry) => !isCompleted(entry))
      .filter((entry) => isMatchingProject(entry, projId))

    filtered.forEach((entry) => { retTasks[entry[0]] = entry[1] })

    return retTasks
  },

  tasksActive: state => {
    let retTasks = {}

    let filtered = Object.entries(state.tasks)
      .filter((entry) => !isCompleted(entry))
      .filter((entry) => isNextAction(entry))

    filtered.forEach((entry) => { retTasks[entry[0]] = entry[1] })

    return retTasks
  },

  tasksStarred: state => {
    let retTasks = {}

    let filtered = Object.entries(state.tasks)
      .filter((entry) => !isCompleted(entry))
      .filter((entry) => isStarred(entry))

    filtered.forEach((entry) => { retTasks[entry[0]] = entry[1] })

    return retTasks
  },

  tasksDue: state => {
    let retTasks = {}

    // we want to include any tasks that are due within two days
    let compareDate = new Date(new Date().setHours(48, 0, 0))

    let filtered = Object.entries(state.tasks)
      .filter((entry) => !isCompleted(entry))
      .filter((entry) => excludeOlderThanDate(entry, 'dueAt', compareDate))

    filtered.forEach((entry) => { retTasks[entry[0]] = entry[1] })

    return retTasks
  },

  projectTasksCompleted: state => projId => {
    var retTasks = {}

    let filtered = Object.entries(state.tasks)
      .filter((entry) => isCompleted(entry))
      .filter((entry) => isMatchingProject(entry, projId))

    filtered.forEach((entry) => { retTasks[entry[0]] = entry[1] })

    return retTasks
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
