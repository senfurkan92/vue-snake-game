import { defineStore } from "pinia";

let tileSize = null;
let points = null;

function getTileDetail() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const spacePercent = 20;

  const borderSpaceWitdhConstant = width / spacePercent;
  const borderSpaceHeightConstant = height / spacePercent;

  const tileCount = 488;
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
  const heightStartPoint =
    Math.round(
      height / 2 - (rows / 2) * tileSize - (heightEven ? tileSize / 2 : 0)
    ) +
    borderHT / 2;

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
            row: r,
            col: c
        }
      });
    }
  }

  return { tileSize, points };
}

export const useTileStore = defineStore("tile", () => {
  if (!tileSize || !points) {
    const detail = getTileDetail();
    tileSize = detail.tileSize;
    points = detail.points;
  }

  return { tileSize, points };
});
