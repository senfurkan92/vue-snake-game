<script setup>
import welcome from './components/Welcome.vue';
import gameOver from './components/GameOver.vue';
import tileManager from './components/TileManager.vue';
import snake from './components/Snake.vue';
import prey from './components/Prey.vue';
import { useGameStore } from './stores/gameStore';
import { ref } from 'vue';

const gameStore = useGameStore()
</script>

<template>
  <div v-if="gameStore.state == 1">
    <welcome></welcome>
  </div>
  <div v-else-if="gameStore.state == 2 || gameStore.state == 3">
    <tile-manager></tile-manager>
    <snake></snake>
    <prey></prey>
  </div>
  <div v-else-if="gameStore.state == 4">
    <game-over></game-over>
  </div>
</template>