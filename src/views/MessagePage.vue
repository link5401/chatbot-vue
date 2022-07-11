<template lang="pug">
v-app#w
    Mainframe
        MessageTable
    //- v-main 
    //-     p hello
</template>
<script>
import Mainframe from "@/components/Mainframe.vue";
import MessageTable from "@/components/MessageTable.vue"
// import { mapGetters, mapMutations } from "vuex";
export default {
    name: 'MessagePage',
    data: () => ({
    
    }),
    components: {
        Mainframe,
        MessageTable
    },
   

}
</script>
<style lang="sass">
#w
    background:$__dashboard_bg

</style>