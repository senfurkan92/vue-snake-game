<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useTileStore } from "../stores/tileStore";
import { useSnakeStore } from "../stores/snakeStore";

const snakeStore = useSnakeStore();
const tileStore = useTileStore();

const preyPoint = ref()

function putPrey() {
  if (preyPoint.value) return

  let availablePoints = tileStore.points.filter(x => !snakeStore.points.some(xx => x.position.col == xx.position.col && x.position.row == xx.position.row))

  if (availablePoints.length > 0) {
    const randomIndex = Math.floor(Math.random() * availablePoints.length);
    preyPoint.value = availablePoints[randomIndex];
  }
}

onMounted(() => {
  putPrey()
})

onUnmounted(() => {

})
</script>

<template>
  <div v-if="preyPoint" class="prey" :style="{
    height: `${tileStore.tileSize * 0.7}px`,
    width: `${tileStore.tileSize * 0.7}px`,
    left: `${preyPoint.center.w}px`,
    top: `${preyPoint.center.h}px`,
  }"></div>
</template>

<style scoped>
.prey {
  position: absolute;
  background-color: red;
  border-radius: 100%;
  transform: translate(-50%, -50%);
  border: 0 solid black;
}
</style>
