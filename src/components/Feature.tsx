import InfoField from "./InfoField";
import JeniFields from "./JeniFields";
import MunicipalFields from "./MunicipalFields";
import { JeniFeature } from "@/util/types";

type FeatureProps = {
  feature: JeniFeature;
  showIntro: () => any;
};

export default function Feature({ feature, showIntro }: FeatureProps) {
  const { properties } = feature;

  if (!properties) {
    return null;
  }

  return (
    <>
      <h1>{properties.zip}</h1>
      <div className="text-lg mb-5">{properties.neighborhood}</div>
      <InfoField name="JENI Rank" value={`${properties.jenirank} of 277`} />
      <JeniFields properties={properties} />
      <MunicipalFields properties={properties} />
      <div className="bottom-4 absolute">
        <a className="cursor-pointer" onClick={showIntro}>
          &laquo; About JENI
        </a>
      </div>
    </>
  );
}
