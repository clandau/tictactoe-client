<template>
  <div class="board-container justify-center">
    <div class="board">
      <div class="cell"><p>{{ boardState[0][0] }}</p></div>
      <div class="cell"><p>{{ boardState[0][1] }}</p></div>
      <div class="cell"><p>{{ boardState[0][2] }}</p></div>
      <div class="cell"><p>{{ boardState[1][0] }}</p></div>
      <div class="cell"><p>{{ boardState[1][1] }}</p></div>
      <div class="cell"><p>{{ boardState[1][2] }}</p></div>
      <div class="cell"><p>{{ boardState[2][0] }}</p></div>
      <div class="cell"><p>{{ boardState[2][1] }}</p></div>
      <div class="cell"><p>{{ boardState[2][2] }}</p></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GameBoard",
  props: {
    boardState: {
      type: Array,
      required: true,
    }
  }
};
</script>

<style scoped>
.board {
  width: 500px;
  height: 500px;
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
