import JeniField from "./JeniField";
import { JeniProperties } from "@/util/types";

function roundScore(score: number) {
  return Math.floor(score * 10) / 10;
}

type JeniFieldsProps = {
  properties: JeniProperties;
};

export default function JeniFields({ properties }: JeniFieldsProps) {
  const jeniFieldNames = {
    jeni: "JENI Percentile",
    system: "System Involvement",
    drivers: "Inequity Drivers",
    risk: "Criminalization Risk",
  };

  return Object.entries(jeniFieldNames).map(([field, name]) => {
    const scoreKey = field + "pctl";
    const catKey = field + "category";
    const score = roundScore(properties[scoreKey] as number);
    const category = properties[catKey] as string;
    return <JeniField key={field} {...{ name, score, category }} />;
  });
}
