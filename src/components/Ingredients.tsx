type IngredientsItem = {
  title: string;
  desc: string;
};

interface IngredientsProps {
  items: IngredientsItem[];
}
const Ingredients = ({ items }: IngredientsProps) => {
  return (
    <section className="w-full bg-[#FCF8F2]">
      <div className="px-4 pb-14 pt-[30px]">
        <div className="uppercase px-4 pt-2 pb-10 text-lg font-bold text-center">
          Key Ingredients
        </div>

        {/* Video Container */}
        <div className="relative lg:min-h-[700px] lg:max-h-[800px] lg:block">
          <div className="lg:absolute lg:inset-0 mx-auto w-full max-w-3xl z-0">
            <video
              autoPlay
              muted
              loop
              playsInline
              poster="/scienceBacked/poster.webp"
              className="w-full h-full object-cover "
            >
              <source src="/scienceBacked/f087c0f71002463594892e68000dfe75.HD-720p-4.5Mbps-40573155.mp4" />
            </video>
          </div>

          {/* Text Content over Video */}
          <div className="lg:absolute z-10 justify-center items-center pt-8 lg:pt-4 ">
            <div className="w-full lg:justify-between px-4 flex flex-col lg:flex-row lg:flex-wrap lg:gap-y-[32px] lg:h-[700px]">
              {items.map((item, i) => (
                <div
                  key={i}
                  className={`lg:${i % 2 === 0 ? "" : "justify-end"} flex w-full lg:w-[40%] gap-5`}
                >
                  <div className="lg:w-[326px] w-full flex lg:flex-col justify-start lg:justify-center gap-5 mb-5 lg lg:gap-0 items-center text-start lg:text-center">
                    <div className="flex flex-col">
                      <h3 className="uppercase mb-1.5 font-bold text-xl ">
                        {item.title}
                      </h3>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ingredients;
