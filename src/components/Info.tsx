import Feature from "@/components/Feature.tsx";
import Intro from "@/components/Intro.tsx";

type InfoProps = {
  feature: any;
  showIntro: () => void;
};

export default function Info({ feature, showIntro }: InfoProps) {
  return (
    <div className="bg-white text-sm p-5 h-screen">
      {feature ? (
        <Feature feature={feature} showIntro={showIntro} />
      ) : (
        <Intro />
      )}
    </div>
  );
}
