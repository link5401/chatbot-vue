<template lang="pug">
v-app#f
    v-navigation-drawer(v-model='drawer' app='')
        v-list
            v-list-item(v-if='!isLoggedIn')
                v-list-item-icon
                    v-icon mdi-login
                router-link( to='/login') Login
            v-list-item
                v-list-item-icon
                    v-icon mdi-dog
                router-link(to='/welcome') Welcome
            v-list-item 
                v-list-item-icon
                    v-icon mdi-logout
                v-btn(v-on:click= 'logOut') Logout
    v-app-bar(app='')
        v-app-bar-nav-icon(@click='drawer = !drawer')
        v-toolbar-title Application
    v-main
        // 

</template>
<script>
import { mapGetters, mapMutations } from "vuex";

export default {
    name: 'WireFrame',
    data: () => ({ drawer: null }),
    computed: {
        ...mapGetters(['isLoggedIn'])
    },
    methods:{
        ...mapMutations(['setUsername','setToken']),
        logOut(){
            this.setToken(null);
            this.setUsername(null);
            this.$router.push({'path': '/login'})
        }
    }
}
</script>