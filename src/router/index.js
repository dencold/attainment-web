import Vue from 'vue'
import VueRouter from 'vue-router'

import DashboardLayout from 'src/components/Dashboard/Layout/DashboardLayout.vue'
import NotFound from 'src/components/Dashboard/Views/NotFoundPage.vue'
import Login from 'src/components/Dashboard/Views/Login.vue'
import Overview from 'src/components/Dashboard/Views/Overview.vue'
import Projects from 'src/components/Dashboard/Views/Projects.vue'
import Tasks from 'src/components/Dashboard/Views/Tasks.vue'
import ProjectDetail from 'src/components/Dashboard/Views/ProjectDetail.vue'
import TaskDetail from 'src/components/Dashboard/Views/TaskDetail.vue'
import UserProfile from 'src/components/Dashboard/Views/UserProfile.vue'
import Notifications from 'src/components/Dashboard/Views/Notifications.vue'
import Icons from 'src/components/Dashboard/Views/Icons.vue'
import Maps from 'src/components/Dashboard/Views/Maps.vue'
import Typography from 'src/components/Dashboard/Views/Typography.vue'
import TableList from 'src/components/Dashboard/Views/TableList.vue'

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
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: Overview
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
