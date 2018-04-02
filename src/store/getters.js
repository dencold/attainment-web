// -- Filter Functions
// The following functions are helpers to make our filtering logic more clear.
// They all take an entry which is a 2 element array representing a key/value
// pair from a js Object
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

function isSnoozeSet (entry) {
  return isPropertySet(entry, 'snoozedUntil')
}

function isDueSet (entry) {
  return isPropertySet(entry, 'dueAt')
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

function isEntryTminus (entry, dateProperty, compareDate) {
  if (isPropertySet(entry, dateProperty)) {
    const entryDate = new Date(entry[1][dateProperty])

    if (entryDate <= compareDate) {
      return true
    }
  }

  return false
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
      .filter((entry) => !isSnoozeSet(entry))

    filtered.sort((a, b) => b[1].createdAt - a[1].createdAt)
    filtered.forEach(entry => retTasks.push(entry[0]))

    return retTasks
  },

  tasksActive: state => {
    let retTasks = []

    let filtered = Object.entries(state.tasks)
      .filter((entry) => !isCompleted(entry))
      .filter((entry) => isNextAction(entry))
      .filter((entry) => !isSnoozeSet(entry))

    filtered.sort((a, b) => b[1].createdAt - a[1].createdAt)
    filtered.forEach(entry => retTasks.push(entry[0]))

    return retTasks
  },

  inboxTasks: state => {
    let retTasks = []

    let filtered = Object.entries(state.tasks)
      .filter((entry) => isMatchingState(entry, 'inbox'))

    filtered.sort((a, b) => b[1].createdAt - a[1].createdAt)
    filtered.forEach(entry => retTasks.push(entry[0]))

    return retTasks
  },

  todayTasks: state => {
    let retTasks = []

    let filtered = Object.entries(state.tasks)
      .filter((entry) => isMatchingState(entry, 'today'))

    filtered.sort((a, b) => b[1].createdAt - a[1].createdAt)
    filtered.forEach(entry => retTasks.push(entry[0]))

    return retTasks
  },

  weekView: state => {
    // Task has status "weekly" (duh :)
    // Task has a due date within this week
    // Task snooze time has eclipsed (set to the current day or before)
    let retTasks = []

    let week = Object.entries(state.tasks)
      .filter((entry) => isMatchingState(entry, 'week'))

    // we want to include any tasks that are due within the week
    let compareDate = new Date(new Date().setHours(24 * 5, 0, 0))
    let due = Object.entries(state.tasks)
      .filter((entry) => !isCompleted(entry))
      .filter((entry) => isEntryTminus(entry, 'dueAt', compareDate))

    let snooze = Object.entries(state.tasks)
      .filter((entry) => !isCompleted(entry))
      .filter((entry) => isEntryTminus(entry, 'snoozedUntil', (new Date())))

    // combine all sets into one
    let combined = week.concat(due, snooze)
    combined = uniq(combined)

    combined.sort((a, b) => b[1].updatedAt - a[1].updatedAt)
    combined.forEach(entry => retTasks.push(entry[0]))

    return retTasks
  },

  backlogView: state => {
    // INCLUDE:
    // - Task has status "backlog" (duh :)
    // - Task has an unset status (backward compatibility for old tasks without state)
    // EXCLUDE:
    // - Task is completed
    // - Task has a due date within this week
    // - Task snooze time has eclipsed (set to the current day or before)
    // - Project tasks that aren't starred
    let retTasks = []

    let backlog = Object.entries(state.tasks)
      .filter((entry) => isMatchingState(entry, 'backlog'))

    let unset = Object.entries(state.tasks)
      .filter((entry) => !isPropertySet(entry, 'state'))

    // combine the two
    backlog = backlog.concat(unset)

    // exclude tasks noted above using filters
    let compareDate = new Date(new Date().setHours(24 * 5, 0, 0))
    let filtered = backlog
      .filter((entry) => !isCompleted(entry))
      .filter((entry) => isNextAction(entry))
      .filter((entry) => !isEntryTminus(entry, 'dueAt', compareDate))
      .filter((entry) => !isEntryTminus(entry, 'snoozedUntil', (new Date())))

    filtered.sort((a, b) => b[1].updatedAt - a[1].updatedAt)
    filtered.forEach(entry => retTasks.push(entry[0]))

    return retTasks
  },

  projectsActive: state => {
    let ret = {}

    let filtered = Object.entries(state.projects)
      .filter((entry) => !isCompleted(entry))

    filtered.forEach((entry) => { ret[entry[0]] = entry[1] })

    return ret
  },

  projectsCompleted: state => {
    var ret = {}

    let filtered = Object.entries(state.projects)
      .filter((entry) => isCompleted(entry))

    filtered.forEach((entry) => { ret[entry[0]] = entry[1] })

    return ret
  },

  tasksStarred: state => {
    let retTasks = []

    let filtered = Object.entries(state.tasks)
      .filter((entry) => !isCompleted(entry))
      .filter((entry) => isStarred(entry))
      .filter((entry) => !isSnoozeSet(entry))

    filtered.sort((a, b) => b[1].createdAt - a[1].createdAt)
    filtered.forEach(entry => retTasks.push(entry[0]))

    return retTasks
  },

  tasksDue: state => {
    let retTasks = []

    let filtered = Object.entries(state.tasks)
      .filter((entry) => !isCompleted(entry))
      .filter((entry) => isDueSet(entry))

    filtered.sort((a, b) => sortDate(a, b, 'dueAt', 'desc'))
    filtered.forEach(entry => retTasks.push(entry[0]))

    return retTasks
  },

  tasksDueWithin: state => days => {
    let retTasks = []

    // we want to include any tasks that are due within two days
    let compareDate = new Date(new Date().setHours(24 * days, 0, 0))

    let filtered = Object.entries(state.tasks)
      .filter((entry) => !isCompleted(entry))
      .filter((entry) => isDueSet(entry))
      .filter((entry) => isEntryTminus(entry, 'dueAt', compareDate))

    filtered.sort((a, b) => sortDate(a, b, 'dueAt', 'desc'))
    filtered.forEach(entry => retTasks.push(entry[0]))

    return retTasks
  },

  tasksSnoozed: state => {
    let retTasks = []

    let filtered = Object.entries(state.tasks)
      .filter((entry) => !isCompleted(entry))
      .filter((entry) => isSnoozeSet(entry))

    filtered.sort((a, b) => sortDate(a, b, 'snoozedUntil', 'desc'))
    filtered.forEach(entry => retTasks.push(entry[0]))

    return retTasks
  },

  tasksSnoozeTriggered: state => {
    let retTasks = []

    let filtered = Object.entries(state.tasks)
      .filter((entry) => !isCompleted(entry))
      .filter((entry) => isSnoozeSet(entry))
      .filter((entry) => !isEntryTminus(entry, 'snoozedUntil', (new Date())))

    filtered.sort((a, b) => sortDate(a, b, 'snoozedUntil', 'desc'))
    filtered.forEach(entry => retTasks.push(entry[0]))

    return retTasks
  },

  projectTasksCompleted: state => projId => {
    var retTasks = []

    let filtered = Object.entries(state.tasks)
      .filter((entry) => isCompleted(entry))
      .filter((entry) => isMatchingProject(entry, projId))

    filtered.sort((a, b) => b[1].completedAt - a[1].completedAt)
    filtered.forEach(entry => retTasks.push(entry[0]))

    return retTasks
  },

  tasksCompleted: state => {
    var retTasks = []

    let filtered = Object.entries(state.tasks)
      .filter((entry) => isCompleted(entry))

    filtered.sort((a, b) => b[1].completedAt - a[1].completedAt)
    filtered.forEach(entry => retTasks.push(entry[0]))

    return retTasks
  },

  projectTasksSnoozed: state => projId => {
    var retTasks = []

    let filtered = Object.entries(state.tasks)
      .filter((entry) => !isCompleted(entry))
      .filter((entry) => isMatchingProject(entry, projId))
      .filter((entry) => isSnoozeSet(entry))

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
