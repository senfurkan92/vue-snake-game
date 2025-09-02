<script setup>
import { ref } from "vue";
import { useGameStore } from "../stores/gameStore";

const gameStore = useGameStore();

const playAgain = () => {
  gameStore.resetScore()
  gameStore.setStateWelcome()
}
</script>

<template>
  <div>Game Over !!!</div>
  <br />
  <b>SCORE:</b><span>{{ gameStore.score }}</span>
  <br />
  <button @click="playAgain">Play Again</button>
</template>

<style scoped></style>
