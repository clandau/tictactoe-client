<template>
  <div></div>
</template>

<script>
const io = require("socket.io-client");

export default {
  name: "GamePage",
  props: {
    twoPlayer: {
      type: Boolean,
    },
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
    },
  },
};
</script>

<style lang="scss" scoped></style>
