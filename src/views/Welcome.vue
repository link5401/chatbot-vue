
<template>
  <div>
   <h1 > Welcome</h1>
    <NavBar id = "navd"></NavBar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import NavBar from '../components/Nav.vue'
export default {
    name: 'WelcomePage',
  computed: {
    ...mapGetters(["isLoggedIn"])
  },
  components:{
    NavBar
  }
};
</script>
<style>
#navd{
    top:500px;
}
</style>