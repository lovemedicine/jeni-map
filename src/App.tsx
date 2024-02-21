import Options from "@/components/Options";

export default function App() {
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
        <div id="map" style={{ height: "100%" }}></div>
      </div>
      <Options />
    </>
  );
}
