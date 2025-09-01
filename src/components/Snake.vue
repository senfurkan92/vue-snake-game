<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useTileStore } from "../stores/tileStore";

const tileStore = useTileStore();

const snakeQueue = ref([...tileStore.points.slice(0, 3).reverse()])
const direction = ref(0)

function continuousMovement() {
  setTimeout(() => {
    setInterval(() => {
      let { col, row } = snakeQueue.value[0].position

      if (direction.value == 0) col++
      else if (direction.value == 90) row--
      else if (direction.value == 180) col--
      else if (direction.value == 270) row++

      let nextPoint = tileStore.points.find(x => x.position.col == col && x.position.row == row)

      if (nextPoint) {
        snakeQueue.value = [nextPoint, ...snakeQueue.value.slice(0, snakeQueue.value.length - 1)]
      }
    }, 100)
  }, 1000)
}

function getRealDirection() {
  const {col: headCol, row: headRow} = snakeQueue.value[0].position
  const {col: neckCol, row: neckRow} = snakeQueue.value[1].position

  if (headCol > neckCol && headRow == neckRow) 
    return 0
  else if (headCol < neckCol && headRow == neckRow) 
    return 180
  else if (headCol == neckCol && headRow > neckRow) 
    return 270
  else if (headCol == neckCol && headRow < neckRow) 
    return 90
}

function alterDirection(e) {
  const realDirection = getRealDirection()

  if (realDirection != 180 && (e.key === "ArrowRight" || e.key === "d")) {
    direction.value = 0;
  } else if (realDirection != 270 && (e.key === "ArrowUp" || e.key === "w")) {
    direction.value = 90;
  } else if (realDirection != 0 && (e.key === "ArrowLeft" || e.key === "a")) {
    direction.value = 180;
  } else if (realDirection != 90 && (e.key === "ArrowDown" || e.key === "s")) {
    direction.value = 270;
  }
}

onMounted(() => {
  continuousMovement()

  window.addEventListener("keydown", alterDirection);
})
</script>

<template>
  <template v-for="(p, i) in snakeQueue" :key="i">
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
