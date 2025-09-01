import { ref } from "vue";
import { defineStore } from "pinia";
import { useTileStore } from "./tileStore";

export const useSnakeStore = defineStore("snake", () => {
  const tileStore = useTileStore();

  const points = ref([...tileStore.points.slice(0, 3).reverse()]);
  const direction = ref(0);

  const continuousMovement = () => {
    setTimeout(() => {
      setInterval(() => {
        let { col, row } = points.value[0].position;

        if (direction.value == 0) col++;
        else if (direction.value == 90) row--;
        else if (direction.value == 180) col--;
        else if (direction.value == 270) row++;

        let nextPoint = tileStore.points.find(
          (x) => x.position.col == col && x.position.row == row
        );

        if (nextPoint) {
          points.value = [
            nextPoint,
            ...points.value.slice(0, points.value.length - 1),
          ];
        }
      }, 100);
    }, 1000);
  };

  const getRealDirection = () => {
    const { col: headCol, row: headRow } = points.value[0].position;
    const { col: neckCol, row: neckRow } = points.value[1].position;

    if (headCol > neckCol && headRow == neckRow) return 0;
    else if (headCol < neckCol && headRow == neckRow) return 180;
    else if (headCol == neckCol && headRow > neckRow) return 270;
    else if (headCol == neckCol && headRow < neckRow) return 90;
  };

  const alterDirection = (e) => {
    const realDirection = getRealDirection();

    if (realDirection != 180 && (e.key === "ArrowRight" || e.key === "d")) {
      direction.value = 0;
    } else if (realDirection != 270 && (e.key === "ArrowUp" || e.key === "w")) {
      direction.value = 90;
    } else if (realDirection != 0 && (e.key === "ArrowLeft" || e.key === "a")) {
      direction.value = 180;
    } else if (realDirection != 90 && (e.key === "ArrowDown" || e.key === "s")) {
      direction.value = 270;
    }
  };

  return { points, direction, continuousMovement, alterDirection };
});
