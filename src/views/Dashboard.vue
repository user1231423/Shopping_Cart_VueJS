<template>
  <div>
    <ErrorAlert v-if="errorMsg.length > 0" v-bind:message="errorMsg"></ErrorAlert>
    <div class="container">
      <h1 class="text-center">Welcome {{displayName}}</h1>
      <br />
      <div class="d-flex justify-content-center flex-wrap">
        <div class="image_outer_container" v-for="image in imgUrls" :key="image.key">
          <div class="green_icon"></div>
          <div class="image_inner_container">
            <img :src="image.download_url" />
          </div>
        </div>
      </div>
    </div>
    <div class="container posts">
      <div class="d-flex justify-content-center flex-column">
        <div class="post-card" v-for="image in imgUrls" :key="image.key">
          <img class="img-post" alt="Card image cap" :src="image.download_url" />
          <div class="card-body">
            <h5 class="card-title">{{ image.author }}</h5>
          </div>
        </div>
        <div class="loader" />
      </div>
    </div>
  </div>
</template>
<script>
const API_URL = "https://picsum.photos/v2/list";
import axios from "axios";
import ErrorAlert from "../components/Alerts/Error";

export default {
  name: "Dashboard",
  components: { ErrorAlert },
  data() {
    return {
      errorMsg: "",
      displayName: "",
      imgUrls: []
    };
  },
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({
            name: "Home"
          });
        });
    }
  },
  created() {
    axios
      .get(API_URL)
      .then(res => {
        for (var i = 0; i < 6; i++) {
          this.imgUrls.push(res.data[i]);
        }
      })
      .catch(err => {
        this.errorMsg = err;
      });
    this.displayName = this.$store.getters.getUser.data.displayName;
  }
};
</script>
<style>
.loader {
  position: relative;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 2rem;
  margin-bottom: 2em!important;
  height: 2em;
  border: 0.2em solid #999;
  border-bottom-color: transparent;
  border-radius: 50%;
  animation: loader 500ms linear infinite;
}

@keyframes loader {
  to {
    transform: rotate(360deg);
  }
}

.card-body:hover {
  cursor: pointer;
}

.img-post {
  min-height: 20em !important;
  max-height: 20em !important;
}

.img-post:hover {
  cursor: pointer;
}

.post-card {
  min-width: 20em;
  min-height: 30em;
  max-height: 30em;
}

.posts {
  display: flex;
  align-items: center;
  justify-content: center;
}

.image_outer_container {
  margin-top: auto;
  margin-bottom: auto;
  border-radius: 50%;
  position: relative;
  margin: 0 1em;
}

.image_inner_container {
  border-radius: 50%;
  padding: 4px;
  background: #833ab4;
  background: -webkit-linear-gradient(to bottom, #fcb045, #fd1d1d, #833ab4);
  background: linear-gradient(to bottom, #fcb045, #fd1d1d, #833ab4);
}
.image_inner_container img {
  height: 5em;
  width: 5em;
  border-radius: 50%;
  border: 4px solid white;
}

.image_outer_container .green_icon {
  background-color: #4cd137;
  position: absolute;
  right: 2px;
  bottom: 10px;
  height: 20px;
  width: 20px;
  border: 4px solid white;
  border-radius: 50%;
}
</style>