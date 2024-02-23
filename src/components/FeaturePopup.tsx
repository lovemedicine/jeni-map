import { Popup, LngLat } from "react-map-gl";
import { JeniFeature } from "@/util/types";

type Props = {
  lngLat: LngLat;
  dataKey: string;
  feature: JeniFeature;
};

export default function FeaturePopup({ lngLat, dataKey, feature }: Props) {
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
