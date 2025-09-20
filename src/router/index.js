import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      redirect: '/dashboard',
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: () => import('@/views/DashboardView.vue'),
        },
        {
          path: '/chart',
          name: 'chart',
          component: () => import('@/views/ChartView.vue'),
        },
        {
          path: '/table',
          name: 'table',
          component: () => import('@/views/TableView.vue'),
        },
      ]
    },
  ],
})

export default router
