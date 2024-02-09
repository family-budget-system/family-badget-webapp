import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { layout: "main" },
      component: () => import("@/modules/Home/views/Home.vue")
    },
    {
      path: "/operations",
      name: "operations",
      meta: { layout: "main" },
      component: () => import("@/modules/operations/views/OperationsListView.vue")
    }
  ]
})

export default router
