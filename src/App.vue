<template>
  <v-app>
    <v-app-bar app color="indigo darken-3" dark>
      <v-btn class="mx-2" v-if="user && !mobile" :to="'/dashboard'" outlined
        >Return to dashboard</v-btn
      >
      <v-btn class="mx-2" v-if="user && mobile" :to="'/dashboard'" outlined
        >Dashboard</v-btn
      >
      <v-spacer></v-spacer>
      <v-toolbar-title>Tic Tac Toe</v-toolbar-title>
      <v-spacer></v-spacer>
      <div v-if="user && !mobile" class="d-flex align-center mx-5">
        <span>{{ user.email }}</span>
      </div>
      <v-btn class="mx-2" v-if="user" @click="logoutUser" outlined>
        <span class="mr-2">LOGOUT</span>
      </v-btn>
    </v-app-bar>

    <v-main class="bg-color">
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
  computed: {
    mobile() {
      return this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs;
    },
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
    },
  },
};
</script>
<style>
.bg-color {
  background-color: #f7f6ee;
}
</style>