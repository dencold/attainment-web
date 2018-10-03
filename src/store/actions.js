import fireApp from '../modules/firebase'

const db = fireApp.firestore()

function initProject (projectName) {
  const name = projectName.trim()

  if (projectName.length === 0) {
    return null
  }

  return {
    name: name,
    notes: '',
    state: 'active',
    createdAt: Date.now(),
    updatedAt: Date.now()
  }
}

export default {
  signOut: (context, payload) => {
    fireApp.auth().signOut()
      .then(context.commit('UNSET_USER'), () => console.log('Failed to sign out'))
  },
  addProject: (context, projectName) => {
    const collection = db.collection('users').doc(context.state.user.uid).collection('projects')
    const project = initProject(projectName)

    if (project) {
      collection.add(project)
    }
  },
  addProjectAndSetTask: (context, payload) => {
    const collection = db.collection('users').doc(context.state.user.uid).collection('projects')
    const project = initProject(payload['projectName'])
    let task = payload['task']

    if (project) {
      collection.add(project)
        .then(docRef => {
          task.projectId = docRef.id
          task.starred = true
          context.dispatch('updateTask', {id: payload['taskId'], newTask: task})
        })
    }
  },
  updateProject: (context, projectDetails) => {
    let newProj = projectDetails['newProj']
    newProj['updatedAt'] = Date.now()

    // setup firebase connections
    db.collection('users')
      .doc(context.state.user.uid)
      .collection('projects')
      .doc(projectDetails['id'])
      .update(newProj)
  },
  toggleProjectCompleted: (context, projectDetails) => {
    let newProj = projectDetails['proj']

    // if we've uncompleted the project, we need to reset the completedAt date
    if (typeof newProj.state === 'undefined' || newProj.state !== 'completed') {
      newProj.state = 'completed'
      newProj.completedAt = Date.now()

      // we also need to complete all of the underlying active tasks
      let projTasks = context.getters.projectTasksActive(projectDetails['id'])
      for (var index in projTasks) {
        context.dispatch('toggleTaskCompleted', {id: projTasks[index], task: context.state.tasks[projTasks[index]]})
      }
    } else {
      newProj.state = 'active'
      newProj.completedAt = ''
    }

    context.dispatch('updateProject', {id: projectDetails['id'], newProj: newProj})
  },
  toggleTaskCompleted: (context, taskDetails) => {
    let newTask = taskDetails['task']

    if (newTask.state !== 'completed') {
      newTask.state = 'completed'
      newTask.completedAt = Date.now()
      if (newTask.projectId && newTask.starred) {
        context.dispatch('setNextProjectAction', newTask.projectId)
      }
    } else {
      newTask.state = 'backlog'
      newTask.completedAt = ''
    }

    context.dispatch('updateTask', {id: taskDetails['id'], newTask: newTask})
  },
  setNextProjectAction: (context, projectId) => {
    const nextActionId = context.getters.projectOldestTask(projectId)

    if (nextActionId) {
      let nextAction = context.state.tasks[nextActionId]
      nextAction.starred = true

      context.dispatch('updateTask', {id: nextActionId, newTask: nextAction})
    }
  },
  cycleTaskSize: (context, taskId) => {
    let sizes = ['T', 'S', 'M', 'L', 'X']
    let newTask = context.state.tasks[taskId]

    // make sure we have a size set
    if (!newTask.hasOwnProperty('size') || newTask.size === '') {
      newTask.size = 'T'
      context.dispatch('updateTask', {id: taskId, newTask: newTask})
    } else {
      let idx = sizes.indexOf(newTask.size)
      idx += 1
      if (idx >= sizes.length) {
        idx = 0
      }

      newTask.size = sizes[idx]
      context.dispatch('updateTask', {id: taskId, newTask: newTask})
    }
  },

  setNowTask: (context, taskId) => {
    // see if we already have a now task set
    let nowTaskId = context.getters.nowTask
    if (nowTaskId && nowTaskId !== taskId) {
      let nowTask = context.state.tasks[nowTaskId]
      nowTask.state = 'today'
      context.dispatch('updateTask', {id: nowTaskId, newTask: nowTask})
    }

    let newNow = context.state.tasks[taskId]
    newNow.state = 'now'
    context.dispatch('updateTask', {id: taskId, newTask: newNow})
  },

  syncProjects: (context) => {
    const collection = db.collection('users')
                    .doc(context.state.user.uid)
                    .collection('projects')
                    .orderBy('name')

    collection.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === 'added' || change.type === 'modified') {
          context.commit('ADD_OR_UPDATE_PROJECT', {id: change.doc.id, newProj: change.doc.data()})
        }
        if (change.type === 'removed') {
          context.commit('DELETE_PROJECT', change.doc.id)
        }
      })
    })
  },
  addTask: (context, newTask) => {
    let task = {
      name: '',
      projectId: '',
      notes: '',
      state: 'inbox',
      starred: false,
      poms_completed: 0,
      poms_total: 0,
      dueAt: '',
      snoozedUntil: '',
      completedAt: '',
      createdAt: Date.now(),
      updatedAt: Date.now()
    }

    if (!newTask.hasOwnProperty('name') || newTask.name.length === 0) {
      // noop, just return if we don't have a task name set
      return
    }

    // merge the newTask properties into our default task
    Object.assign(task, newTask)
    task.name.trim()

    // add into firebase
    const collection = db.collection('users').doc(context.state.user.uid).collection('tasks')
    collection.add(task)
  },
  updateTask: (context, taskDetails) => {
    let newTask = taskDetails['newTask']
    newTask['updatedAt'] = Date.now()

    // setup firebase connections
    db.collection('users')
      .doc(context.state.user.uid)
      .collection('tasks')
      .doc(taskDetails['id'])
      .update(newTask)
  },
  syncTasks: (context) => {
    const collection = db.collection('users')
                    .doc(context.state.user.uid)
                    .collection('tasks')
                    .orderBy('createdAt', 'desc')

    collection.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === 'added' || change.type === 'modified') {
          context.commit('ADD_OR_UPDATE_TASK', {id: change.doc.id, newTask: change.doc.data()})
        }
        if (change.type === 'removed') {
          context.commit('DELETE_TASK', change.doc.id)
        }
      })
    })
  }
}
