<template lang="pug">
.LoginPage
  v-app.inspire
    Login
    BackGround
  

</template>

<script>

import Login from '../components/Login.vue'
import BackGround from '../components/Background.vue'
import Background from '../components/Background.vue'
// import NavBar from '../components/Nav.vue'
export default {
  name: 'LoginPage',

  components: {
    // NavBar,
    Login,
    BackGround,
    Background
},

  data: () => ({

  }),
};

</script>
<style>

</style>
