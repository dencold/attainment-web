import Vue from 'vue'
import VueRouter from 'vue-router'

import DashboardLayout from './components/Dashboard/Layout/DashboardLayout.vue'
import NotFound from './components/Dashboard/Views/NotFoundPage.vue'
import Login from './components/Dashboard/Views/Login.vue'
import Overview from './components/Dashboard/Views/Overview.vue'
import Projects from './components/Dashboard/Views/Projects.vue'
import Tasks from './components/Dashboard/Views/Tasks.vue'
import Today from './components/Dashboard/Views/Today.vue'
import Inbox from './components/Dashboard/Views/Inbox.vue'
import Weekend from './components/Dashboard/Views/Weekend.vue'
import Planning from './components/Dashboard/Views/Planning.vue'
import ProjectDetail from './components/Dashboard/Views/ProjectDetail.vue'
import TaskDetail from './components/Dashboard/Views/TaskDetail.vue'
import UserProfile from './components/Dashboard/Views/UserProfile.vue'
import Notifications from './components/Dashboard/Views/Notifications.vue'
import Icons from './components/Dashboard/Views/Icons.vue'
import Maps from './components/Dashboard/Views/Maps.vue'
import Typography from './components/Dashboard/Views/Typography.vue'
import TableList from './components/Dashboard/Views/TableList.vue'
import Shortcuts from './components/Dashboard/Views/Shortcuts.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/plan',
    children: [
      {
        path: '/plan',
        name: 'plan',
        component: Planning
      },
      {
        path: '/settings',
        name: 'settings',
        component: UserProfile
      },
      {
        path: '/projects',
        name: 'projects',
        component: Projects
      },
      {
        path: '/tasks',
        name: 'tasks',
        component: Tasks
      },
      {
        path: '/metrics',
        name: 'metrics',
        component: Overview
      },
      {
        path: '/project/:id',
        name: 'project',
        props: true,
        component: ProjectDetail
      },
      {
        path: '/task/:id',
        name: 'task',
        props: true,
        component: TaskDetail
      },
      {
        path: '/today',
        name: 'today',
        component: Today
      },
      {
        path: '/inbox',
        name: 'inbox',
        component: Inbox
      },
      {
        path: '/weekend',
        name: 'weekend',
        component: Weekend
      },
      {
        path: '/notifications',
        name: 'notifications',
        component: Notifications
      },
      {
        path: '/icons',
        name: 'icons',
        component: Icons
      },
      {
        path: '/maps',
        name: 'maps',
        component: Maps
      },
      {
        path: '/typography',
        name: 'typography',
        component: Typography
      },
      {
        path: '/table-list',
        name: 'table-list',
        component: TableList
      },
      {
        path: '/shortcuts',
        name: 'shortcuts',
        component: Shortcuts
      }
    ]
  },
  { path: '*', component: NotFound }
]

const router = new VueRouter({
  mode: 'history',
  linkActiveClass: 'active',
  routes: routes
})

export default router
