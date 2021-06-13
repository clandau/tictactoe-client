<template>
  <v-container fluid class="pa-10 ma-3 text-center">
    <v-row v-if="state">
      <v-col>
        <p v-if="error">{{ error }}</p>
        <v-alert
          v-if="playerWon"
          icon="mdi-trophy"
          type="success"
          style="font-size: 24px"
          >You won!</v-alert
        >
        <v-alert
          v-if="draw"
          color="pink darken-1 white--text"
          style="font-size: 24px"
          >Draw.</v-alert
        >
        <v-alert v-if="playerLost" type="error" style="font-size: 24px"
          >You lost.</v-alert
        ></v-col
      > </v-row
    ><v-row
      ><v-col>
        <h1 class="text-h2 my-4" v-if="state && state.status !== 'complete'">
          {{ turnText }}
        </h1>
        <GameBoard
          v-if="state"
          :boardState="state.board"
          v-on="{ choice: handleCellChoice }"
        />
      </v-col>
    </v-row>
    <v-row v-if="waitingForGamePartner">
      <h2 class="text-h2 my-4">Awaiting a game partner...</h2>
      <v-progress-linear
        indeterminate
        color="indigo darken-3"
      ></v-progress-linear>
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
      error: null,
    };
  },
  async created() {
    this.user = auth.currentUser;
    const token = await this.user.getIdToken();
    const url =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://peaceful-temple-46739.herokuapp.com/api/newUser";
    this.socket = io(url, {
      auth: {
        token,
        uid: this.user.uid,
      },
    });
    this.socket.on("connect_error", (err) => {
      console.error(err);
      alert(`Server error.`);
      this.socket.disconnect();
      return this.$router.push("/dashboard");
    });
    this.socket.emit("newGame", { twoPlayer: this.twoPlayer });
    this.socket.on("currentState", this.handleState);
    this.socket.on("waitingPartner", this.handleWaiting);
    this.socket.on("playerLeft", this.handlePlayerLeft);
  },

  computed: {
    turnText() {
      return this.state.turn === this.player
        ? "Your turn"
        : `${this.state.turn}'s turn`;
    },
    playerWon() {
      return (
        this.state?.status === "complete" &&
        this.state?.winner === this.user.uid
      );
    },
    playerLost() {
      return (
        this.state?.status === "complete" &&
        this.state?.winner !== "draw" &&
        this.state?.winner !== this.user.uid
      );
    },
    draw() {
      return this.state?.status === "complete" && this.state?.winner === "draw";
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
      if (
        this.state.status === "incomplete" &&
        this.player === this.state.turn
      ) {
        this.socket.emit("playerMove", coordinates);
      }
    },
    handleWaiting() {
      this.waitingForGamePartner = true;
    },

    handlePlayerLeft() {
      alert("Player left game.");
      this.error = "Player left game.";
      this.socket.disconnect();
    },
  },
  beforeRouteLeave(to, from, next) {
    // disconnect from socket when navigate away from route
    if (
      this.state?.status === "incomplete" &&
      confirm("Do you wish to leave your game?")
    ) {
      this.socket.disconnect();
      next();
    } else if (this.state?.status === "complete" || this.waitingForGamePartner) {
      this.socket.disconnect();
      next();
    } else next();
  },
};
</script>

<style lang="scss" scoped></style>
