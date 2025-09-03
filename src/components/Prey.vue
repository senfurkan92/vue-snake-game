<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useTileStore } from "../stores/tileStore";
import { usePreyStore } from "../stores/preyStore";

const preyStore = usePreyStore();
const tileStore = useTileStore();

onMounted(() => {

})

onUnmounted(() => {

})
</script>

<template>
  <div v-if="preyStore.point" class="prey" :style="{
    height: `${tileStore.tileSize * 0.5}px`,
    width: `${tileStore.tileSize * 0.5}px`,
    left: `${preyStore.point.center.w}px`,
    top: `${preyStore.point.center.h}px`,
  }"></div>
</template>

<style scoped>
.prey {
  position: absolute;
  background-color: red;
  border-radius: 100%;
  transform: translate(-50%, -50%);
  border: 0 solid black;
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.3);
    opacity: 0.6;
  }
}
</style>
