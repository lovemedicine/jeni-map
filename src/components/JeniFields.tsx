import JeniField, { JeniFieldProps } from "./JeniField";
import { Feature } from "@/util/types";

const jeniFieldNames = {
  jeni: "JENI Percentile",
  system: "System Involvement",
  drivers: "Inequity Drivers",
  risk: "Criminalization Risk",
};

export default function JeniFields({ feature }: { feature: Feature }) {
  const { properties } = feature;

  if (!properties) return null;

  const fieldProps = Object.entries(jeniFieldNames).map(
    ([field, name]): JeniFieldProps => {
      const scoreKey = field + "pctl";
      const catKey = field + "category";
      const score = roundScore(properties[scoreKey] as number);
      const category = properties[catKey] as string;
      return { name, score, category };
    }
  );

  return fieldProps.map((props, index) => {
    return <JeniField key={index} {...props} />;
  });
}

function roundScore(score: number) {
  return Math.floor(score * 10) / 10;
}
