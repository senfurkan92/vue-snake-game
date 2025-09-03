<script setup>
import { onMounted } from "vue";
import { useGameStore } from "../stores/gameStore";
import { useTileStore } from "../stores/tileStore";
import { useSnakeStore } from "../stores/snakeStore";
import { usePreyStore } from "../stores/preyStore";

const tileStore = useTileStore();
const gameStore = useGameStore();
const snakeStore = useSnakeStore();
const preyStore = usePreyStore()

onMounted(() => {
    tileStore.readyToPlay();
    snakeStore.readyToPlay()
    preyStore.readyToPlay()
})
</script>

<template>
    <div :class="`absolute left-[10%] top-[15px]`">
        <b class="text-lg">SCORE:</b> <span class="text-lg">{{ gameStore.score }}</span>
    </div>
    <div v-if="gameStore.state == 3" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
        <div class="bg-gray-300/50 rounded h-screen w-screen flex justify-center items-center">
            <span class="text-rose-500 font-extrabold text-4xl">PAUSED</span>
        </div>
    </div>
</template>