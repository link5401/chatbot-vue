<template>

  <div id="LoginPage">
    <v-app id="inspire">
      <div id="login-page">
        
        <Login></Login>
        <BackGround>
        </BackGround>
      </div>
    </v-app>

  </div>

</template>

<script>

import Login from '../components/Login.vue'
import BackGround from '../components/Background.vue'
// import NavBar from '../components/Nav.vue'
export default {
  name: 'LoginPage',

  components: {
    // NavBar,
    Login,
    BackGround
  },

  data: () => ({

  }),
};

</script>
<style>

</style>
