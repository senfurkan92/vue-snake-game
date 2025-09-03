import { computed, ref } from "vue";
import { defineStore } from "pinia";

export const useGameStore = defineStore("game", () => {
  const score = ref(0);
  const difficulty = ref(5);
  const difficulties = ref([5,6,7,8,9,10]);
  const size = ref(400)
  const sizes = ref([200,300,400,500,600])
  const state = ref(1);

  const snakeSpeed = computed(() => 1100 - difficulty.value * 100);

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
    difficulties,
    size,
    sizes,
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
