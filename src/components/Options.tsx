export default function Options() {
  return (
    <div id="options">
      <strong>Map Data:</strong>
      <br />
      <select id="data-selector" name="data-selector" defaultValue="jenipctl">
        <option value="jenipctl">JENI (Total)</option>
        <option value="systempctl">System Involvement</option>
        <option value="driverspctl">Inequity Drivers</option>
        <option value="riskpctl">Criminalization Risk</option>
      </select>
      <div id="legend-text">
        <div>Low</div>
        <div>High</div>
      </div>
      <div id="legend-colors"></div>
      <div id="data-about">
        <a
          href="https://egis-lacounty.hub.arcgis.com/datasets/lacounty::justice-equity-need-index-zip-code/about"
          target="_blank"
        >
          Source
        </a>
      </div>
    </div>
  );
}
