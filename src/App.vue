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
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/">Root</router-link>
        </li>
        <li class="nav-item" v-if="isLoggedIn">
          <router-link class="nav-link" to="/Dashboard">Dashboard</router-link>
        </li>
        <li class="nav-item">
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
          <span class="caret"></span>
          <i class="fa fa-shopping-cart"></i>
          <span class="badge badge-light" v-if="itemCount > 0">{{itemCount}}</span>
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
    },
    itemCount: function() {
      var total = 0;
      var items = this.$store.getters.getCartItems;
      items.forEach(element => {
        total += element.Quantity;
      });
      return total;
    }
  }
};
</script>

<style scoped>
.badge {
  position: absolute;
  font-size: 10px;
  left: 0.5em;
  top: -1em !important;
}

.btn-default {
  color: white;
}

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
.nav-item:hover {
  color: white !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
