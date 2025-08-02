import { Star } from "lucide-react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const slides = [
  {
    Image: "/homereview/pexels-danxavier-1212984.jpg",
    name: "Aura W.",
    description:
      "Finally,a product that delivers on its promises.My skin glows, and i feel amazing inside and out.",
  },

  {
    Image: "/homereview/testimonial-lady.webp",
    name: "Kavya S.",
    description:
      "A game-changer for my daily routine.I wake up refreshed and ready to take on the day like never before!",
  },
];

const FeaturedOn = () => {
  return (
    <section className="pt-6 pb-6 lg:pb-0 border-black border-y">
      <div className="w-full">
        <Splide
          options={{
            perPage: 1,
            pagination: true,
            arrows: false,
          }}
        >
          {slides.map((slide, i) => {
            return (
              <SplideSlide key={i}>
                <div className="w-full h-full flex flex-col justify-center items-center px-4 lg:px-8 pb-10">
                  <img
                    src={slide.Image}
                    alt={`${slide.name}`}
                    className="rounded-full w-[100px] h-[100px] lg:w-[110px] lg:h-[110px] object-cover object-bottom"
                  />
                  <div className="flex items-center justify-center p-4">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <div className="p-1 text-center md:max-w-[563px] lg:max-w-[775px] xl:max-w-[1000px] lg:px-4">
                    <p className="my-6 text-[22px] xl:text-3xl">
                      {slide.description}
                    </p>
                  </div>
                  <div className="mt-2 font-semibold tracking-wide">
                    <p>{slide.name}</p>
                  </div>
                </div>
              </SplideSlide>
            );
          })}
        </Splide>
      </div>
    </section>
  );
};

export default FeaturedOn;
