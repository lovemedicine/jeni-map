import { useEffect, useState, memo } from "react";
import { buildMap, showJeniLayer } from "@/map.js";
import { Feature } from "@/components/Feature.tsx";

type GeoData = {
  features: Feature[];
};

type MapProps = {
  jeniData: GeoData;
  laCountyData: GeoData;
  showFeature: (feature: Feature) => void;
  dataKey: string;
};

const Map = memo(function ({
  jeniData,
  laCountyData,
  showFeature,
  dataKey,
}: MapProps) {
  const [map, setMap] = useState(null);

  useEffect(() => {
    buildMap({
      jeniData,
      laCountyData,
      containerId: "map",
      optionsId: "data-selector",
      showFeature,
    }).then(setMap);
  }, []);

  useEffect(() => {
    if (map) {
      showJeniLayer(map, dataKey);
    }
  }, [dataKey]);

  return <div id="map" style={{ height: "100%" }}></div>;
});

export default Map;
