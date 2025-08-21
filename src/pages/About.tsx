import OurTeamText from "../components/OurTeamText";
import FeaturedonText from "../components/FeaturedonText";
import OurTeam from "../components/OurTeam";
import HomeNewsletter from "../components/HomeNewsletter";
import FeatureBanner from "../components/FeatureBanner";
import { useEffect } from "react";

const About = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <section className="w-full">
      <div className="w-full relative">
        <picture className="h-full object-cover w-full">
          <source
            media="(min-width:1024px)"
            srcSet="/pagesGraphicData/about-us-ceo-desktop.webp"
            type="image/webp"
          />
          <img
            src="/pagesGraphicData/about-ceo-mobile.webp"
            alt="wellness ceo amanda turner image"
            className="w-full h-full object-cover"
          />
        </picture>
        <div className="absolute inset-0 w-full flex justify-center lg:justify-start lg:items-center items-end z-10 p-4 md:p-8">
          <div className="text-[#FFFFFF] flex flex-col text-center lg:text-start p-6 max-w-4xl xl:pr-5">
            <h3 className="hidden uppercase tracking-wide text-sm md:block xl:text-lg">
              About us
            </h3>
            <h2 className="uppercase tracking-wide font-bold break-words text-4xl w-full pb-4 xl:text-[92.8px]">
              Think. design. evolve
            </h2>
            <p className="font-semibold capitalize tracking-wide text-sm xl:text-lg">
              - Amanda turner CEO of wellness co.
            </p>
          </div>
        </div>
      </div>
      {/* wellness.inc para */}
      <div className="w-full pt-8 pb-11">
        <div className="px-4">
          <div className="p-4 text-center md:p-8 xl:px-[74px]">
            <p className="capitalize font-semibold tracking-wide mb-1">
              Wellness Inc.
            </p>
            <h2 className="uppercase font-bold text-[22px] lg:text-[28.8px] xl:text-4xl xl:leading-[53px]">
              by integrating biological{" "}
              <img
                src="/pagesGraphicData/tree.avif"
                alt="tree image"
                className="rounded-full w-[32px] h-[32px] inline-block object-cover"
              />{" "}
              knowledge with cutting-edge technology we create sustainable,
              <img
                src="/pagesGraphicData/relax-mobile-image.avif"
                alt="joyful people image"
                className="rounded-full w-[33px] h-[33px] inline-block m-1 object-cover"
              />
              people-centered solutions
            </h2>
          </div>
        </div>
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
              src="/pagesGraphicData/happy-couple-about.webp"
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
        <div className="pb-5">
          <FeaturedonText />
        </div>
      </div>
      {/* our mission hero video plus text overlay */}
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
      {/* feature banner */}
      <div className="w-full">
        <FeatureBanner />
      </div>
      {/* our team text */}
      <div className="w-full">
        <OurTeamText />
      </div>
      {/* meet our team */}
      <div className="w-full">
        <OurTeam />
      </div>
      {/* newsletter */}
      <div className="w-full">
        <HomeNewsletter />
      </div>
    </section>
  );
};

export default About;
