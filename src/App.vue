<template>
  <v-app>
    <v-app-bar app color="deep-purple" dark>
      <v-spacer></v-spacer>
      <div v-if="user" class="d-flex align-center mx-5">
        <v-toolbar-title>{{ user.email }}</v-toolbar-title>
      </div>
      <v-btn v-if="user" @click="logoutUser" outlined>
        <span class="mr-2">LOGOUT</span>
      </v-btn>
    </v-app-bar>

    <v-main>
      <Login v-if="!user"></Login>
      <router-view v-if="user"></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { auth, signOut } from "@/firebaseConfig";
import Login from "@/views/Login"
export default {
  name: "App",
  components: {
    Login
  },
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
          this.$router.push("/login");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
