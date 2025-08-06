import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useState, useRef, useEffect } from "react";
import { Star } from "lucide-react";

const reviews = [
  {
    review: `"A game-changer for my daily routine. I wake up refreshed and ready to take on the day like never before!"`,
    name: "martha w.",
    poster: "/reviewsvideos/marthaW-img.webp",
    video: "/reviewsvideos/marthaWvideo.webm",
  },
  {
    review: `"These supplements have truly changed my life! I feel healthier, more energetic, and confident every day."`,
    name: "emma t.",
    poster: "/reviewsvideos/emmaT.webp",
    video: "/reviewsvideos/emmaT.webm",
  },
  {
    review: `"I was skeptical at first, but after just a few weeks, I noticed a huge difference in my energy and mood!"`,
    name: "mark d.",
    poster: "/reviewsvideos/markD.webp",
    video: "/reviewsvideos/markD.webm",
  },
  {
    review: `"I’ve tried so many supplements, but nothing compares to these. I feel like the best version of myself!"`,
    name: "hubert e.",
    poster: "/reviewsvideos/hubertE.webp",
    video: "/reviewsvideos/hubertE.webm",
  },
  {
    review: `"A game-changer for my daily routine. I wake up refreshed and ready to take on the day like never before!"`,
    name: "olivia r.",
    poster: "/reviewsvideos/oliviaR.webp",
    video: "/reviewsvideos/oliviaR.webm",
  },
];
const reviewData = [...reviews, ...reviews];

const ProductReviews = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRefs = useRef<HTMLVideoElement[]>([]);
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === activeIndex) {
          video.play().catch((err) => {});
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  }, [activeIndex]);
  return (
    <section className="pt-[52px] pb-5 w-full">
      <div className="w-full pt-2 pb-6 text-center">
        <h2 className="text-lg font-bold uppercase">
          Real stories, real results
        </h2>
      </div>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={false}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        speed={800}
        pagination={{ clickable: true }}
        loop={true}
        centeredSlides={true}
        slidesPerView="auto"
        spaceBetween={16}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className=""
      >
        {reviewData.map((review, index) => {
          const isActive = index === activeIndex;

          return (
            <SwiperSlide
              key={index}
              className="!w-[311px] sm:!w-[347px] md:!w-[432px] lg:!w-[400px] xl:!w-[300px] flex flex-col items-center pb-7"
            >
              <div className="h-[520px] md:h-[720px] lg:h-[666px] xl:h-[500px] flex items-center justify-center overflow-hidden relative">
                <video
                  ref={(el) => {
                    if (el) videoRefs.current[index] = el;
                  }}
                  src={review.video}
                  loop
                  muted
                  playsInline
                  poster={review.poster}
                  className={`transition-all duration-500 ease-in-out rounded-lg w-full object-cover ${
                    isActive
                      ? "h-[520px] md:h-[720px] lg:h-[666px] xl:h-[500px]"
                      : "h-[415px] md:h-[576px] lg:h-[533px] xl:h-[415px]"
                  }`}
                />
                <div
                  className={`absolute ${activeIndex === index ? "visible" : "invisible"} transition-all duration-300 ease-in bottom-6 left-1/2 -translate-x-1/2 flex gap-4 backdrop:backdrop-blur-lg bg-black/30 p-2 rounded-lg`}
                >
                  <span className="flex justify-between items-center gap-1">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className="w-4 h-4 fill-white text-white"
                      />
                    ))}
                  </span>
                  <span className="text-white font-semibold">5/5</span>
                </div>
              </div>

              <div
                className={`${activeIndex === index ? "opacity-100" : "opacity-0"} transition-all duration-300 ease-in-out mb-4 text-center flex flex-col gap-2.5 mt-4`}
              >
                <p className="lg:px-2">{review.review}</p>
                <p className="capitalize text-black/60">{review.name}</p>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default ProductReviews;
