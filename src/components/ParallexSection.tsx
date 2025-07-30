import LinkButton from "./LinkButton";

const ParallexSection = () => {
  return (
    <section className="relative w-full p-4 h-screen flex justify-center items-center border-black border-t gap-y-5">
      <div className="p-4 w-full text-center md:p-8 max-w-[865px] xl:px-20 xl:max-w-[1300px]">
        <h2 className="uppercase text-[32px] font-bold text-text-default mb-4 leading-9 xl:text-[92px] xl:leading-[102px]">
          Empowering your health naturally
        </h2>
        <p className="mb-5 max-w-[800px] mx-auto xl:text-xl">
          At Wellness, we believe that true vitality starts from within. That's
          why we create high-quality, natural supplements designed to support
          your well-being, enhance your energy, and help you thrive every day.
        </p>
        <LinkButton
          className="py-4 px-7 cursor-pointer inline-block bg-text-default text-text-light font-semibold uppercase text-sm tracking-widest"
          to="#"
        >
          about us
        </LinkButton>
      </div>
      <div className="absolute bottom-5 bounce-chevron">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      </div>
    </section>
  );
};

export default ParallexSection;
