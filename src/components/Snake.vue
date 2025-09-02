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

  if (index === 0) {
    part = 'head'

    if (realDirection == 0) direction = 'r'
    else if (realDirection == 90) direction = 'u'
    else if (realDirection == 180) direction = 'l'
    else if (realDirection == 270) direction = 'd'
  
  } else if (index === snakeStore.points.length - 1) {
    part = 'tail'

    let fp = snakeStore.points.at(index - 1)

    if (point.position.row == fp.position.row) {
      if (point.position.col > fp.position.col) direction = 'l'
      else direction = 'r'
    } else {
      if (point.position.row > fp.position.row) direction = 'u'
      else direction = 'd'
    }
  } else {
    let fp = snakeStore.points.at(index - 1)
    let bp = snakeStore.points.at(index + 1)

    if (bp.position.col != fp.position.col && bp.position.row != fp.position.row) {
      part = 'corner'

      if (bp.position.row > fp.position.row && bp.position.col < fp.position.col && point.position.col == bp.position.col && point.position.row == fp.position.row) {
        direction = 'dr'
      }
      else if (bp.position.row < fp.position.row && bp.position.col > fp.position.col && point.position.col == fp.position.col && point.position.row == bp.position.row) {
        direction = 'ld'
      }
      else if (bp.position.row < fp.position.row && bp.position.col > fp.position.col && point.position.col == bp.position.col && point.position.row == fp.position.row) {
        direction = 'ul'
      }
      else if (bp.position.row > fp.position.row && bp.position.col < fp.position.col && point.position.col == fp.position.col && point.position.row == bp.position.row) {
        direction = 'ru'
      }
      else if (bp.position.row < fp.position.row && bp.position.col < fp.position.col && point.position.col == bp.position.col && point.position.row == fp.position.row) {
        direction = 'ur'
      }
      else if (bp.position.row > fp.position.row && bp.position.col > fp.position.col && point.position.col == fp.position.col && point.position.row == bp.position.row) {
        direction = 'lu'
      }
      else if (bp.position.row < fp.position.row && bp.position.col < fp.position.col && point.position.col == fp.position.col && point.position.row == bp.position.row) {
        direction = 'rd'
      }
      else if (bp.position.row > fp.position.row && bp.position.col > fp.position.col && point.position.col == bp.position.col && point.position.row == fp.position.row) {
        direction = 'dl'
      }

    } else {
      part = 'body'
      direction = fp.position.row === bp.position.row ? "r" : "u"
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
