<template>
  <v-container class="text-center" style="max-width: 500px">
    <v-layout>
      <v-flex xs12 class="mb-5">
        <v-container grid-list-xs class="board">
          <v-layout v-for="(row, y) of boardState" :key="y">
            <div v-for="(val, x) of boardState[y]" :key="y + x" @mouseup="handleChoice(y, x, val)" class="cell" :class="'row-' + y">
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
      if (val === "") {
        this.$emit("choice", { y, x })
      }
    },
  },
};
</script>

<style scoped>
.cell {
  display: flex;
  font-size: 6em;
  font-weight: bold;
  justify-content: space-evenly;
  align-items: stretch;
  width: 150px;
  height: 150px;
}

.cell:nth-of-type(1) {
  border-right: 6px solid black;
}
.cell:nth-of-type(3) {
  border-left: 6px solid black;
}

.row-0 {
  border-bottom: 6px solid black;
}
.row-1 {
  border-bottom: 6px solid black;
}


</style>
