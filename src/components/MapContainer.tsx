import { useState } from "react";
import Map, {
  Source,
  Layer,
  Popup,
  LngLatBoundsLike,
  LngLat,
} from "react-map-gl";
import { mapboxAccessToken } from "@/config";
import jeniData from "@/data/jeniData.json";
import laCountyData from "@/data/laCountyData.json";
import { OPACITY, getMapboxExpression } from "@/util/choropleth";
import { JeniFeature, JeniData, LaCountyData } from "@/util/types";

type MapContainerProps = {
  showFeature: React.Dispatch<React.SetStateAction<JeniFeature | null>>;
  dataKey: string;
};

const dataKeys = ["jenipctl", "riskpctl", "driverspctl", "systempctl"];

export default function MapContainer({
  showFeature,
  dataKey,
}: MapContainerProps) {
  const [highlightedFeature, setHighlightedFeature] =
    useState<JeniFeature | null>(null);
  const [popupFeature, setPopupFeature] = useState<JeniFeature | null>(null);
  const [popupLngLat, setPopupLngLat] = useState<LngLat | null>(null);

  const bounds = [
    [-118.94470304698102, 34.82330415665878],
    [-117.64638597948208, 33.70467437223894],
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
      style={{ height: "100%" }}
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
      {popupFeature && popupLngLat && (
        <PopupForFeature
          lngLat={popupLngLat}
          dataKey={dataKey}
          feature={popupFeature}
        />
      )}
    </Map>
  );
}

type PopForFeatureProps = {
  lngLat: LngLat;
  dataKey: string;
  feature: JeniFeature;
};

function PopupForFeature({ lngLat, dataKey, feature }: PopForFeatureProps) {
  const { lng, lat } = lngLat;
  const fieldName = (
    {
      jenipctl: "JENI (Total)",
      systempctl: "System Involvement",
      driverspctl: "Inequity Drivers",
      riskpctl: "Criminalization Risk",
    } as any
  )[dataKey];
  const { [dataKey]: score, zip, neighborhood } = feature.properties;
  const roundedScore = Math.round((score as number) * 100) / 100;

  return (
    <Popup
      longitude={lng}
      latitude={lat}
      closeButton={false}
      closeOnClick={false}
    >
      <div>
        <strong>{zip}</strong>
      </div>
      <div>{neighborhood}</div>
      <div className="score">{roundedScore}</div>
      <div>{fieldName}</div>
    </Popup>
  );
}
