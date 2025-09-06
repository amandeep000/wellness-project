import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, X } from "lucide-react";
import Loader from "../components/Loader";
import { useSearchProducts } from "../hooks/useProduct";

type ProductProps = {
  _id: string;
  slug: string;
  name: string;
  price?: number;
  image: string;
  hoverImage?: string;
};

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const {
    data: products,
    isLoading,
    error,
  } = useSearchProducts(debouncedQuery);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  const productsForCards: ProductProps[] = (products ?? []).flatMap((prod) =>
    prod._id
      ? [
          {
            _id: prod._id,
            slug: prod.slug,
            name: prod.name,
            price: prod.price,
            image: prod.images[0],
            hoverImage: prod.images[1],
          } satisfies ProductProps,
        ]
      : []
  );

  return (
    <section className="w-full min-h-screen">
      <div className="w-full bg-gradient-to-br from-green-50 to-emerald-100 py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-text-default mb-4">
              Find Your Perfect Product
            </h1>
            <p className="text-text-light text-sm lg:text-base max-w-md mx-auto">
              Discover wellness products that match your needs
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-full border-2 border-transparent bg-white shadow-lg focus:border-green-500 focus:outline-none text-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="container mx-auto px-4 py-8">
        {!debouncedQuery.trim() ? (
          /* Empty State */
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold text-text-default mb-4">
              Start Your Search
            </h2>
            <p className="text-text-light max-w-md mx-auto">
              Enter a keyword above to discover amazing wellness products
              tailored just for you.
            </p>
          </div>
        ) : isLoading ? (
          /* Loading State with class component*/
          <div className="w-full min-h-[400px] flex justify-center items-center">
            <Loader />
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
              <X className="w-12 h-12 text-red-500" />
            </div>
            <h2 className="text-2xl font-semibold text-text-default mb-4">
              Something went wrong
            </h2>
            <p className="text-red-500 mb-4">Failed to load search results</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            {/* Results Header */}
            <div className="w-full text-center border-black/35 border-b pb-6 flex flex-col mb-8">
              <span className="capitalize text-text-default text-sm font-semibold mb-3">
                {`${products?.length ?? 0} products found`}
                {debouncedQuery && (
                  <span className="text-gray-500 ml-2">
                    for "{debouncedQuery}"
                  </span>
                )}
              </span>
              <span className="font-bold text-center text-text-default uppercase">
                Search Results
              </span>
            </div>

            {products?.length === 0 ? (
              /* No Resultza */
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Search className="w-12 h-12 text-yellow-500" />
                </div>
                <h2 className="text-2xl font-semibold text-text-default mb-4">
                  No products found
                </h2>
                <p className="text-text-light max-w-md mx-auto mb-6">
                  We couldn't find any products matching "{debouncedQuery}". Try
                  different keywords.
                </p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                >
                  Clear Search
                </button>
              </div>
            ) : (
              /*custom Product Cards */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {productsForCards.map((product) => (
                  <div key={product._id} className="w-full max-w-xs mx-auto">
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
                        ${product.price?.toFixed(2)}
                      </span>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default SearchPage;
