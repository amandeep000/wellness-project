import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Thumbs, Controller, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Minus } from "lucide-react";
import ProductAccordion from "../components/ProductAccordion";
import Ingredients from "../components/Ingredients";
import ProductReviews from "../components/ProductReviews";
import ReuseAccordion from "../components/ReuseAccordion";
import FeatureBanner from "../components/FeatureBanner";

const productData = {
  product: {
    name: "Boost Energy Capsules",
    type: "boost energy",
    description:
      "Wellness ENERGY is your solution for steady energy, sharp focus, and mental clarity*. Packed with B Vitamins, Vitamin C, and natural caffeine from Green Tea, it keeps you energized and balanced all day.",
    tags: ["green tea", "vitamin c", "energy", "focus", "mental clarity"],
    price: 29.99,
    color: "#00a352",
    images: [
      "/productsImage/product2.webp",
      "/productsImage/stress-relief-image.webp",
      "/productsImage/stress-relief-package-sec.webp",
      "/productsImage/wellness-satisfaction-stress.webp",
    ],
  },

  productInfoSections: [
    {
      title: "Benefits",
      description:
        "Boost Energy Capsules are designed to enhance your mental clarity and provide lasting energy throughout the day. Natural caffeine and essential vitamins support productivity and focus without jitters.",
    },
    {
      title: "How to Take Supplements",
      description:
        "Take two capsules daily with water, preferably in the morning or before periods of focus or physical activity. Do not exceed the recommended dosage.",
    },
    {
      title: "Ingredients",
      description:
        "A powerful blend of natural and scientifically backed ingredients like Vitamin C, B-Vitamins, and Green Tea Extract helps deliver sustained energy and cognitive support.",
    },
  ],

  productType: [
    "/supplementType/energy-icon-1.avif",
    "/supplementType/collagen-icon-2.avif",
    "/supplementType/hair-icon-3.avif",
    "/supplementType/immunity-icon-4.avif",
    "/supplementType/men-icon-5.avif",
    "/supplementType/stress-icon-7.avif",
    "/supplementType/women-icon-8.avif",
  ],

  ingredients: [
    {
      name: "Vitamin C",
      description:
        "A potent antioxidant that helps protect cells from oxidative stress and supports immune function.",
    },
    {
      name: "Green Tea Extract",
      description:
        "Natural source of caffeine and L-theanine to promote energy and mental clarity without crashes.",
    },
    {
      name: "Vitamin B12",
      description:
        "Supports energy metabolism and helps reduce feelings of tiredness and fatigue.",
    },
    {
      name: "Vitamin B6",
      description:
        "Essential for brain development and function, helps in producing neurotransmitters.",
    },
    {
      name: "L-Theanine",
      description:
        "An amino acid found in tea leaves that promotes calm and focused energy, balancing caffeine effects.",
    },
    {
      name: "Rhodiola Rosea",
      description:
        "An adaptogen that may help reduce fatigue and support endurance during physical and mental stress.",
    },
  ],
};
const IngredientItems = [
  {
    title: "Vitamin C",
    desc: "We carefully evaluate every ingredient, ensuring they are non-GMO.",
  },
  {
    title: "Vitamin E",
    desc: "We're dedicated to using scientifically backed, high-quality natural ingredients.",
  },
  {
    title: "Hydrolysed Collagen",
    desc: "Our formulations are crafted to maximize potency and absorption.",
  },
  {
    title: "Iron",
    desc: "We hold ourselves and our ingredients to the highest standards.",
  },
  {
    title: "Zinc",
    desc: "We ensure the highest standards with 100% vegan, cruelty-free formulations.",
  },
  {
    title: "Vitamin A",
    desc: "We guarantee the highest purity, ensuring our products are free from heavy metals.",
  },
];

useEffect(() => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
}, []);
const ProductPage = () => {
  const [thumbSwiper, setThumbSwiper] = useState<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [numberOfProducts, setNumberOfProducts] = useState(0);
  const totalSlides = productData.product.images.length;
  const handleIncrement = () => {
    setNumberOfProducts((prev) => prev + 1);
  };
  const handleDecrement = () => {
    if (numberOfProducts > 0) {
      setNumberOfProducts((prev) => prev - 1);
    }
  };
  const handleAddToCart = () => {};
  return (
    <section className={`w-full `}>
      {/* container div */}
      <div
        className="w-full px-4 pt-5 pb-8 lg:px-8"
        style={{ backgroundColor: productData.product.color }}
      >
        {/* product section */}
        <div className="w-full flex flex-col lg:flex-row gap-4 lg:gap-16 xl:gap-20 sticky">
          <div className="w-full lg:w-1/2">
            {/* div for thumb */}
            <div className="flex justify-between gap-2.5 sticky top-[80px]">
              <div className="w-[90px] max-h-[500px] hidden lg:block shrink-0">
                <Swiper
                  direction="vertical"
                  slidesPerView={4}
                  spaceBetween={10}
                  onSwiper={setThumbSwiper}
                  watchSlidesProgress
                  slideToClickedSlide
                  onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                  modules={[FreeMode, Thumbs]}
                  className="h-full"
                >
                  {productData.product.images.map((img, i) => (
                    <SwiperSlide
                      key={i}
                      className={`cursor-pointer !w-[80px] !h-[80px] !rounded-lg ${activeIndex === i ? "border-white border-2" : " border-none"}`}
                    >
                      <img
                        src={img}
                        alt={productData.product.name}
                        className="object-cover w-full h-full rounded-lg"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <div className="w-full flex-1 relative min-w-0">
                <Swiper
                  modules={[FreeMode, Thumbs]}
                  slidesPerView={1}
                  spaceBetween={10}
                  thumbs={{ swiper: thumbSwiper }}
                  onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                  className="rounded-lg"
                >
                  {productData.product.images.map((img, index) => (
                    <SwiperSlide key={index} className="">
                      <Link to={"#"}>
                        {" "}
                        <img
                          src={img}
                          alt={productData.product.name}
                          className="object-cover w-full h-full"
                        />
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <p
                  className={`absolute bottom-2 left-2 text-sm text-white border-white border-[1px] py-2 px-2 rounded-lg z-10 lg:hidden`}
                  style={{ background: productData.product.color }}
                >
                  {activeIndex + 1} / {totalSlides}
                </p>
                {/* progress bar */}
                {/* <div className="absolute -bottom-3.5 left-0 w-full h-[3px] bg-black/20 overflow-hidden z-10 rounded-lg">
                <div
                  className="bg-black h-full transition-all duration-300"
                  style={{
                    width: `${((activeIndex + 1) / totalSlides) * 100}%`,
                  }}
                />
              </div> */}
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 flex flex-col">
            {}
            <div className="w-full flex flex-col">
              <span className="uppercase text-white text-xs w-full">
                Plant based
              </span>
              <h1 className="text-text-light text-[25.3px] font-bold uppercase lg:text-5xl lg:my-2">
                {productData.product.name}
              </h1>
            </div>
            {/* tags */}
            <div className="w-full my-2">
              <ul className="w-full flex gap-2">
                {productData.product.tags.map((tag, i) => (
                  <li
                    key={i}
                    className="border-white border text-text-light text-xs px-1.5 py-1 rounded-xl flex justify-center items-center capitalize"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
            {/* product description */}
            <div className="w-full text-text-light pt-2 pb-4">
              <p>{productData.product.description}</p>
            </div>
            {/* product filter links */}
            <div className="full pt-1.5 pb-2.5">
              <span className="text-text-light text-sm capitalize">
                choose supplement: <strong>{productData.product.type}</strong>
              </span>
              <div className="h-full">
                <ul className="w-full flex items-center gap-3 mt-1">
                  {productData.productType.map((item, index) => (
                    <li key={index}>
                      <Link to={"#"}>
                        <img
                          src={item}
                          alt="icons"
                          className="w-[40px] h-[40px] rounded-full"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* price */}
            <div className="w-full flex flex-col">
              <span className="text-[22.4px] font-bold text-text-default">
                ${productData.product.price}
              </span>

              <span className="text-[10px] capitalize text-text-default">
                tax included
              </span>
            </div>
            {/* add to cart */}
            <div className="w-full flex items-center gap-4 py-4">
              <div className="flex items-center border border-white rounded-lg overflow-hidden p-0.5">
                {/* Decrement */}
                <button
                  onClick={handleDecrement}
                  className="py-2 px-3 text-white"
                >
                  <Minus className="w-5 h-5" />
                </button>

                {/* Quantity Display */}
                <p className="py-2 px-4 text-lg font-semibold text-white">
                  {numberOfProducts}
                </p>

                {/* Increment */}
                <button
                  onClick={handleIncrement}
                  className="py-2 px-3 text-white"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              {/* add to cart button */}
              <div className="w-full flex-1">
                {" "}
                <button
                  onClick={handleAddToCart}
                  className="w-full text-xs py-4 px-6 text-center rounded-lg bg-black tracking-wider text-white font-bold uppercase"
                >
                  Add To Cart
                </button>
              </div>
            </div>
            {/* happy customers */}
            <div
              className="w-full"
              style={{ background: productData.product.color }}
            >
              <p className="capitalize text-center w-full backdrop:blur-3xl bg-black/10 rounded-lg p-2">
                +10000 happy customers | free shiping across india
              </p>
            </div>
            <div className="w-full">
              <ProductAccordion />
            </div>
          </div>
        </div>
      </div>
      {/* ingredients */}
      <div className="w-full">
        <Ingredients items={IngredientItems} />
      </div>
      {/* reviews*/}
      <div className="w-full">
        <ProductReviews />
      </div>
      {/* faq's */}
      <div className="w-full pt-10">
        <div className="w-full px-4 text-center">
          <div className="p-4 md:p-8">
            <p className="capitalize">Everything you need to know!</p>
            <h2 className="uppercase font-bold text-lg">
              frequently asked questions
            </h2>
          </div>
        </div>
        <div className="px-4">
          <ReuseAccordion />
        </div>
      </div>
      {/* feature banner */}
      <div className="w-full pt-6">
        <FeatureBanner />
      </div>
    </section>
  );
};

export default ProductPage;
