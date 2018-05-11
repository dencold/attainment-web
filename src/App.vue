<template>
  <div :class="{'nav-open': $sidebar.showSidebar}">
    <login v-if="!$store.getters.isLoggedIn"></login>
    <add-task></add-task>
    <router-view v-if="$store.getters.isLoggedIn"></router-view>
    <!--This sidebar appears only for screens smaller than 992px-->
    <side-bar type="navbar" :sidebar-links="$sidebar.sidebarLinks">
      <ul class="nav navbar-nav">
        <li>
          <a class="dropdown-toggle" data-toggle="dropdown">
            <i class="ti-panel"></i>
            <p>Stats</p>
          </a>
        </li>
        <drop-down title="5 Notifications" icon="ti-bell">

          <li><a>Notification 1</a></li>
          <li><a>Notification 2</a></li>
          <li><a>Notification 3</a></li>
          <li><a>Notification 4</a></li>
          <li><a>Another notification</a></li>

        </drop-down>
        <li>
          <a>
            <i class="ti-settings"></i>
            <p>Settings</p>
          </a>
        </li>
        <li class="divider"></li>
      </ul>
    </side-bar>
  </div>
</template>

<script>
import fireApp from './modules/firebase'
import Login from 'components/Dashboard/Views/Login.vue'
import AddTask from 'components/UIComponents/Inputs/AddTask.vue'

export default {
  name: 'app',

  components: {
    'login': Login,
    'add-task': AddTask
  },

  created () {
    window.addEventListener('keyup', this.handleGlobalShortcuts)
    window.addEventListener('keydown', this.handleKeydown)
  },

  beforeCreate () {
    // check if we already have a user logged in
    const user = fireApp.auth().currentUser
    if (user) {
      this.$store.commit('SET_USER', user)
      this.$store.dispatch('syncProjects')
      this.$store.dispatch('syncTasks')
    }
  },

  methods: {
    handleGlobalShortcuts (e) {
      if (e.key === 'P') {
        this.$router.push({name: 'projects'})
      } else if (e.key === 'T') {
        this.$router.push({name: 'tasks'})
      } else if (e.key === 'D') {
        this.$router.push({name: 'dashboard'})
      } else if (e.key === 'A') {
        this.$modal.show('add-task')
      } else if (e.key === '1') {
        this.$router.push({name: 'now'})
      } else if (e.key === '2') {
        this.$router.push({name: 'plan'})
      } else if (e.key === '3') {
        this.$router.push({name: 'inbox'})
      } else if (e.key === '/') {
        this.$bus.$emit('open-global-search')
      } else if (e.key === '<') {
        this.$router.back()
      } else if (e.key === '>') {
        this.$router.forward()
      } else if (e.key === '?') {
        this.$router.push({name: 'shortcuts'})
      }
    },
    handleKeydown (e) {
      // we need to explicitly catch the "/" keypress because firefox binds
      // to their "Quick Find" whenever a user presses it. Super annoying.
      // https://stackoverflow.com/questions/7797937/how-to-bypass-quick-search-firefox-feature-and-capture-forward-slash-keypress
      if (e.key === '/' && e.target.tagName === 'BODY') {
        e.preventDefault()
      }
    }
  }

}
</script>

<style lang="scss"></style>
