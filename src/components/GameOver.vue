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
  <div class="flex flex-col gap-5 h-screen justify-center items-center">
    <div class="font-extrabold text-6xl underline italic">Game Over !!!</div>
    <div>
      <span class="text-2xl font-extrabold">SCORE:</span> <span class="text-2xl">{{ gameStore.score }}</span>
    </div>
    <div>
      <button class="btn btn-success btn-lg text-white" @click="playAgain">Play Again</button>
    </div>
  </div>
  <br />
  <br />
</template>