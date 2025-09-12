import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { HiMinus, HiPlus } from "react-icons/hi";
import { FiX, FiAlertCircle } from "react-icons/fi";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../hooks/TypedHooks";
import api from "../api/axios";
import { loadStripe } from "@stripe/stripe-js";

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

  const dispatch = useAppDispatch();
  const isCartDrawerOpen = useAppSelector((state) => state.cart.isCartOpen);
  const { data: currentUser, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const freeShippingAmount = getFreeShippingAmount();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const syncAttempts = useRef(0);
  const maxSyncAttempts = 3;
  const lastSyncTime = useRef(0);

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
      if (y) window.scrollTo(0, -parseInt(y.replace(/[^0-9-]/g, ""), 10));
    }
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
    };
  }, [isCartDrawerOpen]);

  const safeCartSync = async () => {
    if (items.length === 0) {
      console.log("Cart is empty, skipping sync");
      return true;
    }

    const now = Date.now();
    if (now - lastSyncTime.current < 1000) {
      return true;
    }

    if (syncAttempts.current >= maxSyncAttempts) {
      console.log("Max sync attempts reached, skipping");
      throw new Error("Unable to sync cart after multiple attempts");
    }

    try {
      syncAttempts.current++;
      lastSyncTime.current = now;
      await syncCartWithBackend();
      console.log("Cart synced successfully");
      syncAttempts.current = 0;
      return true;
    } catch (error: any) {
      console.error("Cart sync failed:", error);

      if (error?.response?.status === 400 && items.length === 0) {
        console.log("Cart sync failed but cart is empty, continuing");
        syncAttempts.current = 0;
        return true;
      }

      if (syncAttempts.current >= maxSyncAttempts) {
        throw new Error("Failed to sync cart with server");
      }

      throw error;
    }
  };

  // const handleCheckout = async () => {
  //   if (authLoading || isCheckingOut) return;
  //   setCheckoutError(null);

  //   if (!currentUser) {
  //     closeCartDrawer();
  //     navigate("/login", { replace: true, state: { from: "/cart" } });
  //     return;
  //   }

  //   if (items.length === 0) {
  //     setCheckoutError("Your cart is empty. Please add items before checkout.");
  //     return;
  //   }

  //   setIsCheckingOut(true);
  //   try {
  //     await safeCartSync();

  //     const response = await api.post("/api/v1/checkout/session");
  //     console.log("stripe checkout sessionId: ", response);

  //     const sessionData = response?.data?.data;
  //     if (
  //       !sessionData ||
  //       !sessionData.sessionId ||
  //       typeof sessionData.sessionId !== "string"
  //     ) {
  //       throw new Error("Invalid checkout session response");
  //     }

  //     const sessionId = sessionData.sessionId;
  //     console.log("Extracted sessionID: ", sessionId);

  //     const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PK);
  //     if (!stripe) {
  //       throw new Error("stripe failed to initialize");
  //     }

  //     await new Promise((resolve) => setTimeout(resolve, 100));

  //     const { error } = await stripe.redirectToCheckout({ sessionId });
  //     if (error) {
  //       throw new Error(error.message);
  //     }

  //     closeCartDrawer();
  //   } catch (error) {
  //     console.log("Checkout error :", error);
  //     setCheckoutError("Unable to proceed to checkout. Please try again.");
  //   } finally {
  //     setIsCheckingOut(false);
  //   }
  // };

  const handleCheckout = async () => {
    if (authLoading || isCheckingOut) return;
    setCheckoutError(null);

    if (!currentUser) {
      closeCartDrawer();
      navigate("/login", { replace: true, state: { from: "/cart" } });
      return;
    }

    if (items.length === 0) {
      setCheckoutError("Your cart is empty. Please add items before checkout.");
      return;
    }

    setIsCheckingOut(true);
    try {
      await safeCartSync();

      const response = await api.post("/api/v1/checkout/session");
      console.log("Stripe checkout response:", response);

      // Extract both sessionId and URL from response
      const sessionData = response?.data?.data;
      if (!sessionData) {
        throw new Error("Invalid checkout session response");
      }

      // Check for session URL first (preferred method)
      if (sessionData.url && typeof sessionData.url === "string") {
        console.log("Using session URL for redirect:", sessionData.url);
        closeCartDrawer();
        // Direct redirect using session URL - more reliable than redirectToCheckout
        window.location.assign(sessionData.url);
        return;
      }

      // Fallback to sessionId if URL not available
      if (sessionData.sessionId && typeof sessionData.sessionId === "string") {
        console.log("Fallback to sessionId redirect:", sessionData.sessionId);

        // Create fresh Stripe instance as fallback
        const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PK);
        if (!stripe) {
          throw new Error("Stripe failed to initialize");
        }

        const { error } = await stripe.redirectToCheckout({
          sessionId: sessionData.sessionId,
        });

        if (error) {
          console.error("Stripe redirect error:", error);
          throw new Error(error.message || "Checkout redirect failed");
        }

        closeCartDrawer();
        return;
      }

      throw new Error("No valid checkout URL or session ID received");
    } catch (error) {
      console.error("Checkout error:", error);
      setCheckoutError("Unable to proceed to checkout. Please try again.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  useEffect(() => {
    if (checkoutError) {
      setCheckoutError(null);
    }
    syncAttempts.current = 0;
  }, [items.length]);

  useEffect(() => {
    if (!isCartDrawerOpen) {
      setCheckoutError(null);
      setIsCheckingOut(false);
      syncAttempts.current = 0;
    }
  }, [isCartDrawerOpen]);

  return (
    <aside
      className={`fixed top-0 right-0 z-40 w-full max-w-md h-screen bg-white border-l border-black transform transition-transform duration-300 ease-in-out ${
        isCartDrawerOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex flex-col h-full">
        <header className="flex items-center justify-between px-6 py-4 border-b border-black">
          <h3 className="uppercase text-lg font-semibold">
            your cart ({totalItems})
          </h3>
          <button
            onClick={closeCartDrawer}
            aria-label="Close cart"
            className="p-2 rounded hover:bg-gray-100 cursor-pointer"
          >
            <FiX size={24} />
          </button>
        </header>

        <main className="flex-grow overflow-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <p className="mb-4 text-lg font-semibold">Your cart is empty</p>
              <p className="mb-4 text-gray-600">
                Add some products to get started!
              </p>
              <button
                onClick={() => navigate("/")}
                className="px-4 py-2 bg-black text-white rounded"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className="space-y-4">
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
          )}
        </main>

        <footer className="px-6 py-4 border-t border-black">
          {checkoutError && (
            <div className="flex items-center gap-2 p-3 mb-3 bg-red-50 border border-red-200 rounded">
              <FiAlertCircle className="text-red-600" size={20} />
              <p className="text-red-700 text-sm flex-grow">{checkoutError}</p>
              <button
                onClick={() => setCheckoutError(null)}
                className="text-red-600 font-semibold hover:underline"
              >
                Dismiss
              </button>
            </div>
          )}

          <div className="flex justify-between mb-4">
            <span className="font-semibold">Subtotal ({totalItems})</span>
            <span className="font-semibold">${totalAmount.toFixed(2)}</span>
          </div>

          <button
            onClick={handleCheckout}
            disabled={items.length === 0 || authLoading || isCheckingOut}
            className="w-full py-3 text-white bg-black rounded uppercase tracking-wide font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 flex justify-center items-center gap-2"
          >
            {authLoading ? (
              <>
                <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                Loading...
              </>
            ) : isCheckingOut ? (
              <>
                <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                Preparing...
              </>
            ) : items.length === 0 ? (
              "Cart is empty"
            ) : (
              "Checkout"
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
  <li className="flex items-center gap-4 p-2 rounded bg-white shadow">
    <img
      src={item.image}
      alt={item.name}
      width={80}
      height={80}
      loading="lazy"
      className="rounded object-cover"
    />
    <div className="flex flex-col flex-grow">
      <div className="flex justify-between items-center">
        <h4 className="font-semibold text-lg">{item.name}</h4>
        <button
          onClick={onRemove}
          aria-label={`Remove ${item.name}`}
          className="text-gray-600 hover:text-black transition cursor-pointer"
        >
          <FiX size={20} />
        </button>
      </div>
      <div className="flex items-center mt-2 gap-4">
        <button
          onClick={onDecrement}
          disabled={item.quantity <= 1}
          aria-label={`Decrease quantity of ${item.name}`}
          className="px-2 py-1 border rounded disabled:opacity-50 hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <HiMinus />
        </button>
        <span>{item.quantity}</span>
        <button
          onClick={onIncrement}
          disabled={item.quantity >= (item.stock || 100)}
          aria-label={`Increase quantity of ${item.name}`}
          className="px-2 py-1 border rounded disabled:opacity-50 hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <HiPlus />
        </button>
        <span className="ml-auto font-semibold">
          ${(item.price * item.quantity).toFixed(2)}
        </span>
      </div>
    </div>
  </li>
);

export default Cart;
