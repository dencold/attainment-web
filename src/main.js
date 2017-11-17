import Vue from 'vue'
import VueRouter from 'vue-router'

// Plugins
import GlobalComponents from './globalComponents'
import GlobalDirectives from './globalDirectives'
import Notifications from './components/UIComponents/NotificationPlugin'
import SideBar from './components/UIComponents/SidebarPlugin'
import App from './App'

// router setup
import routes from './routes/routes'

// library imports
import Chartist from 'chartist'
import firebase from 'firebase'
import 'bootstrap/dist/css/bootstrap.css'
import './assets/sass/paper-dashboard.scss'
import 'es6-promise/auto'

// plugin setup
Vue.use(VueRouter)
Vue.use(GlobalComponents)
Vue.use(GlobalDirectives)
Vue.use(Notifications)
Vue.use(SideBar)

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  mode: 'history',
  linkActiveClass: 'active'
})

// configure firebase
firebase.initializeApp({
  apiKey: 'AIzaSyBy6wjkoJPJVpysm2ZsFZ6VOxF8FhCtx68',                             // Auth / General Use
  authDomain: 'attainment-dev.firebaseapp.com',         // Auth with popup/redirect
  databaseURL: 'https://attainment-dev.firebaseio.com', // Realtime Database
  storageBucket: 'attainment-dev.appspot.com',          // Storage
  messagingSenderId: '123456789'                  // Cloud Messaging
})

// global library setup
Object.defineProperty(Vue.prototype, '$Chartist', {
  get () {
    return this.$root.Chartist
  }
})

Object.defineProperty(Vue.prototype, '$firebase', {
  get () {
    return this.$root.firebase
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  data: {
    Chartist: Chartist,
    firebase: firebase
  }
})
