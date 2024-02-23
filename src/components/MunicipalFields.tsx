import InfoField from "./InfoField";
import { JeniProperties } from "@/util/types";

type Props = { properties: JeniProperties };

export default function MunicipalFields({ properties }: Props) {
  const fieldNames = {
    neighborhood: "Neighborhood",
    sup_dist: "Supervisoral District",
    spa: "Service Planning Area",
    csa: "Countywide Statistical Area",
  };

  return Object.entries(fieldNames).map(([field, name]) => {
    const value = properties[field] as string;
    return <InfoField key={field} {...{ name, value }} />;
  });
}
