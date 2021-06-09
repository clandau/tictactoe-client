<template>
  <v-container>
    <v-layout wrap>
      <v-flex xs12 class="mb-5">
        <v-container grid-list-xs>
          <v-layout v-for="(row, y) of boardState" :key="y">
            <div v-for="(val, x) of boardState[y]" :key="y + x" @mouseup="handleChoice(y, x, val)" class="cell">
              <p>{{ val }}</p>
            </div>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "GameBoard",
  props: {
    boardState: {
      type: Array,
      required: true,
    },
  },
  methods: {
    handleChoice(y, x, val) {
      console.log(y, x);
      if (val === "") {
        this.$emit("choice", { y, x })
      }
    },
  },
};
</script>

<style scoped>
.board .cell:last-child {
  grid-area: 3/3;
}
.cell {
  outline: 4px solid #000;
  display: flex;
  font-size: 6em;
  font-weight: bold;
  justify-content: center;
  align-items: stretch;
  width: 150px;
  height: 150px;
}
</style>
