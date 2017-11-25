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

    collection.add(newProject)
  },
  syncProjects: (context) => {
    const collection = db.collection('users').doc(context.state.user.uid).collection('projects')

    collection.onSnapshot(snapshot => {
      snapshot.docChanges.forEach(change => {
        if (change.type === 'added') {
          context.commit('ADD_PROJECT', {id: change.doc.id, newProj: change.doc.data()})
        }
        if (change.type === 'modified') {
          console.log('Modified city: ', change.doc.data())
        }
        if (change.type === 'removed') {
          console.log('Removed city: ', change.doc.data())
        }
      })
    })
  }
}
