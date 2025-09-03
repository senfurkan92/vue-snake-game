<script setup>
import { ref } from "vue";
import { useGameStore } from "../stores/gameStore";

const gameStore = useGameStore();

const play = () => {
    gameStore.setStatePlay()
}
</script>

<template>
    <div class="flex flex-col gap-4 h-screen justify-center items-center">
        <div class="font-extrabold text-6xl underline"><i>The Dangerous Snake</i></div>
        <div>
            <fieldset class="fieldset">
                <legend class="fieldset-legend text-lg">Difficulty</legend>
                <select class="select select-lg select-info" v-model="gameStore.difficulty" style="width: 300px;">
                    <option v-for="d in gameStore.difficulties" :key="d" :value="d">{{ d }}</option>
                </select>
            </fieldset>
        </div>
        <div>
            <fieldset class="fieldset">
                <legend class="fieldset-legend text-lg">Size</legend>
                <select class="select select-lg select-info" v-model="gameStore.size" style="width: 300px;">
                    <option v-for="s in gameStore.sizes" :key="s" :value="s">{{ s }}</option>
                </select>
            </fieldset>
        </div>
        <div class="mt-4">
            <button class="btn btn-success btn-lg text-white" @click="play" style="width: 300px;" :disabled="!gameStore.difficulty">Start</button>
        </div>
    </div>
</template>

<style scoped></style>
