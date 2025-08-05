import React from "react";

const HomeNewsletter = () => {
  return (
    <div className="w-full relative border-black border-y md:max-h-[450px] max-h-[480px] overflow-hidden">
      <picture className="w-full h-full block">
        <source
          media="(min-width:1024px)"
          srcSet="/homereview/newsletter-image-desktop.webp"
          type="image/webp"
        />
        <img
          src="/homereview/newsletter-mobile.webp"
          alt="wellness background image"
          className="w-full h-full object-cover"
        />
      </picture>
      <div className="absolute inset-0 h-full w-full flex justify-center items-center">
        <div className="rounded-lg p-5 backdrop:blur-[12px] bg-bg/70 text-center mx-10">
          <h2 className="font-bold text-text-default text-[25px] uppercase xl:text-[44px]">
            join our circle & save
          </h2>
          <div className="m-4">
            <p className="text-text-default xl:text-lg">
              Sign up now for 10% off your first order – because you deserve it!
            </p>
          </div>
          <div className="mb-4 flex justify-center items-center xl:mx-5">
            <input
              type="email"
              placeholder="Email"
              className="md:rounded-tl-lg md:rounded-bl-lg md:rounded-tr-none md:rounded-br-none bg-bg py-2 px-3 border flex-1 xl:py-3 xl:px-4 rounded-lg lg:border-black"
            />
            <button className="hidden md:block bg-text-default text-text-light rounded-tr-lg rounded-br-lg px-3 py-2 border-y border-r cursor-pointer border-black xl:py-3 xl:px-4">
              Subscribe
            </button>
          </div>
          <button className="rounded-lg bg-text-default py-2 px-3 w-full text-text-light uppercase font-semibold tracking-wide cursor-pointer md:hidden">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeNewsletter;
