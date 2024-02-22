import { FeatureCollection, MultiPolygon, GeoJsonProperties } from "geojson";
export type { Feature } from "geojson";

export type JeniProperties = {
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
  [key: string]: string | number | undefined;
};

export type JeniData = FeatureCollection<MultiPolygon, JeniProperties>;

export type LaCountyData = FeatureCollection<MultiPolygon, GeoJsonProperties>;
