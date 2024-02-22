import { getRgbaFromPercentile } from "@/util/choropleth";

export type JeniFieldProps = {
  name: string;
  score: number;
  category: string;
};

export default function JeniField({ name, score, category }: JeniFieldProps) {
  const color = getRgbaFromPercentile(score);
  const style = { width: `${score}%`, backgroundColor: color };
  return (
    <>
      <div className="info-field">
        <strong>{name}</strong>: {score} ({category})
      </div>
      <div className="info-bar-container">
        <div className="info-bar" style={style}></div>
      </div>
    </>
  );
}
