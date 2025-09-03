import { defineStore } from "pinia";
import { useGameStore } from "./gameStore";
import { ref } from "vue";

export const useTileStore = defineStore("tile", () => {
  const gameStore = useGameStore();

  const tileSize = ref(null);
  const points = ref(null);

  const getDeviceType = () => {
    const ua = navigator.userAgent;

    if (/Tablet|iPad/i.test(ua)) return 'mobile';
    if (/Mobi|Android/i.test(ua)) return 'mobile';
    if (window.innerWidth <= 768) return 'mobile';
    if (window.innerWidth <= 1024) return 'mobile';
    return 'desktop';
  }

  const setTiles = () => {
    const width = window.innerWidth;
    const height = window.innerHeight - (getDeviceType() == 'mobile' ? 80 : 0);
    const spacePercent = 20;

    const borderSpaceWitdhConstant = width / spacePercent;
    const borderSpaceHeightConstant = height / spacePercent;

    const tileCount = gameStore.size;
    const borderWL = borderSpaceWitdhConstant;
    const borderWR = borderSpaceWitdhConstant;
    const borderHT = borderSpaceHeightConstant * 2.5;
    const borderHB = borderSpaceHeightConstant;
    const borderW = borderWL + borderWR;
    const borderH = borderHT + borderHB;

    const cols = Math.round(Math.sqrt(tileCount * (width / height)));
    const rows = Math.round(tileCount / cols);

    const widthTileSize = (width - borderW) / cols;
    const heightTileSize = (height - borderH) / rows;
    const tileSize = Math.round(
      [widthTileSize, heightTileSize].reduce((a, b) => (a < b ? a : b))
    );

    const widthEven = cols % 2;
    const heightEven = rows % 2;

    const widthStartPoint = Math.round(
      width / 2 - (cols / 2) * tileSize - (widthEven ? tileSize / 2 : 0)
    );

    const heightStartPoint = 50;

    const points = [];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        points.push({
          corner: {
            w: widthStartPoint + c * tileSize,
            h: heightStartPoint + r * tileSize,
          },
          center: {
            w: widthStartPoint + c * tileSize + tileSize / 2,
            h: heightStartPoint + r * tileSize + tileSize / 2,
          },
          position: {
            col: c,
            row: r,
          },
        });
      }
    }

    return { tileSize, points };
  }

  const readyToPlay = () => {
    const result = setTiles();

    tileSize.value = result.tileSize;
    points.value = result.points;
  };

  return { tileSize, points, readyToPlay, getDeviceType };
});
