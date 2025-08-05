import ScienceBacked from "../components/ScienceBacked";
import FeaturedonText from "../components/FeaturedonText";
import HomeNewsletter from "../components/HomeNewsletter";

const Science = () => {
  const missionData = [
    {
      title: "letter from ceo",
      heading:
        "Wellness Inc. envisions a future where biology and technology unite, unlocking new possibilities and redefining innovation.",
    },
  ];
  return (
    <section className="w-full">
      <div className="w-full h-full relative">
        <video
          playsInline
          autoPlay
          loop
          muted
          poster="/scienceContent/poster.webp"
          className="w-full object-cover max-h-[340px] lg:max-h-[580px]"
        >
          <source src="/scienceContent/scienceVideo.webm" />
        </video>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full flex flex-col justify-center items-center">
          <div className="w-full p-8 md:max-w-[70%]">
            <h4 className="uppercase tracking-wider text-sm font-bold text-text-light xl:text-lg">
              our mission
            </h4>
            <h2 className="text-[26px] lg:text-[40px] xl:text-7xl text-text-light uppercase px-[40px] font-bold text-center mx-auto">
              There's a science to the science
            </h2>
          </div>
        </div>
      </div>
      <div className="w-full">
        <ScienceBacked />
      </div>
      <div className="border-text-default border-y">
        <div className="w-full flex flex-col lg:flex-row items-center">
          <div className="flex-1 w-full h-full">
            <img
              src="/scienceContent/blog-post-1.webp"
              alt="scientists blog image"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full flex flex-col justify-center items-center gap-4 lg:w-1/2">
            <div className="p-6 xl:mx-20">
              <h2 className="uppercase font-semibold xl:text-2xl">
                Supplements for a Thriving You
              </h2>
              <p>
                At Wellness, we believe that true vitality starts from within.
                That's why we create high-quality, natural supplements designed
                to support your well-being, enhance your energy, and help you
                thrive every day. Our mission is to empower you to feel your
                best by providing products that are rooted in science and
                inspired by nature. We carefully select premium, responsibly
                sourced ingredients to ensure every formula delivers maximum
                benefits without compromise.
              </p>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col lg:flex-row items-center">
          <div className="flex-1 lg:order-2">
            <img
              src="/scienceContent/blog-post-2.webp"
              alt="capsules blog image"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6 w-full flex flex-col justify-center items-center gap-4 lg:w-1/2 lg:order-1">
            <div className="xl:mx-20 h-full">
              <h2 className="uppercase font-semibold xl:text-2xl">
                Innovating Wellness,Empowering Lives
              </h2>
              <p className="">
                At Wellness Inc., we combine cutting-edge innovation with the
                power of nature to create products that truly make a difference.
                Trusted by countless satisfied customers, our commitment to
                quality and well-being has made us a leader in redefining
                health. Join the growing community that thrives with Wellness
                Inc. and experience the future of vitality today.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* featured on */}
      <div className="w-full pt-11">
        <div className="w-full px-4 pt-2">
          <h2 className="uppercase text-text-default tracking-wide text-center font-bold">
            Featured on
          </h2>
        </div>
        <div className="pb-5 md:pb-8">
          <FeaturedonText />
        </div>
      </div>
      {/* our mission hero video */}
      <div className="w-full relative border-black border-t">
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
          <div className="flex flex-col justify-center items-center p-4 lg:p-8 max-w-[600px] xl:max-w-[825px]  mx-auto">
            <p className="text-text-light uppercase font-semibold tracking-wider mb-2.5">
              Letter from ceo
            </p>
            <h2 className="font-bold text-2xl text-text-light uppercase text-center mb-4 xl:text-4xl">
              "Wellness Inc. envisions a future where biology and technology
              unite, unlocking new possibilities and redefining innovation."
            </h2>
          </div>
        </div>
      </div>
      {/* newletter */}
      <div className="w-full">
        <HomeNewsletter />
      </div>
    </section>
  );
};

export default Science;
