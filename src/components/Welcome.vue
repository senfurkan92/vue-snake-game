<script setup>
import { ref } from "vue";
import { useGameStore } from "../stores/gameStore";

const gameStore = useGameStore();

const play = () => {
  gameStore.setStatePlay()
}
</script>

<template>
  <div>Welcome My Friend !!!</div>
  <br/>
  <div>
    <label>Difficulty</label>
    <br/>
    <select v-model="gameStore.difficulty" >
      <option v-for="i in 5" :key="i" :value="i + 4">{{ i + 4 }}</option>
    </select>
    <br/>
    <button @click="play">Start</button>
  </div>
</template>

<style scoped></style>
