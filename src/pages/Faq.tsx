import ReuseAccordion from "../components/ReuseAccordion";

const Faq = () => {
  return (
    <section className="w-full">
      <div className="w-full relative">
        <video
          playsInline
          autoPlay
          loop
          muted
          poster="/pagesGraphicData/contact-poster-mobile.webp"
          className="max-h-[400px] w-full object-cover pt-[61px] xl:pt-[73px]"
        >
          <source src="/hero/hero-video-desktop.webm" />
        </video>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-[33px]">
          <h2 className="text-3xl lg:text-[41px] xl:text-7xl text-text-light uppercase font-bold">
            faq
          </h2>
        </div>
      </div>
      <div className="w-full px-4 pt-[30px] pb-[60px]">
        <ReuseAccordion />
      </div>
    </section>
  );
};

export default Faq;
