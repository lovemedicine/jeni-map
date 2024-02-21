import { useEffect } from "react";
import Map from "@/components/Map";
import Options from "@/components/Options";
import { showIntro } from "./info";

export default function App() {
  useEffect(() => {
    showIntro();
  }, []);

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
        <div id="info"></div>
        <Map />
      </div>
      <Options />
    </>
  );
}
