import VueRouter from 'vue-router'
import Vue from 'vue'


import Login from '@/views/LoginPage'
// import Welcome from '@/views/Welcome'
// import mainframe from '@/components/Mainframe'
import WireFrame from '@/views/Welcome'
import MessagePage from '@/views/MessagePage'
// import HelloWorld from '@/components/HelloWorld'
Vue.use(VueRouter)

export default new VueRouter({
    routes:[
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/home',
            name: 'welcome',
            component: WireFrame
        },
        {
            path : '/',
            name: 'slash',
            redirect:  {path: '/login'}
        },
        {
            path:'/message',
            name: 'message',
            component: MessagePage
        }
      
    ]
})