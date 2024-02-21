import { useEffect } from "react";
import { buildMap } from "@/map";

export default function Map() {
  useEffect(() => {
    buildMap({ containerId: "map", optionsId: "data-selector" });
  });

  return <div id="map" style={{ height: "100%" }}></div>;
}
