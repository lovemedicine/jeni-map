import { useState } from "react";
import Info from "@/components/Info.tsx";
import Map from "@/components/Map.tsx";
import Options from "@/components/Options.tsx";
import jeniData from "./data/jeniData.js";
import laCountyData from "./data/laCountyData.js";
import { Feature } from "@/components/Feature";

export default function App() {
  const [feature, setFeature] = useState<Feature | null>(null);
  const [dataKey, setDataKey] = useState<string>("jeni");

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
        <Info
          feature={feature}
          count={jeniData.features.length}
          showIntro={showIntro}
        />
        <Map
          jeniData={jeniData}
          laCountyData={laCountyData}
          showFeature={setFeature}
          dataKey={dataKey}
        />
      </div>
      <Options onChange={setDataKey} />
    </>
  );
}
