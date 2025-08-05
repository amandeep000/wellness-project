import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

const bestsellerData = [
  {
    primaryImg: "/bestsellerimages/energy-boost-img-1.webp",
    bannerImg: "/bestsellerimages/energy-boost-img-1-sec.webp",
    title: "boost energy capsules",
    price: "$29.99",
    bannertitle: "boost your energy levels",
    color: "#fe4e4e",
  },
  {
    primaryImg: "/bestsellerimages/wellness-stress-relief-img-1.webp",
    bannerImg: "/bestsellerimages/stress-relief-1-sec.webp",
    title: "stress relief capsules",
    price: "$29.99",
    bannertitle: "relax naturally, enjoy fully",
    color: "#00a352",
  },
  {
    primaryImg: "/bestsellerimages/wellness-women-muti-img-1.webp",
    bannerImg: "/bestsellerimages/women-muti-img1-sec.webp",
    title: "women's multi capsules",
    price: "$29.99",
    bannertitle: "complete care for your health",
    color: "#ffc1cb",
  },
];

const OurBestsellers = () => {
  return (
    <section className="w-full">
      <Swiper
        modules={[Pagination]}
        slidesPerView={1}
        pagination={{ clickable: true }}
        className=""
      >
        {bestsellerData.map((product) => (
          <SwiperSlide key={product.title}>
            <div className="w-full flex flex-col lg:flex-row">
              {/* Product Card */}
              <div className="w-full lg:w-1/2 bg-white flex items-center justify-center">
                <Link to={"#"} className="w-full max-w-[320px] mx-auto py-8">
                  <div className="flex flex-col justify-center items-center gap-2">
                    <img
                      src={product.primaryImg}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                    <h2 className="w-full py-1 text-text-default text-center font-semibold">
                      {product.title}
                    </h2>
                    <p className="font-bold text-text-default text-center">
                      {product.price}
                    </p>
                  </div>
                </Link>
              </div>

              {/* Banner */}
              <div className="w-full lg:w-1/2 relative">
                <img
                  src={product.bannerImg}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 w-full p-8 flex items-center">
                  <h2 className="text-[28.8px] font-semibold text-text-light uppercase">
                    {product.bannertitle}
                  </h2>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default OurBestsellers;
