import LinkButton from "./LinkButton";

const HeroMissionVideo = () => {
  return (
    <section className="relative w-full h-full bg-amber-300">
      <div className="w-full h-full">
        <video
          autoPlay
          playsInline
          loop
          muted
          poster="/ourMissionVideo/missionvideoPoster.jpg"
          className="w-full min-h-[400px] max-h-[600px] object-cover"
        >
          <source src="/ourMissionVideo/ourMissionvideo.webm" />
        </video>
      </div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full z-20 mt-5">
        <div className="flex flex-col justify-center items-center p-8 max-w-[600px] xl:max-w-[825px]  mx-auto">
          <p className="text-text-light capitalize font-semibold tracking-wider mb-2.5">
            fuel your body,sustain the planet
          </p>
          <h2 className="font-bold text-2xl text-text-light uppercase px-1 text-center mb-4 leading-7 xl:text-[55px] xl:leading-[61px]">
            Sustainable Solutions for a Healthier Life.
          </h2>

          <LinkButton
            className="tracking-wider text-sm font-semibold text-text-default py-4 px-6 border-none outline-none bg-bg"
            to="#"
          >
            our mission
          </LinkButton>
        </div>
      </div>
    </section>
  );
};

export default HeroMissionVideo;
