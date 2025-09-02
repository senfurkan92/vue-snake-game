<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useTileStore } from "../stores/tileStore";
import { useSnakeStore } from "../stores/snakeStore";

const snakeStore = useSnakeStore();
const tileStore = useTileStore();

function getSnakePart(point) {
  let realDirection = snakeStore.getRealDirection()
  let index = snakeStore.points.indexOf(point)
  let direction = ''
  let part = ''

  if (index === 0 || index === snakeStore.points.length-1) {
    part = index === 0 ? 'head' : 'tail'

    if (realDirection == 0) direction = 'r'
    else if (realDirection == 90) direction = 'u'
    else if (realDirection == 180) direction = 'l'
    else if (realDirection == 270) direction = 'd'

  } else {
    let frontPoint = snakeStore.points.at(index - 1)
    let backPoint = snakeStore.points.at(index + 1)
    
    if (backPoint.position.col != frontPoint.position.col && backPoint.position.row != frontPoint.position.row) {
      part = 'corner'

      if (backPoint.position.col < frontPoint.position.col && backPoint.position.row < frontPoint.position.row) direction = "rd"
      else if (backPoint.position.col < frontPoint.position.col && backPoint.position.row > frontPoint.position.row) direction = "ru"
      else if (backPoint.position.col > frontPoint.position.col && backPoint.position.row < frontPoint.position.row) direction = "ld"
      else if (backPoint.position.col > frontPoint.position.col && backPoint.position.row > frontPoint.position.row) direction = "lu"

    } else {
      part = 'body'
      direction = frontPoint.position.row === backPoint.position.row ? "r" : "u"
    }
  }
  console.log(`/snake/${part}-${direction}.png`)

  return `/snake/${part}-${direction}.png`
}

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
      height: `${tileStore.tileSize * 1}px`,
      width: `${tileStore.tileSize * 1}px`,
      left: `${p.center.w}px`,
      top: `${p.center.h}px`,
    }">
    <img :src="getSnakePart(p)" style="height: 100%; width: 100%; object-fit: contain;">
  </img>  
  </div>
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
