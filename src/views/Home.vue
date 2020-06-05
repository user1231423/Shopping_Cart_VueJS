<template>
  <div>
    <div class="alert alert-success" v-if="alert">
      <strong>Success!</strong> New Dog added to cart!
    </div>
    <div class="d-flex align-content-around flex-wrap">
      <div v-for="dog in dogs" :key="dog.id">
        <div class="card" v-on:click="addToCart(dog, $event)">
          <img class="card-img-top" :src="dog.Image" alt="Card image cap" />
          <div class="card-body">
            <h5 class="card-title">{{dog.name}}</h5>
            <p
              class="card-text"
            >Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const API_URL = "https://frontend-uma.firebaseio.com/.json";
import axios from "axios";

export default {
  name: "Home",
  data() {
    return {
      alert: false,
      dogs: []
    };
  },
  created() {
    axios.get(API_URL).then(res => (this.dogs = res.data));
  },
  methods: {
    addToCart(dog, e) {
      e.stopPropagation();
      if (this.isLoggedIn) {
        this.alert = true;
        setTimeout(() => this.alert = false, 1000)
        this.$store.dispatch("addToCart", { dog, e });
      }
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
.alert{
    position: relative;
    z-index: 1001;
    margin: 0 auto;
    margin-bottom: 1em;
    width: 30vw;
}

.card:hover {
  transform: scale(1.01);
}

.card {
  max-height: 10em;
  max-width: 15em;
  margin-right: 2em;
  margin-bottom: 15em;
}

.card-img-top {
  max-height: 12em;
}
.card:hover {
  cursor: pointer;
}

.dropdown-menu {
  position: absolute !important;
  right: 0% !important;
  margin-top: 2.9em !important;
  flex-grow: 1;
  width: 40em;
  max-height: 40em;
  overflow: hidden;
  overflow-y: scroll;
}

.container {
  margin-top: 5em;
}

@media only screen and (min-device-width: 375px) and (min-device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait) {
  .dropdown-menu {
    position: absolute !important;
    right: -1em !important;
    margin-top: 2.9em !important;
    flex-grow: 1;
    width: 23.2em;
    max-height: 40em;
    overflow: hidden;
    overflow-y: scroll;
  }

  .card {
    max-height: 15em;
    max-width: 15em;
    margin-left: 3.5em;
    margin-bottom: 15em;
  }
}
</style>