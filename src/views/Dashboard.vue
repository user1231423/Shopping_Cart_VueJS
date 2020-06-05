<template>
  <h1>Welcome {{displayName}}</h1>
</template>
<script>
export default {
  name: "Dashboard",
  data(){
    return {
      displayName: ""
    }
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