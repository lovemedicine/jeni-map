import InfoField from "./InfoField.tsx";
import JeniFields from "./JeniFields.tsx";
import MunicipalFields from "./MunicipalFields.tsx";

export type Feature = {
  properties: {
    zip: string;
    jenirank: number;
    neighborhood: string;
    sup_dist: string;
    spa: string;
    csa: string;
    jenipctl: number;
    jenicategory: string;
    riskpctl: number;
    riskcategory: string;
    systempctl: number;
    systemcategory: string;
  };
};

type FeatureProps = {
  feature: Feature;
  count: number;
  showIntro: () => any;
};

export default function Feature({ feature, count, showIntro }: FeatureProps) {
  const { properties } = feature;

  return (
    <>
      <div>
        <a onClick={showIntro}>&laquo; About JENI</a>
      </div>
      <h1>{properties.zip}</h1>
      <div className="neighborhood">{properties.neighborhood}</div>
      <InfoField
        name="JENI Rank"
        value={`${properties.jenirank} of ${count}`}
      />
      <JeniFields feature={feature} />
      <MunicipalFields feature={feature} />
    </>
  );
}
