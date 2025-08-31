import { useState, useEffect, useLayoutEffect } from "react";
import { HiMinus, HiPlus } from "react-icons/hi";
import { FiX, FiAlertCircle } from "react-icons/fi";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/TypedHooks";
import api from "../api/axios";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);
const Cart = () => {
  const {
    items,
    totalItems,
    totalAmount,
    closeCartDrawer,
    incrementItem,
    decrementItem,
    removeItem,
    getFreeShippingAmount,
    syncCartWithBackend,
  } = useCart();
  const isCartDrawerOpen = useAppSelector((state) => state.cart.isCartOpen);
  const { data: currentUser, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const freeShippingAmount = getFreeShippingAmount();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  // lock bg scroll
  useLayoutEffect(() => {
    if (isCartDrawerOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
    } else {
      const y = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      if (y) window.scrollTo(0, -parseInt(y));
    }
    return () => {
      /* cleanup in case of unmount */
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
    };
  }, [isCartDrawerOpen]);

  /* checkout handler */
  const handleCheckout = async () => {
    if (authLoading || isCheckingOut) return;
    setCheckoutError(null);

    if (!currentUser) {
      closeCartDrawer();
      navigate("/login", { replace: true, state: { from: "/cart" } });
      return;
    }

    setIsCheckingOut(true);
    try {
      await syncCartWithBackend();
      const { data } = await api.post("/api/v1/checkout/session");
      const stripe = await stripePromise;
      await stripe!.redirectToCheckout({ sessionId: data.data.sessionId });
      closeCartDrawer();
    } catch (error: any) {
      const message = String(error?.message || "");
      const errorMessage = message.includes("product")
        ? "Some items in your cart are no longer available. Please review and update your cart."
        : message.includes("network") || message.includes("fetch")
          ? "Connection issue. Please check your internet and try again."
          : "Unable to proceed to checkout. Please try again.";
      setCheckoutError(errorMessage);
    } finally {
      setIsCheckingOut(false);
    }
  };

  useEffect(() => {
    if (checkoutError) setCheckoutError(null);
  }, [items.length]);

  return (
    <aside
      className={`w-full min-h-screen md:max-w-[445px] lg:max-w-[500px] border-black border-l bg-white fixed top-0 right-0 z-40 transform transition-transform duration-300 ease-in-out ${
        isCartDrawerOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex flex-col h-screen">
        <header className="w-full px-6 py-4 border-black border-b xl:py-[22px]">
          <div className="flex justify-between items-center w-full">
            <h3 className="uppercase text-lg text-black font-semibold">
              your cart ({totalItems})
            </h3>
            <button
              onClick={closeCartDrawer}
              className="cursor-pointer p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close cart drawer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </header>

        <div className="flex-1 h-full">
          {items.length === 0 ? (
            /* Empty cart message */
            <div className="flex flex-col items-center justify-center h-full text-center p-6">
              <div className="mb-4">
                <svg
                  className="w-16 h-16 mx-auto text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13"
                  />
                  <circle cx="9" cy="20" r="1" />
                  <circle cx="20" cy="20" r="1" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M7 13l-1.5 3h11.5"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
              <p className="text-gray-600">Add some products to get started!</p>
            </div>
          ) : (
            <div className="px-6 mt-6 mb-2 h-full">
              <div className="w-full capitalize font-semibold mb-4 border-black border-b">
                {freeShippingAmount > 0 ? (
                  <p className="pb-2.5">
                    Spend ${freeShippingAmount.toFixed(2)} more for free
                    shipping!
                  </p>
                ) : (
                  <p className="text-green-600 pb-2.5">
                    🎉 You qualify for free shipping!
                  </p>
                )}
              </div>

              <ul className="w-full space-y-4 h-full overflow-y-auto pr-1">
                {items.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onIncrement={() => incrementItem(item.id)}
                    onDecrement={() => decrementItem(item.id)}
                    onRemove={() => removeItem(item.id)}
                  />
                ))}
              </ul>
            </div>
          )}
        </div>
        {/* footer */}
        <footer className="w-full p-4 border-black border-t bg-white">
          {checkoutError && (
            <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
              <FiAlertCircle
                className="text-red-500 mt-0.5 flex-shrink-0"
                size={16}
              />
              <div className="flex-1">
                <p className="text-red-800 text-sm">{checkoutError}</p>
                <button
                  onClick={() => setCheckoutError(null)}
                  className="text-red-600 text-xs underline mt-1 hover:text-red-800"
                >
                  Dismiss
                </button>
              </div>
            </div>
          )}

          <div className="w-full py-2 flex justify-between items-center">
            <h3 className="text-sm font-semibold">Subtotal ({totalItems})</h3>
            <h3 className="text-lg font-bold">${totalAmount.toFixed(2)}</h3>
          </div>

          <button
            onClick={handleCheckout}
            disabled={items.length === 0 || authLoading || isCheckingOut}
            className="w-full bg-[#151516] text-white px-6 py-4 rounded-lg uppercase tracking-wider text-xs font-semibold hover:bg-[#2a2a2b] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {authLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                loading...
              </>
            ) : isCheckingOut ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                preparing checkout...
              </>
            ) : items.length === 0 ? (
              "cart is empty"
            ) : (
              "checkout"
            )}
          </button>
        </footer>
      </div>
    </aside>
  );
};

const CartItem = ({
  item,
  onIncrement,
  onDecrement,
  onRemove,
}: {
  item: any;
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
}) => (
  <li
    style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
    className="w-full flex items-center gap-x-2 p-2 rounded-xl"
  >
    <div className="rounded-lg overflow-hidden flex-shrink-0">
      <img
        src={item.image}
        alt={item.name}
        loading="lazy"
        width={94}
        height={94}
        className="object-cover"
      />
    </div>

    <div className="flex flex-col w-full pl-5">
      <div className="flex items-center gap-2 w-full">
        <p className="flex-1 font-medium text-lg text-[#59432D] tracking-wide">
          {item.name}
        </p>
        <button
          onClick={onRemove}
          aria-label={`Remove ${item.name} from cart`}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <FiX className="text-xl bg-[#59432D] p-1 text-white rounded-full hover:bg-[#4a3424] transition-colors" />
        </button>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex justify-center items-center border border-black/20 rounded-md text-sm text-[#59432D] mt-[10px]">
          <button
            type="button"
            onClick={onDecrement}
            disabled={item.quantity <= 1}
            aria-label={`Decrease quantity of ${item.name}`}
            className="border-r border-black/20 h-6 w-9 flex justify-center items-center disabled:opacity-50 hover:bg-gray-50 transition-colors"
          >
            <HiMinus />
          </button>
          <span className="h-6 w-9 border-r border-black/20 flex justify-center items-center">
            {item.quantity}
          </span>
          <button
            type="button"
            onClick={onIncrement}
            disabled={item.quantity >= (item.stock || 100)}
            aria-label={`Increase quantity of ${item.name}`}
            className="h-6 w-9 flex justify-center items-center disabled:opacity-50 hover:bg-gray-50 transition-colors"
          >
            <HiPlus />
          </button>
        </div>

        <span className="font-semibold text-[#59432D] mt-[5px]">
          ${(item.price * item.quantity).toFixed(2)}
        </span>
      </div>
    </div>
  </li>
);

export default Cart;
