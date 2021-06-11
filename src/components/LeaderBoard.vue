<template>
  <v-card class="mx-auto">
    <v-card-title class="text-h5 pb-2">Leader Board</v-card-title>
    <div class="py-2 px-8">
      <ol>
        <li v-for="w of winners" :key="w.email">
          <p>{{ w.email }}<b>{{`    Wins: ${w.count}`}}</b></p>
        </li>
      </ol>
    </div>
  </v-card>
</template>

<script>
import { auth } from "@/firebaseConfig";
  export default {
    name: "LeaderBoard",
    data() {
      return {
        winners: null,
        url: "https://peaceful-temple-46739.herokuapp.com/api/wins",
      }
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
          }
        })
        this.winners = await res.json();
      } catch (err) {
        console.error(err);
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>