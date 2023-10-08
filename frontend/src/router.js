import { createRouter, createWebHistory } from 'vue-router'
import ProjectsPage from './components/ProjectsPage.vue'

const routes = [
  {
    path: '/projects',
    name: 'Projects',
    component: ProjectsPage,
  },
  // Add other routes as needed
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
