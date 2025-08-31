<script setup>
import { ref } from "vue";
import { useTileStore } from "../stores/tileStore";

const tileStore = useTileStore();

const snakeQueue = ref(tileStore.points.slice(0, 3).reverse());
</script>

<template>
  <div style="position: relative;">
    <template v-for="(q, i) in snakeQueue" :key="i"> 
        <div class="snake" :style="{
                height: `${tileStore.tileSize * .9}px`,
                width: `${tileStore.tileSize * .9}px`,
                left: `${q.center.w}px`,
                top: `${q.center.h}px`
            }">
            </div>
    </template>
  </div>
</template>

<style scoped>
.snake {
  position: absolute;
  border-radius: 5px;
  transform: translate(-50%, -50%);
}

.snake:first-child {
  background-color: green;
}

.snake:not(:first-child) {
  background-color: lightgreen;
}
</style>
