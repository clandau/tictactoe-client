<template>
  <div class="container">
    <div class="row">
      <button v-show="!showLoginForm" @click="handleLogin">Login</button>
    </div>
    <div class="row">
      <button v-show="!showLoginForm" @click="handleRegister">Register</button>
    </div>
    <form v-show="showLoginForm" @submit.stop.prevent="handleSubmit">
      <div class="row">
        <div class="column">
          <label for="email">Email</label>
          <br />
          <input type="email" name="email" id="email" />
        </div>
      </div>
      <div class="row">
        <div class="column">
          <label for="password">Password</label>
          <br />
          <input type="password" name="password" />
        </div>
      </div>
      <div class="row">
        <div class="column"><input type="submit" /></div>
      </div>
    </form>
    <div class="row">
      <div class="column">
        <p class="error" v-if="errorMessage">{{ errorMessage }}</p>
      </div>
    </div>
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
      errorMessage: null,
    };
  },
  methods: {
    handleLogin() {
      this.errorMessage = null;
      this.newUser = false;
      this.showLoginForm = true;
    },
    handleRegister() {
      this.errorMessage = null;
      this.newUser = true;
      this.showLoginForm = true;
    },
    handleSubmit(e) {
      return this.newUser ? this.registerNewUser(e) : this.loginUser(e);
    },
    async loginUser(e) {
      const form = e.target;
      const email = form.elements.email.value;
      const password = form.elements.password.value;
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        console.log(user);
      } catch (err) {
        console.error(err);
        form.reset();
        this.showLoginForm = false;
        this.errorMessage = err.message;
      }
    },
    async registerNewUser(e) {
      const form = e.target;
      const email = form.elements.email.value;
      const password = form.elements.password.value;
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        console.log(user);
      } catch (err) {
        console.error(err);
      }
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
