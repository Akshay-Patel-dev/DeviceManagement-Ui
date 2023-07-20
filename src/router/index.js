// Composables
import { createRouter, createWebHistory } from 'vue-router'

import { computed } from 'vue'
import { useAppStore } from '@/store/app'


const routes = [
  {
    path: '/employees',
    component: () => import('@/components/Employees.vue'),
    meta: { requiresAuth: true }
    
  },
  {
    path: '/devices',
    component: () => import('@/components/Devices.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: `/employees/:id/device`,
    component: () => import('@/components/EmployeeDevice.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: `/devices/:id/assignments`,
    component: () => import('@/components/DevicesAssignments.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/home',
    component: () => import('@/components/Home.vue'),
    meta: { requiresAuth: true }
    
  },
  {
    path: '/',
    component: () => import('@/components/LoginComponent.vue'),
    
  },
]



const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})




router.beforeEach(async(to, from, next) => {
  const appstore = useAppStore();
  const isAuthenticated = computed(() => appstore.isAuthenticated);
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated.value) {
    next({ path: '/' }) 
  } else {
    next() 
  }
})


export default router
