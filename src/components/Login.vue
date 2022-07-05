<template>

  <div id="login">

    <v-card id="card" class="mx-auto elevation-5 text-center pa-5" width="460px" height="339px">

      <v-card-subtitle id="welcome">WELCOME !</v-card-subtitle>


      <v-text-field id="username" v-model="username" width="330px" height="55px" placeholder="username" value="" filled
        rounded dense @input="event => text = event.target.value">
        >
        <template v-slot:prepend-inner>
          <v-fade-transition leave-absolute>
            <v-progress-circular v-if="loading" color="info" indeterminate></v-progress-circular>
            <img id="lock-circle" src="../assets/username-icon.png" alt="">
          </v-fade-transition>
        </template>
      </v-text-field>

      <v-text-field v-model="password" id="password" width="330px" height="55px" placeholder="password"
        :rules="[rules.required, rules.min]" :type="'password'" name="input-10-1" hint="At least 8 characters" counter
        filled rounded dense>
        <template v-slot:prepend-inner>
          <v-fade-transition leave-absolute>
            <v-progress-circular v-if="loading" color="info" indeterminate></v-progress-circular>
            <img id="lock-circle" src="../assets/lock-circle.png" alt="">
          </v-fade-transition>
        </template>
      </v-text-field>

      <v-btn block v-on:click="info" id="login-button" color="#5E6BE5">
        Login
      </v-btn>
      {{token}}
    </v-card>
  </div>

</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginPage',


  data: () => ({
    password: '',
    username: '',
    token: '',
    rules: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 5 || 'Min 5 characters',
      emailMatch: () => (`The email and password you entered don't match`),
    },
  }),
  methods: {
    info() {
      axios
        .post('http://localhost:3000/users/Login', {
          password: this.password,
          username: this.username
        })
        .then(response => this.token = response.data.token)

    }

  },
};</script>
<style>
#login {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

#card {
  position: relative;
  border-radius: 30px;
  top: 100px;
  left: 0px;
}

#welcome {
  font-family: 'Inter';
  font-size: 24px;
  font-weight: bold;
  color: #414141;
  line-height: 29.05px;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

}



#username {
  font-family: 'Inter';
  font-size: 24px;
  font-style: normal;
  text-align: center;
  border-radius: 30px;

}

.v-text-field__slot input::placeholder {
  color: #848EEB !important;
  ;
  opacity: 1;
}

#lock-circle {
  position: absolute;
  padding-top: 6px;
}

#password {
  font-family: 'Inter';
  font-size: 24px;
  font-style: normal;
  text-align: center;
  border-radius: 30px;

}

#login-button {
  border-radius: 20px;
  width: 330px;
  height: 55px;
  color: white;
  /* font-size: 24px; */
  font-family: 'Inter';
  font-style: normal;
  line-height: 29px;
}

/* div[data-app='true'] {
  background: url('../assets/background.png') no-repeat center center fixed !important;
  background-size: cover;
  background-position: absolute;

}  */
</style>