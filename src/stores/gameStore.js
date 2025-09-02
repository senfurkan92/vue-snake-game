import { computed, ref } from "vue";
import { defineStore } from "pinia";

export const useGameStore = defineStore("game", () => {
  const score = ref(0);
  const difficulty = ref(5);
  const state = ref(1);

  const snakeSpeed = computed(() => 1000 - difficulty.value * 100);

  const setStateWelcome = () => (state.value = 1);

  const setStatePlay = () => (state.value = 2);

  const setStatePause = () => (state.value = 3);

  const setStateOver = () => (state.value = 4);

  const setDifficulty = (v) =>
    (difficulty.value = Math.min(Math.max(v, min), max));

  const increaseScore = () => (score.value += difficulty.value);

  const resetScore = () => (score.value = 0);

  return {
    score,
    difficulty,
    state,
    snakeSpeed,
    setStateWelcome,
    setStatePlay,
    setStatePause,
    setStateOver,
    setDifficulty,
    increaseScore,
    resetScore
  };
});
