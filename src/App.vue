<template>

  <div id="app">
    <v-app id="inspire">

      <LoginPage></LoginPage>

    </v-app>

  </div>

</template>

<script>
// import HelloWorld from './components/HelloWorld';
// import Test from './components/Test.vue';
// import Rainbow from './components/Rainbow.vue';
// import MessageInput from './components/MessageInput.vue'
// import ChatWin from './components/ChatWindow.vue';
import LoginPage from './components/Login.vue'
export default {
  name: 'App',

  components: {
    // HelloWorld,
    // Test
    LoginPage
  },

  data: () => ({

  }),
};

</script>

