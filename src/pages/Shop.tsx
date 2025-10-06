import ProductReviews from "../components/ProductReviews";
import ProductCard from "../components/ProductCard";
import BoostEnergy from "../components/BoostEnergy";
import FeatureBanner from "../components/FeatureBanner";
import HomeNewsletter from "../components/HomeNewsletter";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useProducts, useproductByCategory } from "../hooks/useProduct";
import Loader from "../components/Loader";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../components/ui/pagination";

type ProductProps = {
  _id: string;
  slug: string;
  name: string;
  price?: number;
  image: string;
  hoverImage?: string;
  textColor?: string;
};

const Shop = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const productsQuery =
    categorySlug === "shopall"
      ? useProducts()
      : useproductByCategory(categorySlug || "");
  const { data: products, isLoading, error } = productsQuery;
  const handleAddToCart = () => {};

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const productRef = useRef<HTMLDivElement>(null);

  // reset page to 1 after category change
  useEffect(() => {
    setCurrentPage(1);
  }, [categorySlug]);

  // scroll to products section when page changes
  useEffect(() => {
    if (productRef.current) {
      productRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [currentPage]);

  // scroll to top of the page on initial load
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  if (isLoading)
    return (
      <div className="w-full m-auto min-h-screen flex justify-center items-center">
        <Loader />
      </div>
    );

  if (error)
    return (
      <div className="text-center p-8 text-red-500">
        Failed to load products
      </div>
    );

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

  //pagination calculations
  const totalProducts = productsForCards.length;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = productsForCards.slice(startIndex, endIndex);

  // handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // gen page number with ellipses
  const renderPageNumber = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages < maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => handlePageChange(i)}
              isActive={currentPage === i}
              className="cursor-pointer"
              size="sm"
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      // show first page always
      pages.push(
        <PaginationItem key={1}>
          <PaginationLink
            onClick={() => handlePageChange(1)}
            isActive={currentPage === 1}
            className="cursor-pointer"
            size="sm"
          >
            1
          </PaginationLink>
        </PaginationItem>
      );

      // show ellipsis after page 1
      if (currentPage > 3) {
        pages.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      // show current page and neighbours
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => handlePageChange(i)}
              isActive={currentPage === i}
              className="cursor-pointer"
              size="sm"
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
      // Show ellipsis before last page
      if (currentPage < totalPages - 2) {
        pages.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      // Show last page
      pages.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            onClick={() => handlePageChange(totalPages)}
            isActive={currentPage === totalPages}
            className="cursor-pointer"
            size="sm"
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return pages;
  };

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
      <div className="w-full pb-5 border-black border-b" ref={productRef}>
        <div className="w-full text-center border-black/35 border-b pb-6 flex flex-col">
          <span className="capitalize text-text-default text-sm font-semibold mb-3">{`${totalProducts} products`}</span>
          <span className="font-bold text-center text-text-default uppercase">
            Shop our Products
          </span>
          <span className="text-sm text-text-default/70 mt-2">
            page {currentPage} of {totalPages}
          </span>
        </div>
        {/* products */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-5 lg:px-8 px-4">
          {currentProducts.map((product, i) => (
            <div key={i} className="px-4 w-full">
              <ProductCard product={product} onAddToCart={handleAddToCart} />
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="w-full flex justify-center py-8">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      handlePageChange(Math.max(currentPage - 1, 1))
                    }
                    className={
                      currentPage === 1
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                    size="sm"
                  />
                </PaginationItem>

                {renderPageNumber()}

                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      handlePageChange(Math.min(currentPage + 1, totalPages))
                    }
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                    size="sm"
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
      {/* reviews & videos */}
      {/* <div className="w-full">
        <ProductReviews />
      </div> */}
      {/* about us */}
      {/* <div className="w-full border-black border-t">
        <BoostEnergy />
      </div> */}
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
