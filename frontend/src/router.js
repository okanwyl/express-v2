import {createRouter, createWebHistory} from 'vue-router'
import ProjectsPage from './components/ProjectsPage.vue'
import ProjectDetail from "./components/ProjectDetail.vue"
import {userPool} from "@/cognito";


const routes = [
    {
        path: '/projects',
        name: 'Projects',
        component: ProjectsPage,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/projects/:id',
        name: 'project-detail',
        component: ProjectDetail,
        props: true,
        meta: {
            requiresAuth: true
        }
    },
]


const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    const cognitoUser = userPool.getCurrentUser();
    if (to.matched.some(record => record.meta.requiresAuth) && !cognitoUser) {
        next();
    } else {
        next(); // Make sure to always call next()!
    }
});


export default router
