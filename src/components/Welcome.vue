<script setup>
import { ref } from "vue";
import { useGameStore } from "../stores/gameStore";

const gameStore = useGameStore();

const play = () => {
    gameStore.setStatePlay()
}
</script>

<template>
    <div class="flex flex-col gap-5 h-screen justify-center items-center">
        <div class="font-extrabold text-6xl underline"><i>Dangerous Snake</i></div>
        <div>
            <fieldset class="fieldset">
                <legend class="fieldset-legend text-lg">Difficulty</legend>
                <select class="select select-lg select-info" v-model="gameStore.difficulty" style="width: 300px;">
                    <option v-for="i in 5" :key="i" :value="i + 4">{{ i + 4 }}</option>
                </select>
            </fieldset>
        </div>
        <div>
            <button class="btn btn-success btn-lg text-white" @click="play" style="width: 300px;" :disabled="!gameStore.difficulty">Start</button>
        </div>
    </div>
</template>

<style scoped></style>
