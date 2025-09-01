<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useTileStore } from "../stores/tileStore";
import { useSnakeStore } from "../stores/snakeStore";

const snakeStore = useSnakeStore();
const tileStore = useTileStore();

onMounted(() => {
  snakeStore.continuousMovement()

  window.addEventListener("keydown", snakeStore.alterDirection);
})

onUnmounted(() => {
  window.removeEventListener("keydown", snakeStore.alterDirection);
})
</script>

<template>
  <template v-for="(p, i) in snakeStore.points" :key="i">
    <div class="snake" :style="{
      background: i == 0 ? 'green' : 'blue',
      height: `${tileStore.tileSize * 0.85}px`,
      width: `${tileStore.tileSize * 0.85}px`,
      left: `${p.center.w}px`,
      top: `${p.center.h}px`,
    }"></div>
  </template>
</template>

<style scoped>
.snake {
  position: absolute;
  border-radius: 5%;
  transform: translate(-50%, -50%);
  border: 0 solid black;
}
</style>
