import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { useAppDispatch, useAppSelector } from "../hooks/TypedHooks";
import { closeShopDropdown } from "../store/slices/HeaderSlice";

const ShopHover = () => {
  const listData = [
    {
      image: "/productsImage/wellness-explore-banner.webp",
      title: "View All Products",
      slug: "/shop",
    },
    {
      image: "/productsImage/product1.webp",
      title: "women's multi capsule",
      slug: "",
    },
    {
      image: "/productsImage/product2.webp",
      title: "immunity boost capsules",
      slug: "",
    },
    {
      image: "/productsImage/product1.webp",
      title: "Natural collagen capsules",
      slug: "",
    },
    {
      image: "/productsImage/product2.webp",
      title: "Boost energy capsules",
      slug: "",
    },
    {
      image: "/productsImage/product2.webp",
      title: "men's multi capsules",
      slug: "",
    },
  ];
  const handleShopHoverClick = () => {
    dispatch(closeShopDropdown());
  };
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.header.isShopDropdownOpen);

  return (
    <motion.section
      initial={false} // prevents initial jitter
      animate={
        isOpen
          ? { opacity: 1, y: 0, pointerEvents: "auto" }
          : { opacity: 0, y: -8, pointerEvents: "none" }
      }
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="fixed top-[73.6px] left-0 w-full max-h-[60vh] bg-white shadow-md z-40"
      onMouseLeave={() => dispatch(closeShopDropdown())}
    >
      <div className="px-4 py-8">
        <ul className="flex flex-row justify-center items-center gap-3">
          {listData.map((item) => (
            <li key={item.title} className="w-full">
              <Link to={item.slug} onClick={handleShopHoverClick}>
                <div className="flex flex-col justify-center items-center w-full">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <h3 className="text-text-default capitalize">{item.title}</h3>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
};

export default ShopHover;
