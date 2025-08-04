import ProductCard from "./ProductCard";
import { useState } from "react";
import { Link } from "react-router-dom";

const Search = () => {
  const [isLoading, setIsLoading] = useState(false);
  const products = [
    {
      slug: "#",
      title: "boost energy capsule",
      image: "/productsImage/wellness-boost-energy.webp",
    },
    {
      slug: "#",
      title: "woman's multi capsules",
      image: "/productsImage/wellness-women.webp",
    },
    {
      slug: "#",
      title: "hair, skin & nails capsules",
      image: "/productsImage/wellness-hair-skin-nails.webp",
    },
    {
      slug: "#",
      title: "stress relief capsules",
      image: "/productsImage/wellness-stress-relief.webp",
    },
  ];

  return (
    <section className="w-full py-6 h-screen bg-bg">
      <div className="w-full px-4">
        <div className="w-full">
          <div className="w-full flex max-w-[750px] mx-auto justify-between items-center gap-3">
            <div className="relative w-full border border-black rounded-lg flex flex-1 bg-[#ffffff]">
              <label
                htmlFor="search"
                className="flex justify-center items-center pl-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1"
                  stroke="currentColor"
                  className="size-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </label>
              <input
                type="text"
                placeholder="Search..."
                autoFocus
                id="search"
                className="w-full flex-1 py-3 px-4 outline-none"
              />
            </div>
            <span className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1"
                stroke="currentColor"
                className="size-11"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </span>
          </div>
        </div>
        {/* productshowcase */}
        <div className="w-full mt-4">
          <div className="flex justify-center items-center uppercase font-bold mb-4">
            Most popular
          </div>
          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {products.map((product, i) => (
              <li key={i} className="w-full aspect-3/4 mx-auto cursor-pointer">
                <div className="w-full max-w-[232px] flex flex-col justify-center items-center">
                  <Link to={product.slug}>
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                    <h3 className="mt-2 text-center capitalize">
                      {product.title}
                    </h3>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Search;
