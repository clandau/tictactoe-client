<template>
  <v-container class="dashboard-container">
    <div class="game-button-container d-flex flex-column mb-6">
      <h2>Start a new game</h2>
      <div class="button-container pa-6"><v-btn :to="{ name: 'GamePage', params: { twoPlayer: false }}">Against Computer</v-btn></div>
        <div class="button-container pa-6"><v-btn :to="{ name: 'GamePage', params: { twoPlayer: true }}">Find a game partner</v-btn></div>
    </div>
    <aside class="side-container">
      <div><LeaderBoard /></div>
      <div><GameHistory /></div>
    </aside>
  </v-container>
</template>

<script>
import { auth } from "@/firebaseConfig";
import LeaderBoard from "@/components/LeaderBoard";
import GameHistory from "@/components/GameHistory";
export default {
  name: "Dashboard",
  components: {LeaderBoard, GameHistory},
  data() {
    return {
      user: null,
    };
  },
  created() {
    this.user = auth.currentUser;
  },

  methods: {}
};
</script>

<style scoped>
</style>
