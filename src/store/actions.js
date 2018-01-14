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
  toggleProjectComplete: (context, projectDetails) => {
    let newProj = projectDetails['proj']
    newProj.completed = !newProj.completed

    // if we've uncompleted the project, we need to reset the completedAt date
    if (!newProj.complete) {
      newProj.completedAt = ''
    } else {
      newProj.completedAt = Date.now()

      // we also need to complete all of the underlying active tasks
      let projTasks = context.getters.projectTasksActive(projectDetails['id'])
      for (var key in projTasks) {
        if (projTasks.hasOwnProperty(key)) {
          let task = projTasks[key]
          task['completed'] = true
          task['completedAt'] = Date.now()

          context.dispatch('updateTask', {id: key, newTask: task})
        }
      }
    }

    context.dispatch('updateProject', {id: projectDetails['id'], newProj: newProj})
  },
  syncProjects: (context) => {
    const collection = db.collection('users').doc(context.state.user.uid).collection('projects')

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
    // add any default properties on our object
    newTask['createdAt'] = Date.now()
    newTask['updatedAt'] = Date.now()

    // setup firebase connections
    const collection = db.collection('users').doc(context.state.user.uid).collection('tasks')

    collection.add(newTask)
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
    const collection = db.collection('users').doc(context.state.user.uid).collection('tasks')

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
