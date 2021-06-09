<template>
  <div class="container">
    <div class="row">
      <v-btn
        class="deep-purple lighten-3"
        v-show="!showLoginForm"
        @click="handleLogin"
        >Login</v-btn
      >
    </div>
    <div class="row">
      <v-btn
        class="deep-purple lighten-3"
        v-show="!showLoginForm"
        @click="handleRegister"
        >Register</v-btn
      >
    </div>
    <form v-show="showLoginForm">
      <div class="row">
        <div class="column">
          <v-text-field
            v-model="email"
            :error-messages="emailErrors"
            label="E-mail"
            required
          ></v-text-field>
        </div>
      </div>
      <div class="row">
        <div class="column">
          <v-text-field
            v-model="password"
            type="password"
            name="input-10-1"
            label="Password"
            hint="At least 8 characters"
            counter
          ></v-text-field>
        </div>
      </div>
      <div class="row">
        <div class="column">
          <v-btn type="submit" @click="handleSubmit" class="">SUBMIT</v-btn>
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
        console.log(user);
      } catch (err) {
        console.error(err);
        alert(`trouble logging in user: ${err.message}`);
        this.showLoginForm = false;
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
        console.log(user);
      } catch (err) {
        console.error(err);
        alert(`trouble registering new user: ${err.message}`);
        this.showLoginForm = false;
        this.clear();
      }
    },
    clear() {
      this.email = null;
      this.password = null;
    }
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
