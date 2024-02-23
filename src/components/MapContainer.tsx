import { useState } from "react";
import Map, { Source, Layer, LngLatBoundsLike, LngLat } from "react-map-gl";
import FeaturePopup from "./FeaturePopup";
import { mapboxAccessToken } from "@/config";
import jeniData from "@/data/jeniData.json";
import laCountyData from "@/data/laCountyData.json";
import { OPACITY, getMapboxExpression } from "@/util/choropleth";
import { JeniFeature, JeniData, LaCountyData } from "@/util/types";

type Props = {
  showFeature: React.Dispatch<React.SetStateAction<JeniFeature | null>>;
  dataKey: string;
};

const dataKeys = ["jenipctl", "riskpctl", "driverspctl", "systempctl"];

export default function MapContainer({ showFeature, dataKey }: Props) {
  const [highlightedFeature, setHighlightedFeature] =
    useState<JeniFeature | null>(null);
  const [popupFeature, setPopupFeature] = useState<JeniFeature | null>(null);
  const [popupLngLat, setPopupLngLat] = useState<LngLat | null>(null);

  const bounds = [
    [-118.96470304698102, 34.84330415665878],
    [-117.62638597948208, 33.68467437223894],
  ] as LngLatBoundsLike;

  function handleClick(event: mapboxgl.MapLayerMouseEvent) {
    if (event.features?.length) {
      const feature = event.features[0] as unknown as JeniFeature;
      showFeature(feature);
      setHighlightedFeature(feature);
    }
  }

  function handleMouseMove(event: mapboxgl.MapLayerMouseEvent) {
    if (event.features?.length) {
      const feature = event.features[0] as unknown as JeniFeature;
      setPopupFeature(feature);
      setPopupLngLat(event.lngLat);
    }
  }

  function handleMouseLeave() {
    setPopupLngLat(null);
  }

  return (
    <Map
      mapboxAccessToken={mapboxAccessToken}
      initialViewState={{ bounds }}
      mapStyle="mapbox://styles/mapbox/light-v11"
      interactiveLayerIds={dataKeys.map((key) => `${key}-features`)}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
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
      {highlightedFeature && (
        <Source
          id="highlighted-feature"
          type="geojson"
          data={highlightedFeature}
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
              visibility: "visible",
            }}
          />
        </Source>
      )}
      {popupFeature && popupLngLat && (
        <FeaturePopup
          lngLat={popupLngLat}
          dataKey={dataKey}
          feature={popupFeature}
        />
      )}
    </Map>
  );
}
