<template>
  <v-container class="pa-10 ma-3">
    <v-row>
      <v-col cols="1"></v-col>
      <v-col cols="10">
        <GameBoard v-if="state" :boardState="state.board"  />
      </v-col>
      <v-col cols="1"></v-col>
    </v-row>
  </v-container>
</template>

<script>
import GameBoard from "@/components/GameBoard"
const io = require("socket.io-client");

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
      // state: { board: [["X", "O", "X"],["X", "O", "X"], ["X", "O", "X"]]},
      state: null,
    }
  },
  created() {
    const socket = io("http://localhost:3000");
    socket.on("init", (data) => {
      console.log(data);
    });
    socket.emit("newGame", { twoPlayer: this.twoPlayer });
    socket.on("currentState", this.handleState);
  },

  methods: {
    handleState(state) {
      console.log(state);
      this.state = state;
    },
  },
};
</script>

<style lang="scss" scoped></style>
