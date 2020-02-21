import Vue from 'vue'

// Plugins
import GlobalComponents from './globalComponents'
import GlobalDirectives from './globalDirectives'
import Notifications from './components/UIComponents/NotificationPlugin'
import SideBar from './components/UIComponents/SidebarPlugin'
import VueMoment from 'vue-moment'
import VModal from 'vue-js-modal'
import Datepicker from 'vuejs-datepicker'
import App from './App'

// library imports
import Chartist from 'chartist'
import store from './store'
import router from './router'
import fireApp from './modules/firebase'

import 'bootstrap/dist/css/bootstrap.css'
import './assets/sass/paper-dashboard.scss'
// import 'es6-promise/auto' -- don't think this is required

// plugin setup
Vue.use(GlobalComponents)
Vue.use(GlobalDirectives)
Vue.use(Notifications)
Vue.use(SideBar)
Vue.use(VueMoment)
Vue.use(VModal)
Vue.use(Datepicker)

// global library setup
Object.defineProperty(Vue.prototype, '$Chartist', {
  get () {
    return this.$root.Chartist
  }
})

const EventBus = new Vue()
Object.defineProperties(Vue.prototype, {
  $bus: {
    get () {
      return EventBus
    }
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
const vueApp = fireApp.auth().onAuthStateChanged(() => {
  new Vue({
    el: '#app',
    data: {
      Chartist: Chartist
    },
    router,
    store,
    render: h => h(App)
  })

  vueApp()
})
