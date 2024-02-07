import { buildMap } from "./map.js";
import { showIntro } from "./info.js";

showIntro();

window.addEventListener("load", () => {
  buildMap({ optionsId: "data-selector" });
});
