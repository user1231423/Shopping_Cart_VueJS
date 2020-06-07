<template>
  <div>
    <ErrorAlert v-if="errorMsg.length > 0" v-bind:message="errorMsg"></ErrorAlert>
    <SuccessAlert v-if="successAlert"></SuccessAlert>
    <div class="d-flex align-content-around flex-wrap">
      <div v-for="camel in camels" :key="camel.id">
        <div class="card" v-on:click="addToCart(camel, $event)">
          <img class="card-img-top" :src="camel.Image" alt="Card image cap" />
          <div class="card-body">
            <h5 class="card-title">{{camel.name}}</h5>
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
const API_URL = "https://frontend-22587.firebaseio.com/.json";
import axios from "axios";
import ErrorAlert from "../components/Alerts/Error";
import SuccessAlert from "../components/Alerts/Success";

export default {
  name: "Home",
  components: { ErrorAlert, SuccessAlert },
  data() {
    return {
      successAlert: false,
      errorMsg: "",
      camels: []
    };
  },
  created() {
    axios.get(API_URL).then(res => {
      this.camels = res.data;
      console.log(res.data)
      if (this.camels.length == 0) {
        this.errorMsg = "No camels Found!";
      }
    });
  },
  methods: {
    addToCart(camel, e) {
      e.stopPropagation();
      if (this.isLoggedIn) {
        this.successAlert = true;
        setTimeout(() => (this.successAlert = false), 1000);
        this.$store.dispatch("addToCart", { camel, e });
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
.alert {
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