import { Link } from "react-router-dom";
type ProductProps = {
  slug: string;
  title: string;
  price?: number;
  image: string;
  hoverImage?: string;
};
interface ProductCardProps {
  product: ProductProps;
  onAddToCart?: (product: ProductProps) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <div className="w-full max-w-xs sm:max-w-sm md:max-w-md 2xl:max-w-full flex flex-col mx-auto">
      <Link
        to={`/product/${product.slug}`}
        className="relative w-full aspect-[4/4] overflow-hidden group block"
      >
        <img
          src={product.image}
          alt={`${product.title} image`}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-100 group-hover:opacity-0 "
        />
        {product.hoverImage && (
          <img
            src={product.hoverImage}
            alt={`${product.title} alternate image`}
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
        )}
        {onAddToCart && (
          <button
            onClick={() => onAddToCart(product)}
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
          {product.title}
        </h3>
        {product.price !== undefined && (
          <span className="text-sm md:text-base text-muted-foreground">
            {`$${product?.price?.toFixed(2)}`}
          </span>
        )}
      </Link>

      {onAddToCart && (
        <button
          onClick={() => onAddToCart(product)}
          className="px-4 w-full border border-foreground text-center rounded-lg bg-background py-2 text-sm hover:bg-text-default hover:text-text-light hover:border-none transition-all duration-300 ease-in-out lg:hidden"
        >
          Add To Cart
        </button>
      )}
    </div>
  );
};

export default ProductCard;
