<template lang="pug">
v-app#f
    Mainframe
      IntentTable#tab
</template>
<script>
// import axios from "axios";
import { mapGetters, mapMutations } from "vuex";
import IntentTable from '../components/IntentTable.vue'
import Mainframe from "@/components/Mainframe.vue";
// import CreateIntent from '../components/CreateIntent.vue'
export default {
    name: 'WireFrame',
    data: () => ({
        info: '',
        drawer: null,


    }),
    components:{
    IntentTable,
    Mainframe
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