<template>
  <div>
    <ErrorAlert v-if="errorMsg.length > 0" v-bind:message="errorMsg"></ErrorAlert>
    <div class="d-flex justify-content-center flex-wrap">
      <div class="jumbotron">
        <div class="row">
          <div class="col-md-4 col-xs-12 col-sm-6 col-lg-4">
            <img :src="userInfo.profile_image.large" alt="stack photo" class="img" />
          </div>
          <div class="col-md-8 col-xs-12 col-sm-6 col-lg-8">
            <div class="container" style="border-bottom:1px solid black">
              <h2>{{username}}</h2>
            </div>
            <hr />
            <ul class="container details">
              <li>
                <p v-html="'Full Name: ' + userInfo.first_name + ' ' + userInfo.last_name"></p>
              </li>
              <li>
                <p v-html="'Folowers Count: ' + userInfo.followers_count"></p>
              </li>
              <li>
                <p v-html="'Folowing Count: ' + userInfo.following_count"></p>
              </li>
              <li>
                <p v-html="'Instagram Username: @' + userInfo.instagram_username"></p>
              </li>
              <li>
                <p>
                  Porfolio:
                  <a
                    target="_blank"
                    :href="userInfo.portfolio_url"
                    class="badge badge-success"
                  >Check user Porfolio</a>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import ErrorAlert from "../components/Alerts/Error";

const API_URL = "https://api.unsplash.com/users/";
const Access_Token = "/?client_id=9Iiz8zyikc6To-YD0cuD1W0jetj2w3P2z_CmiNKbpEo";

export default {
  name: "PhotoOwner",
  components: { ErrorAlert },
  data() {
    return {
      errorMsg: "",
      username: "",
      userInfo: {
        profile_image: {
          large:
            "https://lh3.googleusercontent.com/proxy/cpxfJve9lPtGHMrNaV3SjOplXnyaGQUov8ZF3k1H44dnhHpohLRwtQO2gwpVaQ3TqoqC1FHQcKNXfTb079c0polBIIPwzh25A1gUe57TvUZpALBsMgzWfd_l2KiBO2XXNGqBVrk"
        }
      }
    };
  },
  mounted() {
    this.username = this.$route.params.username;
    axios
      .get(API_URL + this.username + Access_Token)
      .then(res => {
        this.userInfo = res.data;
      })
      .catch(err => this.errorMsg = err);
  }
};
</script>