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
