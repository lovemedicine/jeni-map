import jeniData from "./data/jeniData.geojson" assert { type: "json" };
import laCountyData from "./data/laCountyData.geojson" assert { type: "json" };
import { showFeature } from "./info.js";
import { OPACITY, getMapboxExpression } from "./choropleth.js";
import { mapboxAccessToken } from "./config.js";

const dataKeys = ["jenipctl", "riskpctl", "driverspctl", "systempctl"];
const featureCount = jeniData.features.length;

export async function buildMap({ optionsId }) {
  const map = await createMap();
  addCountyLayer(map, laCountyData);
  addJeniLayers(map, jeniData);
  showFeatureFromUrl(map);

  document.getElementById(optionsId).addEventListener("change", (event) => {
    const key = event.target.value;
    showJeniLayer(map, key);
  });
}

async function createMap() {
  return new Promise((resolve, reject) => {
    try {
      mapboxgl.accessToken = mapboxAccessToken;
      const map = new mapboxgl.Map({
        container: "map",
        center: [-118.21, 34.2],
        zoom: 8.5,
        style: "mapbox://styles/mapbox/light-v11",
      });
      map.on("load", (event) => resolve(event.target));
    } catch (error) {
      reject(error);
    }
  });
}

function addCountyLayer(map, laCountyData) {
  const bounds = getBoundsFromCoordinates(
    laCountyData.features[0].geometry.coordinates
      .flat(2)
      // omit catalina & san clemente islands
      .filter(([_, lat]) => lat > 33.5)
  );

  map.addSource("la-county-feature", {
    type: "geojson",
    data: laCountyData,
  });

  map.fitBounds(bounds);

  map.addLayer({
    id: "la-county-feature",
    type: "line",
    source: "la-county-feature",
    paint: {
      "line-width": 2,
    },
  });
}

function addJeniLayers(map, jeniData) {
  map.addSource("jeni-features", {
    type: "geojson",
    data: jeniData,
  });

  for (let key of dataKeys) {
    addJeniLayer(map, key, key === dataKeys[0]);
  }
}

function addJeniLayer(map, dataKey, visible) {
  const layerId = `${dataKey}-features`;

  map.addLayer({
    id: layerId,
    type: "fill",
    source: "jeni-features",
    paint: {
      "fill-color": getMapboxExpression(dataKey),
      "fill-opacity": OPACITY,
      "fill-outline-color": "black",
    },
    layout: {
      visibility: visible ? "visible" : "none",
    },
  });

  const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
  });

  map.on("mousemove", layerId, (event) => {
    const fieldName = {
      jenipctl: "JENI (Total)",
      systempctl: "System Involvement",
      driverspctl: "Inequity Drivers",
      riskpctl: "Criminalization Risk",
    }[dataKey];
    const {
      [dataKey]: score,
      zip,
      neighborhood,
    } = event.features[0].properties;
    const roundedScore = Math.round(score * 100) / 100;
    popup
      .setLngLat(event.lngLat)
      .setHTML(
        `
        <div><strong>${zip}</strong></div>
        <div>${neighborhood}</div>
        <div class="score">${roundedScore}</div>
        <div>${fieldName}</div>
        `
      )
      .addTo(map);
  });

  map.on("mouseleave", layerId, () => {
    map.getCanvas().style.cursor = "";
    popup.remove();
  });

  map.on("click", layerId, (event) => {
    if (event.features.length) {
      const feature = event.features[0];
      showFeature(feature, featureCount);
      highlightFeature(map, feature);
    }
  });
}

function showJeniLayer(map, key) {
  dataKeys.forEach((dataKey) => {
    const visibility = dataKey === key ? "visible" : "none";
    map.setLayoutProperty(`${dataKey}-features`, "visibility", visibility);
  });
}

function highlightFeature(map, feature) {
  const highlightLayerId = "jeni-feature-highlight";
  // map.removeSource(highlightLayerId);
  if (map.getLayer(highlightLayerId)) {
    map.removeLayer(highlightLayerId);
  }
  if (map.getSource(highlightLayerId)) {
    map.removeSource(highlightLayerId);
  }
  map.addLayer({
    id: highlightLayerId,
    type: "line",
    source: { type: "geojson", data: feature },
    paint: {
      "line-color": "white",
      "line-width": 3,
    },
  });
}

function getBoundsFromCoordinates(coords) {
  let minLat = Infinity,
    minLon = Infinity,
    maxLat = -Infinity,
    maxLon = -Infinity;

  for (let coord of coords) {
    const [lon, lat] = coord;
    minLon = Math.min(minLon, lon);
    maxLon = Math.max(maxLon, lon);
    minLat = Math.min(minLat, lat);
    maxLat = Math.max(maxLat, lat);
  }

  return [
    [minLon, maxLat],
    [maxLon, minLat],
  ];
}
