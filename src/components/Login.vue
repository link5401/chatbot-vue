<template lang="pug">
#login
  v-card#card.mx-auto.elevation-5.text-center.pa-5(width='460px' height='339px')
    v-card-subtitle#welcome WELCOME !
    v-text-field#username(v-model='username' width='330px' height='55px' placeholder='username' value='' filled='' rounded='' dense='' @input='event => text = event.target.value')
      | >
      template(v-slot:prepend-inner)
        v-fade-transition(leave-absolute='')
          v-progress-circular(v-if='loading' color='info' indeterminate='')
          img#lock-circle(src='../assets/img/username-icon.png' alt='')
    v-text-field#password(v-model='password' width='330px' height='55px' placeholder='password' :rules='[rules.required, rules.min]' :type="'password'" name='input-10-1' hint='At least 8 characters' counter='' filled='' rounded='' dense='')
      template(v-slot:prepend-inner)
        v-fade-transition(leave-absolute='')
          v-progress-circular(v-if='loading' color='info' indeterminate='')
          img#lock-circle(src='../assets/img/lock-circle.png' alt='')
    v-btn#login-button(block='' v-on:click='info' color='#5E6BE5')| Login
    |{{f}}
    |{{token}}


</template>


<style lang="sass">


#login 
  /* display: flex; */
  position: absolute
  top: 50%
  // top:505px
  left: 50%
  // left: 950px
  transform: translate(-50%, -50%)

  z-index: 3


#card 
  position: relative
  border-radius: 30px
  top: 100px
  left: 0px


#welcome 
  font-family: $theme-font
  font-size: 24px
  font-weight: bold
  color: #414141
  line-height: 29.05px
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25)





#username 
  font-family: $theme-font
  font-size: 24px
  font-style: normal
  text-align: center
  border-radius: 30px



.v-text-field__slot input::placeholder 
  color: $theme-color !important
  
  opacity: 1

#lock-circle 
  position: absolute
  padding-top: 6px


#password 
  font-family: $theme-font
  font-size: 24px
  font-style: normal
  text-align: center
  border-radius: 30px



#login-button 
  border-radius: 20px
  width: 330px
  height: 55px
  color: white
  /* font-size: 24px */
  font-family: $theme-font
  font-style: normal
  line-height: 29px


/* div[data-app='true'] {
  background: url('../assets/background.png') no-repeat center center fixed !important
  background-size: cover
  background-position: absolute

  */
</style>

<script>
import axios from 'axios';
import { mapGetters, mapMutations } from "vuex";
// import store from '../store'
// import router from '../router'
export default {
  name: 'LoginPage',


  data: () => ({
    password: '',
    username: '',
    f: false,
    token: '',
    rules: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 5 || 'Min 5 characters',
      emailMatch: () => (`The email and password you entered don't match`),
    },
  }),
  computed:{
    ...mapGetters(["isLoggedIn"])
  },
  methods: {
    ...mapMutations(["setUsername", "setToken"]),
    info() {
      axios
        .post('http://localhost:3000/users/Login', {
          password: this.password,
          username: this.username
        })
        .then(response =>  {
    
          this.setUsername(this.username);
          this.setToken(response.data.token);     
          this.token = response.data.token;
          console.log(this.token)
          this.$router.push({ path: '/home' });
    
        })

    }

  },
};</script>