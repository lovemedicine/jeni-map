import { useState } from "react";
import Info from "@/components/Info";
import MapContainer from "@/components/MapContainer";
import Options from "@/components/Options";
import { JeniFeature } from "@/util/types";

export default function App() {
  const [feature, setFeature] = useState<JeniFeature | null>(null);
  const [dataKey, setDataKey] = useState<string>("jenipctl");
  const [mapHasLoaded, setMapHasLoaded] = useState(false);

  function showIntro(): void {
    setFeature(null);
  }

  function handleMapLoad() {
    setMapHasLoaded(true);
  }

  return (
    <>
      <div id="main" className="grid grid-cols-main h-screen relative">
        <Info feature={feature} showIntro={showIntro} />
        <MapContainer
          showFeature={setFeature}
          dataKey={dataKey}
          onLoad={handleMapLoad}
        />
      </div>
      {mapHasLoaded && <Options onChange={setDataKey} />}
    </>
  );
}
