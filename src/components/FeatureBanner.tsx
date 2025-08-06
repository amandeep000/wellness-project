const featureBannerData = [
  {
    img: "/scienceBacked/lab.png",
    alt: "lab tested image",
    title: "Third-party tested",
    desc: "We hold ourselves and our ingredients to the highest standards.",
  },
  {
    img: "/scienceBacked/quality.png",
    alt: "quality ingredients image",
    title: "Quality ingredients",
    desc: "We're dedicated to using scientifically backed, high-quality natural ingredients.",
  },
  {
    img: "/scienceBacked/nogmo-2.png",
    alt: "non gmo image",
    title: "non-gmo",
    desc: "We carefully evaluate every ingredient, ensuring they are non-GMO.",
  },
  {
    img: "/scienceBacked/vegan-2.png",
    alt: "Vegan image",
    title: "Vegan",
    desc: "We ensure the highest standards with 100% vegan, cruelty-free formulations.",
  },
];

const FeatureBanner = () => {
  return (
    <div className="w-full py-10 border-black border-y">
      <div className="px-6 xl:px-10">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {featureBannerData.map((item, idx) => (
            <div
              key={idx}
              className={`flex justify-start items-center gap-4 md:flex-col md:justify-center md:items-center`}
            >
              <div className="w-[50px] lg:w-[70px] shrink-0 flex justify-center items-start">
                <img
                  src={item.img}
                  alt={item.alt}
                  className="w-full object-contain"
                />
              </div>
              <div className="flex flex-col md:text-center">
                <h3 className="uppercase mb-1 text-sm font-bold">
                  {item.title}
                </h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureBanner;
