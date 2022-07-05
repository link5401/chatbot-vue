<template>

  <div id="app">
    <v-app id="inspire">


      <BackGround></BackGround>
      <Login></Login>

    </v-app>
  </div>

</template>

<script>

import Login from './components/Login.vue'
import BackGround from './components/Background.vue'
export default {
  name: 'App',

  components: {

    Login,
    BackGround
  },

  data: () => ({

  }),
};

</script>

