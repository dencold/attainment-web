import fireApp from '../modules/firebase'

const db = fireApp.firestore()

export default {
  signOut: (context, payload) => {
    fireApp.auth().signOut()
      .then(context.commit('UNSET_USER'), () => console.log('Failed to sign out'))
  },
  addProject: (context, newProject) => {
    const collection = db.collection('users').doc(context.state.user.uid).collection('projects')
    newProject['createdAt'] = Date.now()
    newProject['updatedAt'] = Date.now()

    collection.add(newProject)
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
    newProj.completed = !newProj.completed

    // if we've uncompleted the project, we need to reset the completedAt date
    if (!newProj.completed) {
      newProj.completedAt = ''
    } else {
      newProj.completedAt = Date.now()

      // we also need to complete all of the underlying active tasks
      let projTasks = context.getters.projectTasksActive(projectDetails['id'])
      for (var key in projTasks) {
        if (projTasks.hasOwnProperty(key)) {
          context.dispatch('toggleTaskCompleted', {id: key, task: projTasks[key]})
        }
      }
    }

    context.dispatch('updateProject', {id: projectDetails['id'], newProj: newProj})
  },
  toggleTaskCompleted: (context, taskDetails) => {
    let newTask = taskDetails['task']
    newTask.completed = !newTask.completed

    // if we've uncompleted the task, we need to reset the completedAt date
    if (!newTask.completed) {
      newTask.completedAt = ''
    } else {
      newTask.completedAt = Date.now()
    }

    context.dispatch('updateTask', {id: taskDetails['id'], newTask: newTask})
    context.dispatch('cleanup', taskDetails['id'])
  },

  cleanup: (context, taskId) => {
    if (context.state.now === taskId) {
      context.dispatch('setNowTask', '')
    }

    context.dispatch('removeToday', taskId)
  },

  setNowTask: (context, taskId) => {
    db.collection('users')
      .doc(context.state.user.uid)
      .set({now: taskId}, {merge: true})

    context.commit('SET_NOW_TASK', taskId)
  },

  syncRoot: (context) => {
    const collection = db.collection('users').doc(context.state.user.uid)

    collection.onSnapshot(doc => {
      if (doc.data().hasOwnProperty('now')) {
        context.commit('SET_NOW_TASK', doc.data()['now'])
      }

      if (doc.data().hasOwnProperty('today')) {
        context.commit('SET_TODAY', doc.data()['today'])
      }
    })
  },

  syncProjects: (context) => {
    const collection = db.collection('users')
                    .doc(context.state.user.uid)
                    .collection('projects')
                    .orderBy('name')

    collection.onSnapshot(snapshot => {
      snapshot.docChanges.forEach(change => {
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
      completed: false,
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
      snapshot.docChanges.forEach(change => {
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
