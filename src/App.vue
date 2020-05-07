<template>
  <!-- NAVBAR -->
  <div id="app">
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <router-link class="navbar-brand" to="/">Fixed navbar</router-link>
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
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/Home">
              Home
            </router-link>
          </li>
        </ul>
      </div>
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

    <div class="container">
      <router-view />
    </div>
    
  </div>
</template>

<script>
import ShoppingCart from "./components/ShoppingCart";

export default {
  name: "App",
  components: { ShoppingCart }
};

</script>
