import { createRouter, createWebHistory } from 'vue-router'
import ProjectsPage from './components/ProjectsPage.vue'
import ProjectDetail from "./components/ProjectDetail.vue"

const routes = [
  {
    path: '/projects',
    name: 'Projects',
    component: ProjectsPage,
  },
  {
    path: '/projects/:id',
    name: 'project-detail',
    component: ProjectDetail,
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
