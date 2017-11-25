import fireApp from '../modules/firebase'

export default {
  signOut: (context, payload) => {
    fireApp.auth().signOut()
      .then(context.commit('UNSET_USER'), () => console.log('Failed to sign out'))
  }
}
