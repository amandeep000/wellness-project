import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation } from "lucide-react";
import { Pagination } from "swiper/modules";

type SwiperCarousalProps = {
  slides: string[];
};
const HomeProductswiper = () => {
  return (
    <section className="w-full h-full border-black border-y">
      <div className="w-full h-full">
        {/* swiper */}
        <div>
          <Swiper modules={[Navigation, Pagination]}></Swiper>
        </div>
        {/* content */}
        <div></div>
      </div>
    </section>
  );
};

export default HomeProductswiper;
