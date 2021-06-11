<template>
  <v-card class="mx-auto">
    <v-card-title class="text-h5 pb-2">Game History</v-card-title>
    <div class="px-5 py-2">
      <ol>
        <li v-for="(game, i) of games" :key="i" class="text-left">
          <p>
            {{ formatDate(game.created) }}
          </p>
          <p>
            Player 1: <span :class="{ winner: game.player1 === game.winner }"
              >{{ game.player1 }}</span
            ><br>Player 2: <span :class="{ winner: game.player2 === game.winner }"
              > {{ game.player2 }}</span
            >
          </p>
        </li>
      </ol>
    </div>
  </v-card>
</template>

<script>
import { auth } from "@/firebaseConfig";
export default {
  name: "GameHistory",
  data() {
    return {
      games: null,
      url: "https://peaceful-temple-46739.herokuapp.com/api/games",
    };
  },

  async created() {
    const user = auth.currentUser;
    const token = await user.getIdToken();
    try {
      const res = await fetch(this.url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      this.games = await res.json();
    } catch (err) {
      console.error(err);
    }
  },

  computed: {},

  methods: {
    formatDate(date) {
      const dateObj = new Date(date);
      const month = dateObj.getUTCMonth() + 1;
      const day = dateObj.getUTCDate();
      const year = dateObj.getUTCFullYear();

      return year + "/" + month + "/" + day;
    },
  },
};
</script>

<style lang="scss" scoped>
.winner {
  color: green;
  font-weight: bold;
}
</style>
