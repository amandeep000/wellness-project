import FeaturedonText from "./FeaturedonText";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import LinkButton from "./LinkButton";

interface SlideData {
  image: string;
  date: string;
  title: string;
  description: string;
  link: string;
}

const slides = [
  {
    Image: "/blogImages/blog-omega-3_.webp",
    date: "January 20, 2025",
    title: "The Power of Omega-3: Why You Need It in Your Diet",
    description:
      "Omega-3 fatty acids are essential fats that play a critical role in maintaining overall health. Unlike some nutrients that your body can produce, Omega-3s must come from your diet or...",
    link: "#",
  },
  {
    Image: "/blogImages/blog-post-2.webp",
    date: "January 19, 2025",
    title: "Feel Better Every Day: Supplements for a Happier, Healthier You",
    description:
      "Life can be demanding, and feeling your best every day can sometimes feel like a challenge. But what if there was a simple way to boost your energy, mood, and..",
    link: "#",
  },
  {
    Image: "/blogImages/blog-post-3c.webp",
    date: "January 19, 2025",
    title: "The Science Behind Quality: Inside Our Supplement Laboratory",
    description:
      "When it comes to supplements, quality is everything. That’s why we’ve made it our mission to ensure every product you purchase meets the highest standards of safety and efficacy. At...",
    link: "#",
  },
];

const FeaturedOn = () => {
  return (
    <section className="pt-6 pb-6 lg:pb-0 border-black border-b">
      <FeaturedonText />
      <div className="w-full">
        <Splide
          options={{
            perPage: 3,
            pagination: true,
            arrows: false,
            breakpoints: {
              325: { perPage: 1 },
              640: { perPage: 1 },
              768: { perPage: 1 },
              1024: { perPage: 3 },
            },
          }}
        >
          {slides.map((slide, i) => {
            return (
              <SplideSlide key={i}>
                <div className="w-full h-full flex flex-col justify-between pb-10 lg:pb-6">
                  <img src={slide.Image} alt={slide.title} />
                  <div className=" w-fullflex flex-col justify-start items-center pl-6 pr-4">
                    <h3 className="w-full text-start text-[rgba(21,21,22,0.4)] text-xs font-semibold pt-4 uppercase tracking-wide]">
                      {slide.date}
                    </h3>
                    <h2 className="font-bold uppercase py-3">{slide.title}</h2>
                    <p className="text-sm font-semibold text-text-default py-1">
                      {slide.description}
                    </p>
                  </div>
                  <div className="pl-4 pr-6 py-4  ">
                    <LinkButton
                      to={slide.link}
                      className="text-text-default text-sm font-semibold tracking-wider uppercase relative after:content-[''] after:block after:h-[1px] after:bg-text-default after:absolute after:-bottom-1 after:w-full"
                    >
                      read more
                    </LinkButton>
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
