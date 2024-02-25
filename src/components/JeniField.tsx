import { getRgbaFromPercentile } from "@/util/choropleth";

export type JeniFieldProps = {
  name: string;
  score: number;
  category: string;
};

export default function JeniField({ name, score, category }: JeniFieldProps) {
  return (
    <>
      <div className="mt-3">
        <strong>{name}</strong>: {score} ({category})
      </div>
      <div className="box-border w-full h-5 border border-black mt-2px">
        <div
          className="h-full"
          style={{
            width: `${score}%`,
            backgroundColor: getRgbaFromPercentile(score),
          }}
        ></div>
      </div>
    </>
  );
}
