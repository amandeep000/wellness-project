import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

const Productshowcase = () => {
  const products = [
    {
      slug: "men-multi-capsules",
      name: "Men's Multi vitamin",
      price: 34.99,
      image: "/productsImage/product1.webp",
      hoverImage: "/productsImage/product1_1.webp",
    },
    {
      slug: "stress-relief-capsule",
      name: "Stress Relief Capsules",
      price: 29.99,
      image: "/filters/stressRelief.webp",
      hoverImage: "/filters/capsule-stress-r-hover.webp",
    },
    {
      slug: "collagen-capsules",
      name: "Collagen Capsules",
      price: 34.99,
      image: "/filters/skincare.webp",
      hoverImage: "/filters/skincareHover.webp",
    },
    {
      slug: "immunity-boost-capsules",
      name: "Immunity Capsules",
      price: 29.99,
      image: "/filters/immunity.webp",
      hoverImage: "/filters/immunity-hover.webp",
    },
  ];
  const handleAddToCart = () => {
    console.log("Added to cart:");
  };
  return (
    <section className="w-full flex-col gap-4 px-4 border border-b pb-11">
      <div className="flex flex-col p-4 md:p-8 text-center">
        <div>
          <p className="uppercase tracking-wider">Plant powered</p>
        </div>
        <div className="text-center">
          <h3 className="uppercase text-[21px] font-[700] lg:text-[28px] text-text-default">
            Daily
            <img
              src="/productshowcase/capsules-png-2.avif"
              alt="capsule image"
              className="h-8 w-8 inline-block"
            />{" "}
            supplements with benefits
            <br />
            for you to
            <img
              src="/productshowcase/happy-feel.avif"
              alt="happy feel image"
              className="h-8 w-8 rounded-full inline-block"
            />{" "}
            feel good
          </h3>
        </div>
      </div>
      {/* products */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, i) => (
          <div key={i} className="w-full max-w-xs mx-auto">
            <Link
              to={`/product/${product.slug}`}
              className="relative w-full aspect-[4/4] overflow-hidden group block"
            >
              <img
                src={product.image}
                alt={`${product.name} image`}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-100 group-hover:opacity-0"
              />
              {product.hoverImage && (
                <img
                  src={product.hoverImage}
                  alt={`${product.name} alternate image`}
                  className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              )}
            </Link>

            <Link
              to={`/product/${product.slug}`}
              className="py-2 flex flex-col gap-1 text-center group"
            >
              <h3 className="text-base md:text-lg font-semibold text-foreground group-hover:underline">
                {product.name}
              </h3>
              <span className="text-sm md:text-base text-muted-foreground">
                ${product.price.toFixed(2)}
              </span>
            </Link>
          </div>
        ))}
      </div>

      <div className="w-full text-center mt-4">
        <Link
          to={"/shop/shopall"}
          className="uppercase tracking-wider text-xs font-semibold border-b"
        >
          View all
        </Link>
      </div>
    </section>
  );
};

export default Productshowcase;
