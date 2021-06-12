<template>
  <div class="container">
    <div class="row">
      <v-btn
        class="indigo lighten-1 lighten-2 white--text"
        v-show="!showLoginForm"
        @click="handleLogin"
        >Login</v-btn
      >
    </div>
    <div class="row">
      <v-btn
        class="indigo lighten-1 white--text"
        v-show="!showLoginForm"
        @click="handleRegister"
        >Register</v-btn
      >
    </div>
    <div class="row">
      <v-btn
        v-show="!showLoginForm"
        class="indigo lighten-1 white--text"
        @click="loginWithGoogle"
        >Sign In / Sign up with Google</v-btn
      >
    </div>
    <form v-show="showLoginForm">
      <div class="row">
        <div class="column">
          <v-text-field
            v-model="email"
            label="E-mail"
            color="indigo darken-3"
            required
          ></v-text-field>
        </div>
      </div>
      <div class="row">
        <div class="column">
          <v-text-field
            v-model="password"
            type="password"
            label="Password"
            hint="At least 8 characters"
            color="indigo darken-3"
            counter
          ></v-text-field>
        </div>
      </div>
      <div class="row">
        <div class="column">
          <v-btn @click="clear" class="mr-2"
            >cancel</v-btn
          >
          <v-btn type="submit" color="indigo lighten-1 white--text" @click.stop.prevent="handleSubmit" class=""
            >SUBMIT</v-btn
          >
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import {
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "@/firebaseConfig";
export default {
  data() {
    return {
      showLoginForm: false,
      user: null,
      newUser: false,
      email: null,
      password: null,
    };
  },
  methods: {
    handleLogin() {
      this.newUser = false;
      this.showLoginForm = true;
    },
    handleRegister() {
      this.newUser = true;
      this.showLoginForm = true;
    },
    handleSubmit() {
      return this.newUser ? this.registerNewUser() : this.loginUser();
    },
    async loginUser() {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          this.email,
          this.password
        );
        const user = userCredential.user;
        this.$emit("updateUser", user);
        this.$router.push({ name: "Dashboard" });
      } catch (err) {
        console.error(err);
        alert(`trouble logging in user: ${err.message}`);
        this.clear();
      }
    },
    async registerNewUser() {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          this.email,
          this.password
        );
        const user = userCredential.user;
        this.$emit("updateUser", user);
        // send new user to db
        await this.addUserToDatabase(user);
        this.$router.push("/dashboard");
      } catch (err) {
        console.error(err);
        alert(`trouble registering new user: ${err.message}`);
        this.clear();
      }
    },

    async loginWithGoogle() {
      try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        const createdTime = user.metadata.createdAt;
        const currentTime = Date.now();
        const fiveMinutesInMS = 1000 * 60 * 5;
        // if account was created in past 5 minutes, send it to database
        if (createdTime > currentTime - fiveMinutesInMS) {
          this.addUserToDatabase(user);
        }
        this.$emit("updateUser", user);
        this.$router.push("/dashboard");
      } catch (err) {
        console.error(err);
        alert(`Trouble logging in with Google: ${err.message}`);
      }
    },

    clear() {
      this.showLoginForm = false;
      this.email = null;
      this.password = null;
    },

    async addUserToDatabase(user) {
      const url = "https://peaceful-temple-46739.herokuapp.com/api/newUser";
      const token = user && (await user.getIdToken());

      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return res.json();
    },
  },
};
</script>

<style scoped>
.container {
  padding: 8%;
  max-width: 800px;
}
.row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 10px;
}
.column {
  flex: 1;
}
</style>
