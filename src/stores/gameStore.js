import { ref } from "vue";

export const useGameStore = defineStore("game", () => {
  const score = ref(0);
  const difficulty = ref(5);
  const state = ref(1);

  const getSnakeSpeed = () => 1000 - difficulty.value * 100

  const increaseScore = () => score.value += difficulty.value 

  const begin = () => state.value = 2

  return { score, difficulty, state };
});
