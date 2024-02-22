import { useState } from "react";
import Info from "@/components/Info";
import MapContainer from "@/components/MapContainer";
import Options from "@/components/Options";
import { Feature } from "@/util/types";

export default function App() {
  const [feature, setFeature] = useState<Feature | null>(null);
  const [dataKey, setDataKey] = useState<string>("jenipctl");

  function showIntro(): void {
    setFeature(null);
  }

  return (
    <>
      <div
        id="main"
        style={{
          height: "100%",
          display: "grid",
          gridTemplateColumns: "390px auto",
        }}
      >
        <Info feature={feature} showIntro={showIntro} />
        <MapContainer showFeature={setFeature} dataKey={dataKey} />
      </div>
      <Options onChange={setDataKey} />
    </>
  );
}
