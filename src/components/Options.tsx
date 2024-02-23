type OptionsProps = {
  onChange: (value: string) => void;
};

export default function Options({ onChange }: OptionsProps) {
  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    onChange(event.target.value);
  }

  return (
    <div
      id="options"
      className="bg-white absolute top-4 right-4 text-sm border border-black p-3"
    >
      <strong>Map Data:</strong>
      <br />
      <select
        className="mt-1 border border-gray-500"
        defaultValue="jenipctl"
        onChange={handleChange}
      >
        <option value="jenipctl">JENI (Total)</option>
        <option value="systempctl">System Involvement</option>
        <option value="driverspctl">Inequity Drivers</option>
        <option value="riskpctl">Criminalization Risk</option>
      </select>
      <div className="text-xs mb-1 mt-3 flex flex-row justify-between">
        <div>Low</div>
        <div>High</div>
      </div>
      <div
        className="h-4 w-full"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgb(255, 255, 128), rgb(128, 0, 0))",
        }}
      ></div>
      <div className="text-xs text-right mt-2">
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
