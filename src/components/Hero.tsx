import { useEffect, useState } from "react";
import LinkButton from "./LinkButton";
import { Link } from "react-router-dom";

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkmobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkmobile();
    window.addEventListener("resize", checkmobile);
    return () => window.removeEventListener("resize", checkmobile);
  });

  const fallbackImg = isMobile
    ? "/hero/videofallback.webp"
    : "/hero/video-fallback-desktop.webp";
  const videoSrc = isMobile
    ? "/hero/df46b241ba554090aa85fb43e3762574.HD-1080p-7.2Mbps-41196432.webm"
    : "/hero/hero-video-desktop.webm";
  return (
    <section className="w-full h-screen ">
      <div className="w-full h-full flex justify-center items-center">
        <div className="relative w-full h-full lg:w-1/2 overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={fallbackImg}
            className="w-full h-full object-cover"
          >
            <source src={videoSrc} />
            <img
              src={fallbackImg}
              alt="Hero fallback image"
              className=" w-full h-full object-contain"
            />
          </video>
          {/* for text above video */}
          <div className="absolute w-full bottom-[50px] left-1/2 -translate-x-1/2 text-start z-10 flex flex-col justify-center items-center gap-y-8 flex-co px-3">
            <h2 className="w-full text-3xl md:text-[40px] font-styrene text-text-light uppercase">
              Fuel your health
            </h2>
            <div className="w-full bg-bg/50 h-0.5"></div>
            <p className="uppercase text-text-light tracking-wider w-full md:text-lg">
              future of wellness
            </p>
            <div className="w-full">
              <Link
                to={"#"}
                className="px-6 py-3 bg-bg border border-black uppercase rounded-md mt-2 text-[14px] text-[#151516] tracking-wider"
              >
                Check now
              </Link>
            </div>
          </div>
        </div>

        <div className="hidden w-full h-full lg:w-1/2 lg:block">
          <img
            src="/hero/main-image-wellness-desktop-girl.jpg"
            alt="wellness main girl image"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
