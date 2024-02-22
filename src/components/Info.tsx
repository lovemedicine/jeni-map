import Feature from "@/components/Feature.tsx";
import Intro from "@/components/Intro.tsx";

type InfoProps = {
  feature: any;
  showIntro: () => void;
};

export default function Info({ feature, showIntro }: InfoProps) {
  return (
    <div id="info">
      {feature ? (
        <Feature feature={feature} showIntro={showIntro} />
      ) : (
        <Intro />
      )}
    </div>
  );
}
