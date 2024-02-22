import { useState } from "react";
import Map, { Source, Layer, LngLatBoundsLike } from "react-map-gl";
import { mapboxAccessToken } from "@/config";
import jeniData from "@/data/jeniData.json";
import laCountyData from "@/data/laCountyData.json";
import { OPACITY, getMapboxExpression } from "@/util/choropleth";
import { Feature, JeniData, LaCountyData } from "@/util/types";

type MapContainerProps = {
  showFeature: React.Dispatch<React.SetStateAction<Feature | null>>;
  dataKey: string;
};

const dataKeys = ["jenipctl", "riskpctl", "driverspctl", "systempctl"];

export default function MapContainer({
  showFeature,
  dataKey,
}: MapContainerProps) {
  const [highlightedFeature, setHighlightedFeature] = useState<Feature | null>(
    null
  );

  const bounds = [
    [-118.94470304698102, 34.82330415665878],
    [-117.64638597948208, 33.70467437223894],
  ] as LngLatBoundsLike;

  const handleClick = (event: mapboxgl.MapLayerMouseEvent) => {
    if (event.features?.length) {
      const feature = event.features[0];
      showFeature(feature);
      setHighlightedFeature(feature);
    }
  };

  return (
    <Map
      mapboxAccessToken={mapboxAccessToken}
      initialViewState={{ bounds }}
      mapStyle="mapbox://styles/mapbox/light-v11"
      style={{ height: "100%" }}
      interactiveLayerIds={dataKeys.map((key) => `${key}-features`)}
      onClick={handleClick}
    >
      <Source
        id="la-county-feature"
        type="geojson"
        data={laCountyData as LaCountyData}
      >
        <Layer
          id="la-county-feature"
          type="line"
          source="la-county-feature"
          paint={{ "line-width": 2 }}
        />
      </Source>
      <Source id="jeni-features" type="geojson" data={jeniData as JeniData}>
        {dataKeys.map((key) => (
          <Layer
            key={key}
            id={`${key}-features`}
            type="fill"
            source="jeni-features"
            paint={{
              "fill-color": getMapboxExpression(key),
              "fill-opacity": OPACITY,
              "fill-outline-color": "black",
            }}
            layout={{
              visibility: key === dataKey ? "visible" : "none",
            }}
          />
        ))}
      </Source>
      <Source
        id="highlighted-feature"
        type="geojson"
        data={highlightedFeature || undefined}
      >
        <Layer
          id="jeni-feature-highlight"
          type="line"
          source="highlighted-feature"
          paint={{
            "line-color": "white",
            "line-width": 3,
          }}
          layout={{
            visibility: highlightedFeature ? "visible" : "none",
          }}
        />
      </Source>
    </Map>
  );
}
