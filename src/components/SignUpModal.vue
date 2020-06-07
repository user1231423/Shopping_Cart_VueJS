<template>
  <div v-if="showModal">
    <div class="loginModal" tabindex="100">
      <div class="loginModal-container">
        <div class="header">
          <button v-on:click="hide()" type="button" aria-label="Close" class="close">×</button>
        </div>
        <h1>Register your Account</h1>
        <br />
        <form>
          <label for="name">Name:</label>
          <input type="text" name="name" placeholder="Name" v-model="name" />
          <label for="email">Email:</label>
          <input type="text" name="email" placeholder="Email" v-model="form.email" />
          <label for="password">Password:</label>
          <input type="password" name="password" placeholder="Password" v-model="form.password" />
          <label for="password">Repeat Password:</label>
          <input
            type="password"
            name="repeat-password"
            placeholder="Repeat Password"
            v-model="repeatPassword"
          />
          <button type="button" class="btn btn-primary" v-on:click="submit()">SignUp</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      showModal: false,
      form: {
        email: "",
        password: ""
      },
      name: "",
      repeatPassword: ""
    };
  },
  methods: {
    show() {
      this.showModal = true;
    },
    hide() {
      this.showModal = false;
    },
    submit() {
      this.showModal = false;
      if (this.form.password != this.repeatPassword) {
        alert("Passwords don't match!");
      } else {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.form.email, this.form.password)
          .then(data => {
            data.user
              .updateProfile({
                displayName: this.name
              })
              .then(() => {
                this.$router.replace({ name: "Dashboard" });
              });
          })
          .catch(err => {
            alert(err);
          });
      }
    }
  }
};
</script>
<style scoped>
label {
  text-align: left;
}

.loginModal {
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed; /*it can be fixed too*/
  left: 0;
  right: 0;
  top: 10vh;
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

.header {
  width: 100%;
  height: 3vh;
}
</style>