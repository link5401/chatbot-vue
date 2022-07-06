import VueRouter from 'vue-router'
import Vue from 'vue'


import Login from '@/views/LoginPage'
// import Welcome from '@/views/Welcome'
import mainframe from '@/components/Mainframe'
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
            path: '/welcome',
            name: 'mainframe',
            component: mainframe
        },
      
    ]
})