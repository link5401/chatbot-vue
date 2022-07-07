<template lang="pug">

</template>
<script>
// import axios from 'axios'
export default {
    name: 'CreateIntent',
    data: () => ({
        
    }),
    methods: {
        createIntent() {
            // body = {

            // }
            // axios
            //     .post('http://localhost:3000/intent/addIntent')
        },
      

      
    },
    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
    },
    
}
</script>