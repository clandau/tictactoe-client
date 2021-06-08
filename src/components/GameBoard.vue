<template>
  <div class="board-container">
    <div class="board">
      <div class="cell">X</div>
      <div class="cell"></div>
      <div class="cell"></div>
      <div class="cell"></div>
      <div class="cell">O</div>
      <div class="cell"></div>
      <div class="cell"></div>
      <div class="cell"></div>
      <div class="cell"></div>
    </div>
  </div>
</template>

<script>
const io = require("socket.io-client");
export default {
  created() {
    const socket = io("http://localhost:3000");
    socket.on("init", (data) => {
      console.log(data);
    });
  },
};
</script>

<style scoped>
.board-container {
}
.board {
  width: 500px;
  height: 500px;
  margin: 0 auto;
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-rows: 1fr;
  overflow: hidden;
}
.board .cell {
  outline: 4px solid #000;
  display: flex;
  font-size: 6em;
  font-weight: bold;
  justify-content: center;
  align-items: center;
}
.board .cell:last-child {
  grid-area: 3/3;
}
.cell {
}
</style>
