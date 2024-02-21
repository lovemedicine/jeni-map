import InfoField from "./InfoField";
import { Feature } from "./Feature";

const municipalFieldNames = {
  neighborhood: "Neighborhood",
  sup_dist: "Supervisoral District",
  spa: "Service Planning Area",
  csa: "Countywide Statistical Area",
};

export default function MunicipalFields({ feature }: { feature: Feature }) {
  const { properties } = feature;

  const fieldProps = Object.entries(municipalFieldNames).map(
    ([field, name]) => {
      const value = properties[field] as string;
      return { name, value };
    }
  );

  return fieldProps.map((props, index) => {
    return <InfoField key={index} {...props} />;
  });
}
