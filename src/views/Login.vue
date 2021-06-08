<template>
  <div>
    <button @click="showLoginForm = true">Login</button>
    <form v-show="showLoginForm" action="loginUser">
      <label for="email">Email</label>
      <input type="email" name="email" id="email">
      <label for="password">Password</label>
      <input type="password" name="password">
      <input type="submit" @click.stop.prevent="loginUser">
    </form>
  </div>
</template>

<script>
  // import { auth } from "@/firebaseConfig";
  export default {
    data() {
      return {
        showLoginForm: false,
      }
    },
    methods: {
      loginUser() {
        
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>