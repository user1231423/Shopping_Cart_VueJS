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
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
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
