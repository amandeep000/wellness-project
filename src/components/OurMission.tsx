import CutstomerHappyText from "./CustomerHappyText";

const OurMission = () => {
  return (
    <section className="w-full h-full border border-b-black">
      <div className="">
        <div className="w-full h-full">
          <CutstomerHappyText />
        </div>
        <div className="flex flex-col lg:flex-row w-full p-6">
          <div className="lg:flex-1">
            <img
              src="/homeimages/hold-supplement.webp"
              alt="holding pill image"
              className="w-full object-cover rounded-md"
            />
          </div>
          <div className="py-6 lg:flex-1 lg:flex lg:flex-col lg:justify-center">
            <div className="flex flex-col justify-center items-center text-center px-[30px] md:px-[42px]">
              <h4 className="uppercase tracking-wide text-sm xl:text-lg font-semibold">
                Our mission
              </h4>
              <h2 className="uppercase text-3xl pb-4 font-bold xl:text-6xl">
                there's a science to the science
              </h2>
              <div className="pb-4">
                <p className="xl:text-xl">
                  We have worked tirelessly, refining countless formulations,
                  processes, and tests to ensure that each supplement and mint
                  we create fulfills our promise of helping you achieve the
                  right state of mind at the perfect moment.
                </p>
              </div>
              <span className="uppercase tracking-wider text-sm xl:text-lg font-semibold w-full relative our_mission text-center inline-block">
                Read more
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurMission;
