import Vue from 'vue'
import Router from 'vue-router'

// Lazy-load views to keep bundle smaller
const Login = () => import('../views/Login.vue')
const CalendarView = () => import('../views/CalendarView.vue')

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Calendar',
      component: CalendarView,
      meta: { requiresAuth: true }
    }
  ]
})

// Simple auth simulation using localStorage token
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token')
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next({ name: 'Login', query: { redirect: to.fullPath } })
  } else if (to.name === 'Login' && isAuthenticated) {
    next({ path: '/' })
  } else {
    next()
  }
})

export default router

