<template lang="pug">
v-app#f
    v-navigation-drawer#drawer(v-model='drawer' app='')
        v-list
            v-list-item(v-if='!isLoggedIn')
                v-list-item-icon
                    v-icon mdi-login
                router-link( to='/login') Login
            v-list-item
                v-list-item-icon
                    v-icon mdi-dog
                router-link(to='/home') Home
            v-list-item 
                v-list-item-icon 
                    v-icon mdi-message
                router-link(to='/message') Message
            v-list-item 
                v-list-item-icon
                    v-icon mdi-logout
                v-btn(v-on:click= 'logOut') Logout
    v-app-bar(app='')
            v-app-bar-nav-icon(@click='drawer = !drawer')
            v-toolbar-title Application
    v-divider
    v-main 
        <slot/>
</template>
<script>
// import axios from "axios";
import { mapGetters, mapMutations } from "vuex";
import IntentTable from '../components/IntentTable.vue'
// import CreateIntent from '../components/CreateIntent.vue'
export default {
    name: 'WireFrame',
    data: () => ({
        info: '',
        drawer: null,


    }),
    components:{
        IntentTable,
        // CreateIntent
    },
    computed: {
        ...mapGetters(['isLoggedIn']),
        
    },
    methods: {
        ...mapMutations(['setUsername', 'setToken']),
        logOut() {
            this.setToken(null);
            this.setUsername(null);
            this.$store.sessionStorage.clear();
            this.$router.push({ 'path': '/login' })
        },
        
    },

}
</script>
<style lang="sass">
#f
    background:$__dashboard_bg
#data
    background:$__dashboard_bg
    // border-radius: 0px 50px 50px 0px
#drawer
    // border-radius: 0px 50px 50px 0px
</style>