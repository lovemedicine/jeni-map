import { useState } from "react";
import Info from "@/components/Info";
import MapContainer from "@/components/MapContainer";
import Options from "@/components/Options";
import { JeniFeature } from "@/util/types";

export default function App() {
  const [feature, setFeature] = useState<JeniFeature | null>(null);
  const [dataKey, setDataKey] = useState<string>("jenipctl");

  function showIntro(): void {
    setFeature(null);
  }

  return (
    <>
      <div id="main" className="grid grid-cols-main h-screen relative">
        <Info feature={feature} showIntro={showIntro} />
        <MapContainer showFeature={setFeature} dataKey={dataKey} />
      </div>
      <Options onChange={setDataKey} />
    </>
  );
}
