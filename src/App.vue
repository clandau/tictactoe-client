<template>
  <v-app>
    <v-app-bar app color="deep-purple" dark>
      <v-btn :to="'/dashboard'" outlined>Return to dashboard</v-btn>
      <v-spacer></v-spacer>
      <div v-if="user" class="d-flex align-center mx-5">
        <v-toolbar-title>{{ user.email }}</v-toolbar-title>
      </div>
      <v-btn v-if="user" @click="logoutUser" outlined>
        <span class="mr-2">LOGOUT</span>
      </v-btn>
    </v-app-bar>

    <v-main class="blue-grey lighten-5">
      <router-view @updateUser="updateUser"></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { auth, signOut } from "@/firebaseConfig";
export default {
  name: "App",
  components: {},
  data() {
    return {
      user: null,
    };
  },
  
  created() {
    this.user = auth.currentUser;
  },
  methods: {
    logoutUser() {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          this.user = null;
          this.$router.push("/login");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateUser(user) {
      this.user = user;
    }
  },
};
</script>
