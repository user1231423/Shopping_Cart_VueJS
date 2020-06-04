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
        <li class="nav-item">
          <a v-on:click="openLoginModal($event)" class="nav-link" data-toggle="modal" data-target="#login-modal">Login</a>
        </li>
      </ul>

      <div class="btn-group dropleft">
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


    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import ShoppingCart from "./components/ShoppingCart";
import LoginModal from "./components/LoginModal";

export default {
  name: "App",
  components: { ShoppingCart, LoginModal },
  methods:{
    openLoginModal(){
      this.$refs.loginModal.show();
    },
    close(){
      console.log("close");
    }
  }
};
</script>

<style scoped>
.container{
  position: relative;
  height: 100vh;
  width: 100vw;
}
a:hover{
  cursor: pointer;
}
</style>
