<template>
  <v-container fluid class="dashboard-container mx-auto">
    <v-row>
      <v-col xs="12" md="8">
        <div class="game-button-container mb-6 pa-5">
          <h1 class="text-h2">Start a new game</h1>
          <div class="button-container pa-6">
            <v-btn @click="handleGameChoice(false)" outlined color="deep-purple darken-4">
              Play against Computer</v-btn
            >
          </div>
          <div class="button-container pa-6">
            <v-btn @click="handleGameChoice(true)" outlined color="deep-purple darken-4"
              >Two player</v-btn
            >
          </div>
        </div>
      </v-col>
      <v-col xs="12" md="4" class="side-container">
        <div class="my-2"><LeaderBoard /></div>
        <div class="my-2"><GameHistory /></div
      ></v-col>
    </v-row>
  </v-container>
</template>

<script>
import { auth } from "@/firebaseConfig";
import LeaderBoard from "@/components/LeaderBoard";
import GameHistory from "@/components/GameHistory";
export default {
  name: "Dashboard",
  components: { LeaderBoard, GameHistory },
  data() {
    return {
      user: null,
    };
  },
  created() {
    this.user = auth.currentUser;
  },

  methods: {
    handleGameChoice(twoPlayer) {
      this.$router.push({ name: "GamePage", params: { twoPlayer: twoPlayer }});
    }
  },
};
</script>

<style scoped>
.game-button-container,
.side-container {
  text-align: center;
}
</style>
