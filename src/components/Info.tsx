import Feature from "@/components/Feature.tsx";
import Intro from "@/components/Intro.tsx";

type InfoProps = {
  feature: any;
  count: number;
  showIntro: () => void;
};

export default function Info({ feature, count, showIntro }: InfoProps) {
  return (
    <div id="info">
      {feature ? (
        <Feature feature={feature} count={count} showIntro={showIntro} />
      ) : (
        <Intro />
      )}
    </div>
  );
}
