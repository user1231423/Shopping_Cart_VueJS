<template>
  <!-- NAVBAR -->
  <div id="app">
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarCollapse"
        aria-controls="navbarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <router-link class="navbar-brand" to="/">Fixed navbar</router-link>

      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link class="nav-link" to="/Home">Home</router-link>
        </li>
        <li class="nav-item" v-if="!isLoggedIn">
          <a
            v-on:click="openLoginModal()"
            class="nav-link"
            data-toggle="modal"
            data-target="#login-modal"
          >Login</a>
        </li>
        <li class="nav-item" v-if="!isLoggedIn">
          <a
            v-on:click="openSignUpModal()"
            class="nav-link"
            data-toggle="modal"
            data-target="#login-modal"
          >SignUp</a>
        </li>
        <li class="nav-item" v-if="isLoggedIn">
          <a
            v-on:click="logout()"
            class="nav-link"
            data-toggle="modal"
            data-target="#login-modal"
          >Logout</a>
        </li>
      </ul>

      <div class="btn-group dropleft" v-if="isLoggedIn">
        <button
          class="btn btn-default dropdown-toggle"
          type="button"
          id="menu1"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Cart
          <span class="caret"></span>
        </button>
        <div v-on:click="avoid($event)" class="dropdown-menu" role="menu" aria-labelledby="menu1">
          <ShoppingCart />
        </div>
      </div>
    </nav>
    <LoginModal ref="loginModal"></LoginModal>
    <SignUpModal ref="signupModal"></SignUpModal>

    <div class="container">
      <transition name="fade">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
import ShoppingCart from "./components/ShoppingCart";
import LoginModal from "./components/LoginModal";
import SignUpModal from "./components/SignUpModal";
import firebase from "firebase";

export default {
  name: "App",
  components: { ShoppingCart, LoginModal, SignUpModal },
  methods: {
    avoid(e) {
      e.stopPropagation();
    },
    openLoginModal() {
      this.$refs.signupModal.hide();
      this.$refs.loginModal.show();
    },
    openSignUpModal() {
      this.$refs.loginModal.hide();
      this.$refs.signupModal.show();
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({ name: "Root" });
        });
    }
  },
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.getUser.loggedIn;
    }
  }
};
</script>

<style scoped>
.container {
  position: relative;
  height: 80vh;
  width: 100vw;
}
a:hover {
  cursor: pointer;
}
</style>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
