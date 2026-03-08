import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import EmployeeDashboard from '../views/EmployeeDashboard.vue'
import EmployerDashboard from '../views/EmployerDashboard.vue'

const routes = [
    {
        path: '/',
        redirect: () => {
            const token = localStorage.getItem('token')
            const role = localStorage.getItem('role')
            if (!token) return '/login'
            return role === 'employer' ? '/employer' : '/employee'
        }
    },
    { path: '/login', component: Login, meta: { guestOnly: true } },
    { path: '/signup', component: Signup, meta: { guestOnly: true } },
    { path: '/employee', component: EmployeeDashboard, meta: { requiresAuth: true, role: 'employee' } },
    { path: '/employer', component: EmployerDashboard, meta: { requiresAuth: true, role: 'employer' } }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})


//runs before each route change to check if the user is authenticated and has the correct role to access the route. If not authenticated, it redirects to login. If authenticated but doesn't have the required role, it redirects to their respective dashboard.

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token')
    const userRole = localStorage.getItem('role')

    // if toen exists and route is guest only(means in different tab ), redirect to respective dashboard
    if (token && to.meta.guestOnly) { 
        next(userRole === 'employer' ? '/employer' : '/employee')
        return
    }

    if (to.meta.requiresAuth && !token) {
        next('/login')
    } else if (to.meta.requiresAuth && to.meta.role && to.meta.role !== userRole) {
        next(userRole === 'employer' ? '/employer' : '/employee')
    } else {
        next()
    }   
})

export default router
