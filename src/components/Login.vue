<template>

  <div id="login">

    <v-card class="mx-auto elevation-5 text-center pa-5" width="460px" height="339px"
      style="border-radius:30px;position:relative;top:425px;">

      <v-card-subtitle id="welcome">WELCOME !</v-card-subtitle>


      <v-text-field id="username" width="330px" height="55px" placeholder="username" filled rounded dense>
        <template v-slot:prepend-inner>
          <v-fade-transition leave-absolute>
            <v-progress-circular v-if="loading" color="info" indeterminate></v-progress-circular>
            <img id="lock-circle" src="../assets/username-icon.png" alt="">
          </v-fade-transition>
        </template>
      </v-text-field>

      <v-text-field id="password" width="330px" height="55px" placeholder="password"
        :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1"
        hint="At least 8 characters" counter filled rounded dense @click:append="show1 = !show1">
        <template v-slot:prepend-inner>
          <v-fade-transition leave-absolute>
            <v-progress-circular v-if="loading" color="info" indeterminate></v-progress-circular>
            <img id="lock-circle" src="../assets/lock-circle.png" alt="">
          </v-fade-transition>
        </template>
      </v-text-field>

      <v-btn block id="login-button" color="#5E6BE5">
        Login
      </v-btn>
    </v-card>

  </div>

</template>

<script>
export default {
  name: 'LoginPage',


  data: () => ({
    show1: false,
    password: 'password',
    rules: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 8 || 'Min 8 characters',
      emailMatch: () => (`The email and password you entered don't match`),
    },
  }),
};</script>
<style>
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
  font-weight: normal;
  text-align: center;
  border-radius: 30px;


}

#lock-circle {
  position: absolute;
  padding-top: 6px;
}

#password {
  font-family: 'Inter';
  font-size: 24px;
  font-weight: normal;
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
}

div[data-app='true'] {
  background: url('../assets/background.png') no-repeat center center fixed !important;
  background-size: cover;
  background-position: absolute;

}
</style>