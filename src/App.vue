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

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { auth, signOut } from "@/firebaseConfig";
export default {
  name: "App",
  components: {},
  props: {
    user: {
      type: Object || null,
    }
  },
  data() {
    return {
    };
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
