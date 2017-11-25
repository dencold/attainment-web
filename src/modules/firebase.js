import firebase from 'firebase'

// configure firebase
const config = {
  apiKey: 'AIzaSyBy6wjkoJPJVpysm2ZsFZ6VOxF8FhCtx68',                             // Auth / General Use
  authDomain: 'attainment-dev.firebaseapp.com',         // Auth with popup/redirect
  databaseURL: 'https://attainment-dev.firebaseio.com', // Realtime Database
  storageBucket: 'attainment-dev.appspot.com',          // Storage
  messagingSenderId: '123456789'                  // Cloud Messaging
}

const fireApp = firebase.initializeApp(config)

export default fireApp
