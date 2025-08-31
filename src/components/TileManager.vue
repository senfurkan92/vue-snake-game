<script setup>
import { ref } from "vue";
import { useTileStore } from "../stores/tileStore";

const tileStore = useTileStore();
</script>

<template>
  <template v-for="(p, i) in tileStore.points" :key="i">
    <div
      class="tile"
      :style="{
        height: `${tileStore.tileSize}px`,
        width: `${tileStore.tileSize}px`,
        left: `${p.center.w}px`,
        top: `${p.center.h}px`,
      }"
    ></div>
  </template>
</template>

<style scoped>
.tile {
  position: absolute;
  background-color: beige;
  border-radius: 0;
  transform: translate(-50%, -50%);
  border: 0.5px solid black;
}
</style>
