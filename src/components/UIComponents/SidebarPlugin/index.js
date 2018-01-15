import Sidebar from './SideBar.vue'

const SidebarStore = {
  showSidebar: false,
  sidebarLinks: [
    {
      name: 'Dashboard',
      icon: 'ti-panel',
      path: '/dashboard'
    },
    {
      name: 'Projects',
      icon: 'ti-folder',
      path: '/projects'
    },
    {
      name: 'Tasks',
      icon: 'ti-angle-double-right',
      path: '/tasks'
    },
    {
      name: 'Metrics',
      icon: 'ti-bar-chart',
      path: '/metrics'
    },
    {
      name: 'Settings',
      icon: 'ti-settings',
      path: '/settings'
    }
  ],
  displaySidebar (value) {
    this.showSidebar = value
  }
}

const SidebarPlugin = {

  install (Vue) {
    Vue.mixin({
      data () {
        return {
          sidebarStore: SidebarStore
        }
      }
    })

    Object.defineProperty(Vue.prototype, '$sidebar', {
      get () {
        return this.$root.sidebarStore
      }
    })
    Vue.component('side-bar', Sidebar)
  }
}

export default SidebarPlugin
