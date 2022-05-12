import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import SignIn from '../views/SignIn.vue'
import SignUp from '../views/SignUp.vue'
import Success from '../views/Success.vue'
import Profile from '../views/Profile.vue'
import ReadMore from '../components/ReadMore.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/blog/:id',
    name: 'readmore',
    component: ReadMore,
    props: true
  },
  {
    path: '/SignIn',
    name: 'SignIn',
    component:  SignIn
  },
  {
    path: '/SignUp',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/Success',
    name: 'Success',
    component: Success
  },
  {
    path: '/Profile',
    name: 'Profile',
    component: Profile
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
