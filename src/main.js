import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase'

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
import store from './store/store'
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
const config = {
  apiKey: 'AIzaSyBy6wjkoJPJVpysm2ZsFZ6VOxF8FhCtx68',                             // Auth / General Use
  authDomain: 'attainment-dev.firebaseapp.com',         // Auth with popup/redirect
  databaseURL: 'https://attainment-dev.firebaseio.com', // Realtime Database
  storageBucket: 'attainment-dev.appspot.com',          // Storage
  messagingSenderId: '123456789'                  // Cloud Messaging
}

firebase.initializeApp(config)

// global library setup
Object.defineProperty(Vue.prototype, '$Chartist', {
  get () {
    return this.$root.Chartist
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: {
    Chartist: Chartist
  },
  router,
  store,
  render: h => h(App)
})
