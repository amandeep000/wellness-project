import ProductReviews from "../components/ProductReviews";
import ProductCard from "../components/ProductCard";
import BoostEnergy from "../components/BoostEnergy";
import FeatureBanner from "../components/FeatureBanner";
import HomeNewsletter from "../components/HomeNewsletter";

const allProducts = [
  {
    slug: "",
    title: "Men's Multi vitamin",
    price: 48.0,
    image: "/productsImage/product1.webp",
    hoverImage: "/productsImage/product1_1.webp",
  },
  {
    slug: "",
    title: "Men's Multi vitamin",
    price: 48.0,
    image: "/productsImage/product1.webp",
    hoverImage: "/productsImage/product1_1.webp",
  },
  {
    slug: "",
    title: "Men's Multi vitamin",
    price: 48.0,
    image: "/productsImage/product1.webp",
    hoverImage: "/productsImage/product1_1.webp",
  },
  {
    slug: "",
    title: "Men's Multi vitamin",
    price: 48.0,
    image: "/productsImage/product1.webp",
    hoverImage: "/productsImage/product1_1.webp",
  },
  {
    slug: "",
    title: "Men's Multi vitamin",
    price: 48.0,
    image: "/productsImage/product1.webp",
    hoverImage: "/productsImage/product1_1.webp",
  },
  {
    slug: "",
    title: "Men's Multi vitamin",
    price: 48.0,
    image: "/productsImage/product1.webp",
    hoverImage: "/productsImage/product1_1.webp",
  },
  {
    slug: "",
    title: "Men's Multi vitamin",
    price: 48.0,
    image: "/productsImage/product1.webp",
    hoverImage: "/productsImage/product1_1.webp",
  },
];

const Shop = () => {
  const handleAddToCart = () => {};
  return (
    <section className="w-full">
      <div className="w-full relative">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/hero/shop-poster.webp"
          className="w-full max-h-[300px] lg:max-h-[480px] object-cover"
        >
          <source src="/hero/hero-video-desktop.webm" />
          <img
            src="/hero/shop-poster.webp"
            alt="background image"
            className="w-full h-full object-cover"
          />
        </video>
        <div className="absolute inset-0 w-full h-full flex justify-center items-center">
          <div className="p-4 w-full">
            <div className="text-center md:w-[40%] md:mx-auto">
              <p className="text-text-light uppercase font-semibold text-sm mb-4">
                Explore our
              </p>
              <h2 className="text-3xl uppercase text-text-light font-bold">
                Wellness Products
              </h2>
            </div>
          </div>
        </div>
      </div>
      {/* plant powered section */}
      <div className="flex flex-col p-4 md:p-8 text-center">
        <div>
          <p className="uppercase tracking-wider pb-3">Plant powered</p>
        </div>
        <div className="text-center">
          <h3 className="uppercase text-[21px] font-bold lg:text-[30px] lg:leading-[43px] text-text-default">
            Daily
            <img
              src="/productshowcase/capsules-png-2.avif"
              alt="capsule image"
              className="h-10 w-10 inline-block mx-1.5"
            />{" "}
            supplements with benefits
            <br />
            for you to
            <img
              src="/productshowcase/happy-feel.avif"
              alt="happy feel image"
              className="h-10 w-10 rounded-full inline-block mx-1.5"
            />{" "}
            feel good
          </h3>
        </div>
      </div>
      {/* all products */}
      <div className="w-full pb-5 border-black border-b">
        <div className="w-full text-center border-black/35 border-b pb-6 flex flex-col">
          <span className="capitalize text-text-default text-sm font-semibold mb-3">{`${allProducts.length} products`}</span>
          <span className="font-bold text-center text-text-default uppercase">
            all products
          </span>
        </div>
        {/* products */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-5 lg:px-8 px-4">
          {allProducts.map((product, i) => (
            <div key={i} className="px-4 w-full">
              <ProductCard product={product} onAddToCart={handleAddToCart} />
            </div>
          ))}
        </div>
      </div>
      {/* reviews & videos */}
      <div className="w-full">
        <ProductReviews />
      </div>
      {/* about us */}
      <div className="w-full border-black border-t">
        <BoostEnergy />
      </div>
      <div className="w-full">
        <FeatureBanner />
      </div>
      <div className="w-full">
        <HomeNewsletter />
      </div>
    </section>
  );
};

export default Shop;
