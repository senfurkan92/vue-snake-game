<script setup>
import { ref } from "vue";
import { useTileStore } from "../stores/tileStore";

const tileStore = useTileStore();

const snakeQueue = ref([...tileStore.points.slice(0,75).reverse()])
const direction = ref(0)

setTimeout(() => {
    setInterval(() => {
        let {col, row} = snakeQueue.value[0].position
        
        if (direction.value==0) col++
        else if (direction.value==90) row--
        else if (direction.value==180) col--
        else if (direction.value==270) row++
    
        let nextPoint = tileStore.points.find(x => x.position.col == col && x.position.row == row)

        if (nextPoint){
            snakeQueue.value = [nextPoint, ...snakeQueue.value.slice(0, snakeQueue.value.length - 1)]
        } else {
            if (direction.value==0) direction.value = 270
            else if (direction.value==90) direction.value = 0
            else if (direction.value==180) direction.value = 90
            else if (direction.value==270) direction.value = 180
        }
    }, 10)
}, 1000)
</script>

<template>
  <template v-for="(p, i) in snakeQueue" :key="i">
    <div
      class="snake"
      :style="{
        background: i == 0 ? 'green' : 'blue',
        height: `${tileStore.tileSize * 0.85}px`,
        width: `${tileStore.tileSize * 0.85}px`,
        left: `${p.center.w}px`,
        top: `${p.center.h}px`,
      }"
    ></div>
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
