<template>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle" :class="{toggled: $sidebar.showSidebar}" @click="toggleSidebar">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar bar1"></span>
          <span class="icon-bar bar2"></span>
          <span class="icon-bar bar3"></span>
        </button>
        <a class="navbar-brand">{{routeName}}</a>
      </div>
      <div class="collapse navbar-collapse">
        <ul class="nav navbar-nav navbar-right">
          <li class="search">
            <global-search ref="globalsearch" @search-result="jumpTo"></global-search>
          </li>
          <drop-down title="5 Notifications" icon="ti-bell">
            <li><a href="#">Notification 1</a></li>
            <li><a href="#">Notification 2</a></li>
            <li><a href="#">Notification 3</a></li>
            <li><a href="#">Notification 4</a></li>
            <li><a href="#">Another notification</a></li>
          </drop-down>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
  import GlobalSearch from '@/components/UIComponents/GlobalSearch.vue'

  export default {
    components: {
      'global-search': GlobalSearch
    },
    created () {
      this.$bus.$on('open-global-search', () => {
        this.$refs.globalsearch.focus()
      })
    },
    computed: {
      routeName () {
        const {name} = this.$route
        return this.capitalizeFirstLetter(name)
      }
    },
    data () {
      return {
        activeNotifications: false
      }
    },
    methods: {
      capitalizeFirstLetter (string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
      },
      toggleNotificationDropDown () {
        this.activeNotifications = !this.activeNotifications
      },
      closeDropDown () {
        this.activeNotifications = false
      },
      toggleSidebar () {
        this.$sidebar.displaySidebar(!this.$sidebar.showSidebar)
      },
      hideSidebar () {
        this.$sidebar.displaySidebar(false)
      },
      jumpTo (item) {
        if (item && item.type === 'project') {
          this.$router.push({name: 'project', params: { id: item.id }})
        } else if (item && item.type === 'task') {
          this.$router.push({name: 'task', params: { id: item.id }})
        } else {
          console.log('ERROR: Could not determine type')
        }
      }
    }
  }

</script>
<style scoped>
  .search {
    margin: 12px 0px;
    padding: 10px 15px;
  }
</style>
