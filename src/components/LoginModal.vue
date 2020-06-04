<template>
  <div v-if="showModal">
    <div  class="loginModal" tabindex="100">
      <div class="loginModal-container">
        <div class="header">
            <button v-on:click="hide()" type="button" aria-label="Close" class="close">×</button>
        </div>
          <h1>Login to Your Account</h1>
          <br />
          <form>
            <input type="text" name="user" placeholder="Username" />
            <input type="password" name="pass" placeholder="Password" />
            <input type="submit" name="login" class="loginmodal-submit" value="Login" />
          </form>

          <div>
            <a href="#">Register</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showModal: false
    };
  },
  methods: {
    show() {
      this.showModal = true;
    },
    hide() {
        console.log("hide")
      this.showModal = false;
    }
  }
};
</script>
<style scoped>
.loginModal {
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed; /*it can be fixed too*/
  left: 0;
  right: 0;
  top: 30vh;
  bottom: 0;
  margin: auto;
  z-index: 1040 !important;
  opacity: 1;
  transition: opacity 0.15s linear;
}

.loginModal-container {
  text-align: center;
  font-size: 1em;
  padding: 30px;
  max-width: 350px;
  margin: 0 auto;
  border-radius: 2px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  background-color: #f7f7f7;
  display: block;
}

.loginModal-container input[type="text"],
input[type="password"] {
  height: 44px;
  font-size: 16px;
  width: 100%;
  margin-bottom: 10px;
  -webkit-appearance: none;
  background: #fff;
  border: 1px solid #d9d9d9;
  border-top: 1px solid #c0c0c0;
  /* border-radius: 2px; */
  padding: 0 8px;
  box-sizing: border-box;
}

form {
  display: block;
  margin-top: 0;
}

.loginmodal-submit {
  width: 100%;
  border: 0px;
  color: #fff;
  text-shadow: 0 1px rgba(0, 0, 0, 0.1);
  background-color: #4d90fe;
  padding: 17px 0px;
  font-family: roboto;
  font-size: 14px;
}

.header{
    width: 100%;
    height: 3vh;
}
</style>