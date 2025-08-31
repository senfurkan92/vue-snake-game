export function getTileDetail() {
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

  const widthTileSide = (width - borderW) / cols;
  const heightTileSide = (height - borderH) / rows;
  const tileSide = Math.round(
    [widthTileSide, heightTileSide].reduce((a, b) => (a < b ? a : b))
  );

  const widthEven = cols % 2;
  const heightEven = rows % 2;

  const widthStartPoint = Math.round(
    width / 2 - (cols / 2) * tileSide - (widthEven ? tileSide / 2 : 0)
  );
  const heightStartPoint =
    Math.round(
      height / 2 - (rows / 2) * tileSide - (heightEven ? tileSide / 2 : 0)
    ) +
    borderHT / 2;

  const points = [];

  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      points.push({
        corner: {
            w: widthStartPoint + c * tileSide,
            h: heightStartPoint + r * tileSide,
        },
        center: {
            w: widthStartPoint + c * tileSide + tileSide / 2,
            h: heightStartPoint + r * tileSide  + tileSide / 2,
        }
      });
    }
  }

  return [tileSide, points];
}
