import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SideHome from '../views/SideHome.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    // component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    component: Home,
    meta: {
      title: '蕃茄鐘'
    }
  },
  {
    path: '/clock',
    name: 'Clock',
    component: () => import(/* webpackChunkName: "clock" */ '../views/Clock.vue'),
    meta: {
      title: '蕃茄鐘'
    }
  },
  {
    path: '/sidebar',
    name: 'Sidebar',
    component: () => import(/* webpackChunkName: "sidebar" */ '../views/Sidebar.vue'),
    meta: {
      title: '蕃茄鐘 | 設定'
    },
    children: [
      {
        path: '',
        name: 'SideHome',
        omponent: SideHome,
        // component: () => import(/* webpackChunkName: "sidebar" */ '../views/SideHome.vue'),
        meta: {
          title: '蕃茄鐘 | 設定'
        }
      },
      {
        path: '/list',
        name: 'List',
        component: () => import(/* webpackChunkName: "sidebar" */ '../views/List.vue'),
        meta: {
          title: '蕃茄鐘 | 清單'
        }
      },
      {
        path: '/analysis',
        name: 'Analysis',
        component: () => import(/* webpackChunkName: "sidebar" */ '../views/Analysis.vue'),
        meta: {
          title: '蕃茄鐘 | 分析'
        }
      },
      {
        path: '/settings',
        name: 'Settings',
        component: () => import(/* webpackChunkName: "sidebar" */ '../views/Settings.vue'),
        meta: {
          title: '蕃茄鐘 | 設定'
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.afterEach((to, from) => {
  document.title = to.meta.title
})

export default router
