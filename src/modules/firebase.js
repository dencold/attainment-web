import firebase from 'firebase'
import 'firebase/firestore'

// configure firebase
const config = {
  apiKey: 'AIzaSyBy6wjkoJPJVpysm2ZsFZ6VOxF8FhCtx68',
  authDomain: 'attainment-dev.firebaseapp.com',
  databaseURL: 'https://attainment-dev.firebaseio.com',
  projectId: 'attainment-dev',
  storageBucket: 'attainment-dev.appspot.com',
  messagingSenderId: '646574338415'
}

const fireApp = firebase.initializeApp(config)

export default fireApp
