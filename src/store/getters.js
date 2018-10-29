// -- Filter Functions
// The following functions are helpers to make our filtering logic more clear.
// They all take an entry which is a 2 element array representing a key/value
// pair from a js Object
//
// Note that the way the .filter works is to EXCLUDE any false values
// All of these filter functions return a boolean, so if we used .filter
// on isStarred, it would filter out any tasks that don't have a "starred" field
// or the starred field is false
function isPropertySet (entry, propName) {
  if (typeof entry === 'undefined' || entry.length !== 2) {
    return false
  }

  return entry[1].hasOwnProperty(propName) && entry[1][propName] !== ''
}

function isCompleted (entry) {
  return isMatchingState(entry, 'completed')
}

function isStarred (entry) {
  if (isPropertySet(entry, 'starred')) {
    return entry[1].starred
  }

  return false
}

function includeSnoozed (entry) {
  return isPropertySet(entry, 'snoozedUntil')
}

function excludeFutureSnoozed (entry) {
  // js filter works as true == include, false == exclude
  // we only want to exclude tasks that are actually snoozed and are in the future
  if (!isPropertySet(entry, 'snoozedUntil')) {
    return true
  }

  // we only exclude (return FALSE) if the date is AFTER today's current time
  const entryDate = new Date(entry[1]['snoozedUntil'])
  return entryDate < new Date()
}

function includeDue (entry) {
  return isPropertySet(entry, 'dueAt')
}

function excludeFutureDue (entry, futureCompare) {
  // js filter works as true == include, false == exclude
  // we only want to exclude tasks that are actually due and are in the future
  if (!isPropertySet(entry, 'dueAt')) {
    return true
  }

  // we only exclude (return FALSE) if the date is AFTER today's current time
  const entryDate = new Date(entry[1]['dueAt'])
  return entryDate < futureCompare
}

function isProjectTask (entry) {
  return isPropertySet(entry, 'projectId')
}

function isMatchingProject (entry, projectId) {
  if (isProjectTask(entry)) {
    return entry[1].projectId === projectId
  }

  return false
}

// Possible states are:
// - inbox
// - today
// - now
// - later
// - weekend
// - dateSet
// - completed
function isMatchingState (entry, state) {
  return (isPropertySet(entry, 'state') && entry[1].state === state)
}

function isNextAction (entry) {
  if (isProjectTask(entry)) {
    return isStarred(entry)
  }

  // all non-project tasks are next actions
  return true
}

function sortDate (a, b, datefield, direction) {
  if (isPropertySet(a, datefield) && isPropertySet(b, datefield)) {
    const aDate = new Date(a[1][datefield])
    const bDate = new Date(b[1][datefield])
    if (direction === 'desc') {
      return bDate.getTime() - aDate.getTime()
    } else {
      return aDate.getTime() - bDate.getTime()
    }
  }

  return 0
}

// this func is no longer in use, but could be down the road
// remove the eslint-disable if we start using it again
// eslint-disable-next-line
function uniq (entries) {
  let seen = {}
  return entries.filter((entry) => {
    return seen.hasOwnProperty(entry[0]) ? false : (seen[entry[0]] = true)
  })
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
    var retTasks = []

    let filtered = Object.entries(state.tasks)
      .filter((entry) => !isCompleted(entry))
      .filter((entry) => isMatchingProject(entry, projId))
      .filter((entry) => !includeSnoozed(entry))

    filtered.sort((a, b) => sortDate(a, b, 'createdAt', 'desc'))
    filtered.forEach(entry => retTasks.push(entry[0]))

    return retTasks
  },

  projectOldestTask: state => projId => {
    let filtered = Object.entries(state.tasks)
      .filter((entry) => !isCompleted(entry))
      .filter((entry) => isMatchingProject(entry, projId))
      .filter((entry) => !includeSnoozed(entry))

    filtered.sort((a, b) => sortDate(a, b, 'createdAt', 'asc'))

    if (filtered.length === 0) {
      return null
    } else {
      return filtered[0][0]
    }
  },

  tasksActive: state => {
    let retTasks = []

    let filtered = Object.entries(state.tasks)
      .filter((entry) => !isCompleted(entry))
      .filter((entry) => isNextAction(entry))
      .filter((entry) => !includeSnoozed(entry))

    filtered.sort((a, b) => sortDate(a, b, 'createdAt', 'desc'))
    filtered.forEach(entry => retTasks.push(entry[0]))

    return retTasks
  },

  inboxTasks: state => {
    let retTasks = []

    let filtered = Object.entries(state.tasks)
      .filter((entry) => isMatchingState(entry, 'inbox'))

    filtered.sort((a, b) => sortDate(a, b, 'createdAt', 'desc'))
    filtered.forEach(entry => retTasks.push(entry[0]))

    return retTasks
  },

  weekendTasks: state => {
    let retTasks = []

    let filtered = Object.entries(state.tasks)
      .filter((entry) => isMatchingState(entry, 'weekend'))

    filtered.sort((a, b) => sortDate(a, b, 'createdAt', 'desc'))
    filtered.forEach(entry => retTasks.push(entry[0]))

    return retTasks
  },

  todayTasks: state => {
    let retTasks = []

    let filtered = Object.entries(state.tasks)
      .filter((entry) => isMatchingState(entry, 'today'))

    filtered.sort((a, b) => sortDate(a, b, 'createdAt', 'desc'))
    filtered.forEach(entry => retTasks.push(entry[0]))

    return retTasks
  },

  nowTask: state => {
    let filtered = Object.entries(state.tasks)
      .filter((entry) => isMatchingState(entry, 'now'))

    if (filtered.length === 0) {
      return null
    }

    return filtered[0][0]
  },

  laterView: state => {
    let retTasks = []

    let later = Object.entries(state.tasks)
      .filter((entry) => isMatchingState(entry, 'later'))

    later.sort((a, b) => sortDate(a, b, 'createdAt', 'desc'))
    later.forEach(entry => retTasks.push(entry[0]))

    return retTasks
  },

  projectsActive: state => {
    let ret = []

    let filtered = Object.entries(state.projects)
      .filter((entry) => !isCompleted(entry))

    filtered.forEach(entry => ret.push(entry[0]))

    return ret
  },

  projectsCompleted: state => {
    var ret = []

    let filtered = Object.entries(state.projects)
      .filter((entry) => isCompleted(entry))

    filtered.forEach(entry => ret.push(entry[0]))

    return ret
  },

  tasksStarred: state => {
    let retTasks = []

    let filtered = Object.entries(state.tasks)
      .filter((entry) => !isCompleted(entry))
      .filter((entry) => isStarred(entry))
      .filter((entry) => !includeSnoozed(entry))

    filtered.sort((a, b) => sortDate(a, b, 'createdAt', 'desc'))
    filtered.forEach(entry => retTasks.push(entry[0]))

    return retTasks
  },

  tasksDue: state => {
    let retTasks = []

    let filtered = Object.entries(state.tasks)
      .filter((entry) => isMatchingState(entry, 'dateSet'))
      .filter((entry) => includeDue(entry))

    filtered.sort((a, b) => sortDate(a, b, 'dueAt', 'desc'))
    filtered.forEach(entry => retTasks.push(entry[0]))

    return retTasks
  },

  tasksDueWithin: state => days => {
    let retTasks = []

    // we want to include any tasks that are due within two days
    let dueCompareDate = new Date(new Date().setHours(24 * days, 0, 0))

    let filtered = Object.entries(state.tasks)
      .filter((entry) => isMatchingState(entry, 'dateSet'))
      .filter((entry) => includeDue(entry))
      .filter((entry) => excludeFutureDue(entry, dueCompareDate))

    filtered.sort((a, b) => sortDate(a, b, 'dueAt', 'desc'))
    filtered.forEach(entry => retTasks.push(entry[0]))

    return retTasks
  },

  tasksSnoozed: state => {
    let retTasks = []

    let filtered = Object.entries(state.tasks)
      .filter((entry) => isMatchingState(entry, 'dateSet'))
      .filter((entry) => includeSnoozed(entry))

    filtered.sort((a, b) => sortDate(a, b, 'snoozedUntil', 'desc'))
    filtered.forEach(entry => retTasks.push(entry[0]))

    return retTasks
  },

  tasksSnoozeTriggered: state => {
    let retTasks = []

    let filtered = Object.entries(state.tasks)
      .filter((entry) => isMatchingState(entry, 'dateSet'))
      .filter((entry) => includeSnoozed(entry))
      .filter((entry) => excludeFutureSnoozed(entry))

    filtered.sort((a, b) => sortDate(a, b, 'snoozedUntil', 'desc'))
    filtered.forEach(entry => retTasks.push(entry[0]))

    return retTasks
  },

  projectTasksCompleted: state => projId => {
    var retTasks = []

    let filtered = Object.entries(state.tasks)
      .filter((entry) => isCompleted(entry))
      .filter((entry) => isMatchingProject(entry, projId))

    filtered.sort((a, b) => sortDate(a, b, 'completedAt', 'desc'))
    filtered.forEach(entry => retTasks.push(entry[0]))

    return retTasks
  },

  tasksCompleted: state => {
    var retTasks = []

    let filtered = Object.entries(state.tasks)
      .filter((entry) => isCompleted(entry))

    filtered.sort((a, b) => sortDate(a, b, 'completedAt', 'desc'))
    filtered.forEach(entry => retTasks.push(entry[0]))

    return retTasks
  },

  projectTasksSnoozed: state => projId => {
    var retTasks = []

    let filtered = Object.entries(state.tasks)
      .filter((entry) => isMatchingState(entry, 'dateSet'))
      .filter((entry) => includeSnoozed(entry))
      .filter((entry) => isMatchingProject(entry, projId))

    filtered.sort((a, b) => sortDate(a, b, 'snoozedUntil', 'desc'))
    filtered.forEach(entry => retTasks.push(entry[0]))

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
        if (state.projects[key].completed === false || state.projects[key].state !== 'completed') {
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
        if (state.tasks[key].completed === false || state.tasks[key].state !== 'completed') {
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
