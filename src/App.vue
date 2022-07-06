<template>

  <div id="app">
    <!-- <v-app id="inspire"> -->
      <!-- <NavBar></NavBar> -->
     <!-- <v-main>
        <v-container fluid>
          <ul>
            <li>
              <router-link to="/login">Login</router-link>
            </li>
          </ul>
        </v-container>
      </v-main> -->
    <router-view></router-view> 

   <!-- </v-app> -->

  </div>

</template>

<script>
// import NavBar from './components/Nav.vue'
// import Login from './components/Login.vue'
// import BackGround from './components/Background.vue'
export default {
  name: 'App',

  components: {
    // NavBar
    // Login,
    // BackGround
  },

  data: () => ({

  }),
};

</script>
