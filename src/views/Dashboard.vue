<template>
  <div>
    <div class="container">
      <h1 class="text-center">Welcome {{displayName}}</h1>
      <br>
      <div class="d-flex justify-content-center flex-wrap">
        <div class="image_outer_container">
          <div class="green_icon"></div>
          <div class="image_inner_container">
            <img src="https://i.pinimg.com/originals/43/96/61/439661dcc0d410d476d6d421b1812540.jpg" />
          </div>
        </div>
        <div class="image_outer_container">
          <div class="green_icon"></div>
          <div class="image_inner_container">
            <img src="https://i.pinimg.com/originals/43/96/61/439661dcc0d410d476d6d421b1812540.jpg" />
          </div>
        </div>
        <div class="image_outer_container">
          <div class="green_icon"></div>
          <div class="image_inner_container">
            <img src="https://i.pinimg.com/originals/43/96/61/439661dcc0d410d476d6d421b1812540.jpg" />
          </div>
        </div>
        <div class="image_outer_container">
          <div class="green_icon"></div>
          <div class="image_inner_container">
            <img src="https://i.pinimg.com/originals/43/96/61/439661dcc0d410d476d6d421b1812540.jpg" />
          </div>
        </div>
        <div class="image_outer_container">
          <div class="green_icon"></div>
          <div class="image_inner_container">
            <img src="https://i.pinimg.com/originals/43/96/61/439661dcc0d410d476d6d421b1812540.jpg" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Dashboard",
  data() {
    return {
      displayName: ""
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
    this.displayName = this.$store.getters.getUser.data.displayName;
  }
};
</script>
<style>
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