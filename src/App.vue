<template>
  <div id="app">

    <router-view/>
  </div>
</template>

<script>
import { auth } from "@/firebaseConfig";
export default {
  data() {
    return {
      user: null,
    }
  },

  async created() {
    console.log(auth.currentUser)
    this.user = auth.currentUser;
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
button {
  padding: 5px;
}
.error {
  color: red;
}
</style>
