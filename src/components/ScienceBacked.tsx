const ScienceBacked = () => {
  const items = [
    {
      img: "/scienceBacked/nogmo-2.png",
      alt: "non gmo image",
      title: "non-gmo",
      desc: "We carefully evaluate every ingredient, ensuring they are non-GMO.",
    },
    {
      img: "/scienceBacked/quality.png",
      alt: "quality ingredients image",
      title: "Quality ingredients",
      desc: "We're dedicated to using scientifically backed, high-quality natural ingredients.",
    },
    {
      img: "/scienceBacked/eng-ico.png",
      alt: "engineered image",
      title: "Engineered for Effectiveness",
      desc: "Our formulations are crafted to maximize potency and absorption.",
    },
    {
      img: "/scienceBacked/lab.png",
      alt: "lab tested image",
      title: "Third-party tested",
      desc: "We hold ourselves and our ingredients to the highest standards.",
    },
    {
      img: "/scienceBacked/vegan-2.png",
      alt: "Vegan image",
      title: "Vegan",
      desc: "We ensure the highest standards with 100% vegan, cruelty-free formulations.",
    },
    {
      img: "/scienceBacked/nometal-2.png",
      alt: "no metal image",
      title: "No heavy metals",
      desc: "We guarantee the highest purity, ensuring our products are free from heavy metals.",
    },
  ];

  return (
    <section className="w-full h-full bg-[#FCF8F2]">
      <div className="relative px-4 pb-14 pt-[60px]">
        <div className="uppercase px-4 pt-2 pb-3 text-lg font-bold text-center">
          Science - driven confidence boost
        </div>

        {/* Video Container */}
        <div className="relative h-screen">
          <div className="absolute inset-0 mx-auto w-full max-w-3xl z-0">
            <video
              autoPlay
              muted
              loop
              playsInline
              poster="/scienceBacked/poster.webp"
              className="w-full h-full object-cover"
            >
              <source src="/scienceBacked/f087c0f71002463594892e68000dfe75.HD-720p-4.5Mbps-40573155.mp4" />
            </video>
          </div>

          {/* Text Content over Video */}
          <div className="absolute lg:inset-0 z-10 justify-center items-center pt-8 lg:pt-4">
            <div className="w-full justify-between px-4 flex flex-wrap gap-y-5">
              {items.map((item, idx) => (
                <div
                  key={idx}
                  className={`${idx % 2 === 0 ? "" : "justify-end"} flex w-[40%] gap-5`}
                >
                  <div className="w-[326px]">
                    <div className="w-[50px] shrink-0 flex justify-center items-start">
                      <img
                        src={item.img}
                        alt={item.alt}
                        className="w-full object-contain"
                      />
                    </div>
                    <div className="flex flex-col">
                      <h3 className="uppercase mb-1.5 font-semibold text-sm">
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

export default ScienceBacked;
