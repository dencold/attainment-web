<template>
  <div :class="{'nav-open': $sidebar.showSidebar}">
    <login v-if="!$store.getters.isLoggedIn"></login>
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
import Login from 'components/GeneralViews/Login.vue'

export default {
  name: 'app',

  components: {
    'login': Login
  },

  beforeCreate () {
    // setup app-wide keyboard shortcuts
    window.addEventListener('keyup', e => {
      if (e.key === 'p') {
        this.$router.replace({name: 'projects'})
      }
    })

    // check if we already have a user logged in
    const user = fireApp.auth().currentUser
    if (user) {
      console.log('Setting User!')
      this.$store.commit('SET_USER', user)
      // this.$store.dispatch('fetchTasks')
      this.$store.dispatch('syncProjects')
    }
  }
}
</script>

<style lang="scss"></style>
