import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
const slides = [
  {
    Image: "/pagesGraphicData/team-ceo.webp",
    name: "Amanda Turner",
    title: "CEO & Founder",
  },
  {
    Image: "/pagesGraphicData/team-r&d.webp",
    name: "Michael Robinson",
    title: "Head of Research & Development",
  },
  {
    Image: "/pagesGraphicData/team-marketing.webp",
    name: "Jessica Nguyen",
    title: "Head of Marketing",
  },
  {
    Image: "/pagesGraphicData/team-coo.webp",
    name: "Ethan Carter",
    title: "Chief Operations Officer",
  },
];

const OurTeam = () => {
  return (
    <section className="w-full px-4">
      <div className="w-full">
        <Swiper
          modules={[Pagination]}
          spaceBetween={16}
          slidesPerView={1.2}
          pagination={{ clickable: true }}
          breakpoints={{
            1024: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
          }}
          className=""
        >
          {slides.map((slide, i) => (
            <SwiperSlide key={i} className="pb-12">
              <div className="w-full flex flex-col gap-4">
                <div className="w-full aspect-[4/3]">
                  <img
                    src={slide.Image}
                    alt={slide.name}
                    className="w-full h-full object-cover rounded-[12px]"
                  />
                </div>
                <div className="flex flex-col mt-2">
                  <h2 className="uppercase mb-2 font-bold tracking-wider text-lg">
                    {slide.name}
                  </h2>
                  <p className="capitalize pb-2 text-sm">{slide.title}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default OurTeam;
