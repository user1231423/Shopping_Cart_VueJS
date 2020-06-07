import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store/store';
import * as firebase from "firebase";
 
Vue.use(VueAxios, axios)

// Import the styles directly. (Or you could add them via script tags.)
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import 'jquery/dist/jquery';
import 'popper.js/dist/popper';
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

const configOptions = {
  apiKey: "AIzaSyBHf3CIaClZS_i-EpoZVc0nv0SHwgRGrDM",
  authDomain: "shoppingcart-auth.firebaseapp.com",
  databaseURL: "https://shoppingcart-auth.firebaseio.com",
  projectId: "shoppingcart-auth",
  storageBucket: "shoppingcart-auth.appspot.com",
  messagingSenderId: "200397967069",
  appId: "1:200397967069:web:f0b5a8ea36544c2a8bd534"
};

firebase.initializeApp(configOptions);

firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  beforeCreate(){this.$store.commit('getLocalStorageItem')},
  render: function (h) { return h(App) }
}).$mount('#app')
