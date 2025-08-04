import { Link } from "react-router-dom";

const ShopHover = () => {
  const listData = [
    {
      image: "/productsImage/wellness-explore-banner.webp",
      title: "View All Products",
    },
    {
      image: "/productsImage/product1.webp",
      title: "women's multi capsule",
    },
    {
      image: "/productsImage/product2.webp",
      title: "immunity boost capsules",
    },
    {
      image: "/productsImage/product1.webp",
      title: "Natural collagen capsules",
    },
    {
      image: "/productsImage/product2.webp",
      title: "Boost energy capsules",
    },
    {
      image: "/productsImage/product2.webp",
      title: "men's multi capsules",
    },
  ];
  return (
    <section className="w-full max-h-[60vh]">
      <div className="px-4 py-8">
        <ul className="flex flex-row justify-center items-center gap-3">
          {listData.map((item, idx) => (
            <li className="w-full">
              <Link to={"#"}>
                <div
                  key={item.title}
                  className="flex flex-col justify-center items-center w-full"
                >
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
    </section>
  );
};

export default ShopHover;
