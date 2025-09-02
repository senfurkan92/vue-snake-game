<script setup>
import welcome from './components/Welcome.vue';
import gameOver from './components/GameOver.vue';
import tileManager from './components/TileManager.vue';
import snake from './components/Snake.vue';
import prey from './components/Prey.vue';
</script>

<template>
  <div v-if="true">
    <welcome></welcome>
  </div>
  <div v-else-if="false">
    <tile-manager></tile-manager>
    <snake></snake>
    <prey></prey>
  </div>
  <div v-else-if="false">
    <game-over></game-over>
  </div>
</template>