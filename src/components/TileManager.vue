<script setup>
import { ref } from 'vue'
import { useTileStore } from '../stores/tileStore';

const tileStore = useTileStore()
</script>

<template>
    <div style="position: relative;">
        <template v-for="p, i in tileStore.points" :key="i">
            <div>{{ tileStore.tş }}</div>
            <div class="tile" :style="{
                height: `${tileStore.tileSize}px`,
                width: `${tileStore.tileSize}px`,
                left: `${p.corner.w}px`,
                top: `${p.corner.h}px`
            }">
            </div>
            <div class="center" :style="{
                height: `${.5}px`,
                width: `${.5}px`,
                left: `${p.center.w}px`,
                top: `${p.center.h}px`
            }">
            </div>
        </template>
    </div>
</template>

<style scoped>
.tile {
    position: absolute;
    background-color: beige;
    border: 0.5px solid black;
}

.center {
    position: absolute;
    background-color: chocolate;
    border-radius: 100%;
    transform: translate(-50%, -50%)
}
</style>