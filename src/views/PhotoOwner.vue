<template>
  <div>
    <ErrorAlert v-if="errorMsg.length > 0" v-bind:message="errorMsg"></ErrorAlert>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col col-md-12">
          <div class="row">
            <div class="col-md-4">
              <div class="mb-5 mt-3">
                <img :src="userInfo.profile_image.large" alt="Dev" />
              </div>
            </div>
            <div class="col-md-8">
              <div class="d-flex flex-row">
                <p class="font-weight-bold profile-username">{{ userInfo.instagram_username }}</p>
                <button type="button" class="btn btn-outline-primary follow-btn" v-if="!following" v-on:click="follow()">Follow</button>
                <button type="button" class="btn btn-outline-primary follow-btn" v-if="following" v-on:click="follow()">Unfollow</button>
              </div>
              <div class="d-flex flex-row profile-info">
                <p class="font-weight-bold">{{ userInfo.total_photos + ' '}}</p>
                <p class="space">Publicações</p>
                <p class="font-weight-bold">{{ userInfo.followers_count + ' '}}</p>
                <p class="space">Seguidores</p>
                <p class="font-weight-bold">{{ userInfo.following_count + ' '}}</p>
                <p class="space">Seguindo</p>
              </div>
              <p>{{userInfo.bio}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container gallery-container">
      <div class="row">
        <div class="col-md-4" v-for="photo in userPhotos" :key="photo.id">
          <div class="card mb-4 box-shadow">
            <img
              class="card-img-top"
              data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail"
              alt="Thumbnail [100%x225]"
              style="height: 225px; width: 100%; display: block;"
              :src="photo.download_url"
              data-holder-rendered="true"
            />
          </div>
        </div>
        <div class="loader" />
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import ErrorAlert from "../components/Alerts/Error";
import Axios from "axios";

const API_URL = "https://api.unsplash.com/users/";
const USER_PHOTOS = "https://picsum.photos/v2/list";
const Access_Token = "/?client_id=9Iiz8zyikc6To-YD0cuD1W0jetj2w3P2z_CmiNKbpEo";

export default {
  name: "PhotoOwner",
  components: { ErrorAlert },
  data() {
    return {
      following: false,
      errorMsg: "",
      username: "",
      userInfo: {
        profile_image: {
          large:
            "https://lh3.googleusercontent.com/proxy/cpxfJve9lPtGHMrNaV3SjOplXnyaGQUov8ZF3k1H44dnhHpohLRwtQO2gwpVaQ3TqoqC1FHQcKNXfTb079c0polBIIPwzh25A1gUe57TvUZpALBsMgzWfd_l2KiBO2XXNGqBVrk"
        }
      },
      userPhotos: []
    };
  },
  methods:{
    follow(){
      this.following = !this.following;
    }
  },
  created() {
    this.username = this.$route.params.username;
    axios
      .get(API_URL + this.username + Access_Token)
      .then(res => {
        this.userInfo = res.data;
      })
      .catch(err => {
        this.errorMsg = err;
      });

    axios
      .get(USER_PHOTOS)
      .then(res => {
        this.userPhotos = res.data;
      })
      .catch(err => {
        this.errorMsg = err;
      });
  }
};
</script>
<style scoped>
.loader {
  position: relative;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 2rem;
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

.gallery-container {
  margin-top: 1em;
}
.profile-username {
  margin-right: 1em;
}

.follow-btn {
  width: 10em;
  line-height: 1em;
  height: 2em;
  text-align: center;
}

.profile-info p {
  margin-right: 0.5em;
}

.space {
  margin-right: 2em !important;
}
</style>