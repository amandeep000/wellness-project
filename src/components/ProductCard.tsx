import { useCart } from "../hooks/useCart";
import { Link } from "react-router-dom";
import { useState } from "react";
type ProductProps = {
  _id: string;
  slug: string;
  name: string;
  price?: number;
  stock?: number;
  image: string;
  hoverImage?: string;
  bgColor?: string;
  images?: string[];
};
interface ProductCardProps {
  product: ProductProps;
  onAddToCart?: (product: ProductProps) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const { addProductToCart, isItemInCart, getItemQuantity } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const hasValidId = product._id && product._id.trim() !== "";
  console.log("Product ID Check:", {
    hasId: !!product._id,
    idValue: product._id,
    hasValidId,
    slug: product.slug,
  });
  const completeProduct = {
    ...product,
    id: product._id!,
    price: product.price || 0,
    stock: product.stock || 100,
    images: product.images || [product.image],
    bgColor: product.bgColor || "#FFFFFF",
  };

  const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(
      "product being added to cart in product card: ",
      completeProduct
    );
    if (!completeProduct.price) {
      console.warn("cannot add product without price");
      return;
    }

    setIsAdding(true);
    try {
      addProductToCart(completeProduct, 1);
      setTimeout(() => {
        setIsAdding(false);
      }, 1000);
    } catch (error) {
      console.error("failed to add to cart: ", error);
      setIsAdding(false);
    }
  };
  const itemInCart = hasValidId ? isItemInCart(product._id!) : false;
  const cartQuantity = hasValidId ? getItemQuantity(product._id!) : 0;
  return (
    <div className="w-full max-w-xs sm:max-w-sm md:max-w-md 2xl:max-w-full flex flex-col mx-auto">
      <Link
        to={`/product/${product?.slug}`}
        className="relative w-full aspect-[4/4] overflow-hidden group block"
      >
        <img
          src={product.image}
          alt={`${product.name} image`}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-100 group-hover:opacity-0 "
        />
        {product.hoverImage && (
          <img
            src={product.hoverImage}
            alt={`${product.name} alternate image`}
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
        )}
        {onAddToCart && (
          <button
            onClick={handleAddToCart}
            disabled={isAdding || !product.price}
            className="absolute hidden lg:block bottom-0 translate-y-[40px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-in-out w-full border border-foreground text-center rounded-lg bg-background py-2 text-sm hover:bg-text-default hover:text-text-light hover:border-none px-4 cursor-pointer"
          >
            Add To Cart
          </button>
        )}
      </Link>

      <Link
        to={`/product/${product.slug}`}
        className="py-2 flex flex-col gap-1 text-center group"
      >
        <h3 className="text-base md:text-lg font-semibold text-foreground group-hover:underline">
          {product.name}
        </h3>
        {product.price !== undefined && (
          <span className="text-sm md:text-base text-muted-foreground">
            {`$${product?.price?.toFixed(2)}`}
          </span>
        )}
      </Link>

      {onAddToCart && (
        <button
          onClick={handleAddToCart}
          disabled={isAdding || !product.price}
          className="px-4 w-full border border-foreground text-center rounded-lg bg-background py-2 text-sm hover:bg-text-default hover:text-text-light hover:border-none transition-all duration-300 ease-in-out lg:hidden"
        >
          Add To Cart
        </button>
      )}
    </div>
  );
};

export default ProductCard;
