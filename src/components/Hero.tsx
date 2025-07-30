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
    <section className="relative w-full h-screen border-b">
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
              className=" w-full h-full object-cover"
            />
          </video>
          {/* for text above video */}
          <div className="absolute inset-0 top-[83px] text-center z-20 flex flex-col justify-center items-center lg:justify-end lg:bottom-5 lg:w-[85%] lg:items-start mx-auto">
            <div className="w-[80%] lg:w-[85%] xl:w-[92%] mb-8">
              <p className="capitalize text-black tracking-wider w-full text-xs mb-4 font-semibold md:text-base lg:text-start xl:pl-2">
                The future of wellness
              </p>
              <h2 className="font-syne text-text-default  mb-4 leading-[44px] tracking-wide uppercase text-[40px] xl:text-[66px] xl:leading-[73px] font-bold lg:text-start">
                Gear up for great health
              </h2>

              <button className="w-full mt-[10px] lg:text-start cursor-pointer">
                <Link
                  to={""}
                  className="px-6 py-4 bg-bg border border-black uppercase rounded-lg mt-2 text-xs text-black font-bold tracking-wider cursor-pointer"
                >
                  Check now
                </Link>
              </button>
            </div>
          </div>
        </div>

        <div className="hidden w-full h-full lg:w-1/2 lg:block">
          <img
            src="/hero/main-image-wellness-desktop-girl.jpg"
            alt="wellness main girl image"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
