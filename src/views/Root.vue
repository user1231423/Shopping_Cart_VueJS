<template>
  <div>
    <ErrorAlert v-if="errorMsg.length > 0" v-bind:message="errorMsg"></ErrorAlert>
    <div class="d-flex align-content-around flex-wrap">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Search something"
          aria-describedby="basic-addon2"
          v-model="searchWord"
        />
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" v-on:click="search()">Search</button>
        </div>
      </div>
      <div v-for="photo in photos" :key="photo.id">
        <div class="card" v-on:click="showDetails(photo.user.username)">
          <img class="card-img-top" :src="photo.urls.regular" alt="Card image cap" />
        </div>
      </div>
    </div>
    <LoginModal ref="loginModal"></LoginModal>
  </div>
</template>
<script>
const API_URL =
  "https://api.unsplash.com/search/?client_id=9Iiz8zyikc6To-YD0cuD1W0jetj2w3P2z_CmiNKbpEo&&photos?page=1&query=";
import axios from "axios";
import LoginModal from "../components/LoginModal";
import ErrorAlert from "../components/Alerts/Error";

export default {
  name: "Root",
  components: { ErrorAlert, LoginModal },
  data() {
    return {
      errorMsg: "",
      searchWord: "",
      photos: []
    };
  },
  methods: {
    search() {
      axios
        .get(API_URL + this.searchWord)
        .then(res => {
          this.photos = res.data.photos.results;
          if (this.photos.length == 0) {
            this.errorMsg = "No photos found!";
          }
        })
        .catch(err => (this.errorMsg = err));
    },
    showDetails(username) {
      if (this.isLoggedIn) {
        this.$router.push({ name: "Photo_OwnerDesc", params: { username } });
      } else {
        this.errorMsg = "Login First!";
        this.$refs.loginModal.show();
        setTimeout(() => (this.errorMsg = ""), 3000);
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

<style>
.card:hover {
  transform: scale(1.01);
}

.card {
  max-height: 10em;
  max-width: 15em;
  margin-right: 2em;
  margin-bottom: 2.5em;
}

.card-img-top {
  min-height: 10em;
  max-height: 10em;
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
}
</style>