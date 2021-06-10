<template>
  <v-container class="pa-10 ma-3">
    <v-row>
      <v-col cols="1"></v-col>
      <v-col cols="10" max-width="450">
        <v-alert
          v-if="state.status === 'complete' && state.winner === user.uid"
          type="success"
          >You have won!</v-alert
        >
        <v-alert
          v-if="state.status === 'complete' && state.winner !== user.uid"
          type="error"
          >You have lost.</v-alert
        >
        <h1 v-if="state.status !== 'complete'">{{`${state.turn}'s turn` }}</h1>
        <GameBoard
          v-if="state"
          :boardState="state.board"
          v-on="{ choice: handleCellChoice }"
        />
      </v-col>
      <v-col cols="1"></v-col>
    </v-row>
  </v-container>
</template>

<script>
import GameBoard from "@/components/GameBoard";
const io = require("socket.io-client");
import { auth } from "@/firebaseConfig";

export default {
  name: "GamePage",
  components: { GameBoard },
  props: {
    twoPlayer: {
      type: Boolean,
    },
  },
  data() {
    return {
      state: null,
      socket: null,
      user: null,
    };
  },
  async created() {
    this.user = auth.currentUser;
    const token = await this.user.getIdToken();
    this.socket = io("http://localhost:3000", {
      auth: {
        token,
        uid: this.user.uid,
      },
    });
    this.socket.on("init", (data) => {
      console.log(data);
    });
    this.socket.emit("newGame", { twoPlayer: this.twoPlayer });
    this.socket.on("currentState", this.handleState);
  },

  methods: {
    handleState(state) {
      this.state = JSON.parse(state);
    },
    handleCellChoice(coordinates) {
      // send choice to server
      this.socket.emit("playerMove", coordinates);
    },
  },
};
</script>

<style lang="scss" scoped></style>
