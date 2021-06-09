<template>
  <div class="dashboard-container">
    Hello Dashboard
  </div>
</template>

<script>
  import { auth } from "@/firebaseConfig";
  export default {
    name: "Dashboard",
    data() {
      return {
        user: null,
      }
    },
    created() {
      this.user = auth.currentUser;
    }
  }

</script>

<style scoped>

</style>