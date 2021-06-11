<template>
  <v-container fluid class="pa-10 ma-3">
    <v-row v-if="state">
      <!-- <v-col cols="1"></v-col> -->
      <v-col max-width="450">
      <v-alert
        v-if="state && state.status === 'complete' && state.winner === user.uid"
        type="success"
        >You have won!</v-alert
      >
      <v-alert
        v-if="state && state.status === 'complete' && state.winner !== user.uid"
        type="error"
        >You have lost.</v-alert
      ></v-col>
      <!-- </v-col> -->
      </v-row><v-row><v-col>
      <h1 class="text-h2 my-4" v-if="state && state.status !== 'complete'">{{ turnText }}</h1>
      <GameBoard
        v-if="state"
        :boardState="state.board"
        v-on="{ choice: handleCellChoice }"
      />
      </v-col>
      <!-- <v-col cols="1"></v-col> -->
    </v-row>
    <v-row v-if="waitingForGamePartner">
      <h2 class="text-h2 my-4">Awaiting a game partner...</h2>
      <v-progress-linear indeterminate color="deep-purple"></v-progress-linear>
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
      required: true,
    },
  },
  data() {
    return {
      state: null,
      socket: null,
      user: null,
      player: null,
      waitingForGamePartner: false,
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
    this.socket.on("waitingPartner", this.handleWaiting);
  },

  computed: {
    turnText() {
      return this.state.turn === this.player
        ? "Your turn"
        : `${this.state.turn}'s turn`;
    },
  },

  methods: {
    handleState(state) {
      this.waitingForGamePartner = false;
      this.state = JSON.parse(state);
      this.player =
        this.user.uid === this.state.player1 ? "player1" : "player2";
    },
    handleCellChoice(coordinates) {
      // if it's our turn, send choice to server
      if (this.player === this.state.turn) {
        this.socket.emit("playerMove", coordinates);
      }
    },
    handleWaiting() {
      console.log("awaiting partner");
      this.waitingForGamePartner = true;
    }
  },
};
</script>

<style lang="scss" scoped></style>
