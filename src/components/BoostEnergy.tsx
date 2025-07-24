import AnimatedText from "./AnimatedText";
import LinkButton from "./LinkButton";
const BoostEnergy = () => {
  return (
    <section className="relative w-full h-full border-b">
      <div className="w-full h-[520px] 2xl:h-[970px]">
        <picture>
          <source
            srcSet="/boostEnergy/wellness-banner-run-women-mobile-2.webp"
            media="(max-width:768px)"
          />
          <source
            srcSet="/boostEnergy/wellness-banner-run-women-desktop.webp"
            media="(min-width:1024px)"
          />
          <img
            src="/boostEnergy/wellness-banner-run-women-desktop.webp"
            alt="fitness image"
            className="object-cover absolute inset-0 w-full h-full"
          />
        </picture>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
        <div className="w-full">
          <AnimatedText />
        </div>
        <div className="flex justify-center items-center">
          <LinkButton
            className="uppercase px-6 py-4 tracking-wider bg-bg text-xs font-syne font-semibold border"
            to="#"
          >
            Boost Energy
          </LinkButton>
        </div>
      </div>
    </section>
  );
};

export default BoostEnergy;
