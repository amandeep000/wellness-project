import { Link } from "react-router-dom";

type Color = {
  bgColor?: string;
};

const MostPopularProducts = ({ bgColor = "#ffffff" }: Color) => {
  return (
    <section className="w-full h-full ">
      <div className="w-full py-9 pb-[130px]" style={{ background: bgColor }}>
        <div className="w-full p-4 md:p-6 lg:p-8 text-center mb-10">
          <h3 className="capitalize text-sm font-bold text-black mb-2.5">
            Most selling products in out catalog
          </h3>
          <h2 className="uppercase font-bold text-black text-2xl md:text-3xl lg:text-4xl">
            Our Recomended products
          </h2>
        </div>
        {/* picture div or product's div */}
        <div className="w-full flex flex-col justify-center items-center lg:flex-row">
          <div className="flex-1 w-full relative h-full cursor-pointer">
            <img
              src="/filters/bestProductimg1.webp"
              alt="smiling girl image"
              className="object-cover w-full h-full"
            />
            <div className="absolute top-0 left-0 text-white w-full">
              <Link
                to={"/shop/immunity"}
                className="flex flex-col justify-start items-center w-fit p-6"
              >
                <span className="uppercase text-[36px] font-bold md:text-[44px] lg:text-4xl">
                  Stress Relief
                </span>
                <span className="text-lg uppercase self-start font-light promo-heading mt-1.5">
                  check now
                </span>
              </Link>
            </div>
          </div>
          <div className="flex-1 w-full relative cursor-pointer">
            <img
              src="/filters/bestProductimg2.webp"
              alt="collagen image"
              className="w-full object-cover"
            />
            <div className="absolute top-0 left-0 text-white">
              <Link
                to={"/shop/skincare"}
                className="flex flex-col justify-start items-center p-6"
              >
                <span className="uppercase font-bold text-[36px] md:text-[44px] lg:text-4xl">
                  Skin Care
                </span>
                <span className="text-lg uppercase self-start font-light promo-heading mt-1.5">
                  check now
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MostPopularProducts;
