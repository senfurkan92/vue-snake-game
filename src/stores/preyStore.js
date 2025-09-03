import { ref } from "vue";
import { defineStore } from "pinia";
import { useTileStore } from "./tileStore";
import { useSnakeStore } from "./snakeStore";

export const usePreyStore = defineStore("prey", () => {
  const snakeStore = useSnakeStore();
  const tileStore = useTileStore();

  const point = ref(null);
  const available = ref(true);

  const readyToPlay = () => {
    point.value = null;
    available.value = true;

    putPrey()
  }

  const putPrey = () => {
    if (point.value || !available) return;

      let availablePoints = tileStore.points.filter(
        (x) =>
          !snakeStore.points.some(
            (xx) =>
              x.position.col == xx.position.col &&
              x.position.row == xx.position.row
          )
      );

      if (availablePoints.length < 1) {
        available.value = false;
        return;
      }

      const randomIndex = Math.floor(Math.random() * availablePoints.length);
      point.value = availablePoints[randomIndex];
  };

  const beEaten = () => {
    point.value = null;
    putPrey();
  };

  return { point, readyToPlay, beEaten };
});
