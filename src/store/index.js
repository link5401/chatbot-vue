import Vue from 'vue'
import Vuex from 'vuex'
 Vue.use(Vuex);
 export default new Vuex.Store({
    state:{
        user: null,
        token: null,
    },
    mutations:{
        setUsername(state, username){
            state.username = username;
        },
        setToken(state, token){
            state.token = token;
        }
    },
    actions: {},
    getters:{
        isLoggedIn(state){
            return !!state.token
        },
        getUsername(state){
            return state.token;
        }
    }
 });