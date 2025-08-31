<script setup>
import { ref } from 'vue'
import { getTileDetail } from '../assets/tile-calc';

const [tileSide, points] = getTileDetail()
</script>

<template>
    <div style="position: relative;">
        <template v-for="p, i in points" :key="i">
            <div class="tile" :style="{
                height: `${tileSide}px`,
                width: `${tileSide}px`,
                left: `${p.corner.w}px`,
                top: `${p.corner.h}px`
            }">
            </div>
            <div class="center" :style="{
                height: `${tileSide}px`,
                width: `${tileSide}px`,
                left: `${p.center.w - tileSide/2}px`,
                top: `${p.center.h - tileSide/2}px`
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
}
</style>