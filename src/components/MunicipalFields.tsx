import InfoField from "./InfoField";
import { JeniProperties } from "@/util/types";

export default function MunicipalFields({
  properties,
}: {
  properties: JeniProperties;
}) {
  const municipalFieldNames = {
    neighborhood: "Neighborhood",
    sup_dist: "Supervisoral District",
    spa: "Service Planning Area",
    csa: "Countywide Statistical Area",
  };

  return Object.entries(municipalFieldNames).map(([field, name]) => {
    const value = properties[field] as string;
    return <InfoField key={field} {...{ name, value }} />;
  });
}
