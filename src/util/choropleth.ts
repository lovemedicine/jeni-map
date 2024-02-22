import { Expression } from "mapbox-gl";

// red = 255 - (1.8 * score)
// green = 255 - (2.55 * score)
// blue = 128 - (1.28 * score)
const RED_MAX = 255;
const RED_FACTOR = 1.8;
const GREEN_MAX = 255;
const GREEN_FACTOR = 2.55;
const BLUE_MAX = 128;
const BLUE_FACTOR = 1.28;

export const OPACITY = 0.8;

export function getMapboxExpression(dataKey: string): Expression {
  return [
    "rgb",
    ["-", RED_MAX, ["*", RED_FACTOR, ["get", dataKey]]],
    ["-", GREEN_MAX, ["*", GREEN_FACTOR, ["get", dataKey]]],
    ["-", BLUE_MAX, ["*", BLUE_FACTOR, ["get", dataKey]]],
  ];
}

export function getRgbaFromPercentile(percentile: number) {
  const red = prepareRgbaValue(RED_MAX - RED_FACTOR * percentile);
  const green = prepareRgbaValue(GREEN_MAX - GREEN_FACTOR * percentile);
  const blue = prepareRgbaValue(BLUE_MAX - BLUE_FACTOR * percentile);

  return `rgba(${red}, ${green}, ${blue}, ${OPACITY})`;
}

function prepareRgbaValue(value: number) {
  return Math.min(255, Math.max(0, Math.round(value)));
}
