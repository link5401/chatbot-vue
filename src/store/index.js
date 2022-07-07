import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

 Vue.use(Vuex);
 export default new Vuex.Store({
    plugins: [createPersistedState({
        storage: window.sessionStorage,
    })],
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