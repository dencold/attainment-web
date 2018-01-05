import firebase from 'firebase'
import 'firebase/firestore'

/* eslint-disable */
// configure firebase
const devConfig = {
  apiKey: 'AIzaSyBy6wjkoJPJVpysm2ZsFZ6VOxF8FhCtx68',
  authDomain: 'attainment-dev.firebaseapp.com',
  databaseURL: 'https://attainment-dev.firebaseio.com',
  projectId: 'attainment-dev',
  storageBucket: 'attainment-dev.appspot.com',
  messagingSenderId: '646574338415'
}

const prodConfig = {
  apiKey: 'AIzaSyDs8E_p1Uyiq9mLcBC6G__Kdzu3ggkgt9I',
  authDomain: 'attainment-6017d.firebaseapp.com',
  databaseURL: 'https://attainment-6017d.firebaseio.com',
  projectId: 'attainment-6017d',
  storageBucket: 'attainment-6017d.appspot.com',
  messagingSenderId: '1096403605650'
}

const fireApp = firebase.initializeApp(prodConfig)

export default fireApp
