import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./TypedHooks";
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  openCart,
  closeCart,
  calculateTotals,
  loadCart,
} from "../store/slices/cartSlice";
import {
  selectCartItems,
  selectCartIsOpen,
  selectCartTotalAmount,
  selectCartTotalItems,
} from "../store/selectors/cartSelectors";
import { CartItem } from "../types/cart";
import { Product } from "../types/product";
import { useAuth } from "./useAuth";
import Cart from "@/components/Cart";

export interface CartProductInput {
  id?: string;
  _id?: string;
  slug: string;
  name: string;
  price: number;
  stock?: number;
  images?: string[];
  image?: string;
  bgColor?: string;
}

export const useCart = () => {
  const dispatch = useAppDispatch();
  const { data: currentUser } = useAuth();
  const items = useAppSelector(selectCartItems);
  const totalItems = useAppSelector(selectCartTotalItems);
  const totalAmount = useAppSelector(selectCartTotalAmount);
  const isCartOpen = useAppSelector(selectCartIsOpen);

  // Load cart from localStorage
  useEffect(() => {
    const loadCartFromStorage = () => {
      try {
        const savedCart = localStorage.getItem("wellness-cart");
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart);
          if (Array.isArray(parsedCart) && parsedCart.length > 0) {
            dispatch(loadCart(parsedCart));
          }
        }
      } catch (error) {
        console.error("Failed to load cart from localStorage:", error);
        localStorage.removeItem("wellness-cart");
      }
    };

    loadCartFromStorage();
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("wellness-cart", JSON.stringify(items));
    } catch (error) {
      console.error("Failed to save cart to localStorage", error);
    }
  }, [items]);

  // cart sync function
  const syncCartWithBackend = useCallback(async () => {
    if (!currentUser || items.length === 0) {
      throw new Error("User not authenticated or cart is empty");
    }

    try {
      const cartData = {
        items: items.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
      };

      console.log("Syncing cart data:", cartData);

      const response = await fetch("/api/v1/cart/sync", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(cartData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `Failed to sync cart: ${response.statusText}`
        );
      }

      const result = await response.json();
      console.log("Cart synced successfully:", result);
      if (result.data?.items) {
        const updatedItems = result.data.items.map((item: any) => ({
          id: item.product._id,
          slug: item.product.slug,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          stock: item.product.stock,
          image: item.product.images[0],
          bgColor: "#FFFFFF",
        }));

        dispatch(loadCart(updatedItems));
      }

      return result;
    } catch (error) {
      console.error("Cart sync error:", error);
      throw error;
    }
  }, [items, currentUser, dispatch]);

  // function to load cart from backend

  const loadCartFromBackend = useCallback(async () => {
    if (!currentUser) return;

    try {
      const response = await fetch("/api/v1/cart", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const result = await response.json();
        const backendCart = result.data;
        if (Array.isArray(backendCart) && backendCart.length === 0) {
          dispatch(loadCart([]));
          return;
        }

        if (backendCart?.items?.length > 0) {
          const cartItems = backendCart.items.map((item: any) => ({
            id: item.product._id,
            slug: item.product.slug,
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
            stock: item.product.stock,
            image: item.product.images[0],
            bgColor: "#FFFFFF",
          }));

          dispatch(loadCart(cartItems));
          console.log("Cart loaded from backend:", {
            items: cartItems.length,
            totalItems: backendCart.summary?.totalItem || 0,
            totalPrice: backendCart.summary?.totalPrice || 0,
          });
        } else {
          dispatch(loadCart([]));
        }
      }
    } catch (error) {
      console.error("Failed to load cart from backend:", error);
    }
  }, [currentUser, dispatch]);

  useEffect(() => {
    if (currentUser && items.length === 0) {
      loadCartFromBackend();
    }
  }, [currentUser, loadCartFromBackend, items.length]);

  const addProductToCart = useCallback(
    (product: Product | CartProductInput, quantity: number = 1) => {
      const cartItem: CartItem = {
        id: product._id || product.id || product.slug,
        slug: product.slug,
        name: product.name,
        price: product.price,
        quantity,
        stock: product.stock || 100,

        image:
          ("images" in product && product.images?.[0]) ||
          ("image" in product && product.image) ||
          "",
        bgColor: product.bgColor || "#FFFFFF",
      };
      dispatch(addToCart(cartItem));
      dispatch(openCart());
    },
    [dispatch]
  );

  const removeItem = useCallback(
    (itemId: string) => {
      dispatch(removeFromCart(itemId));
    },
    [dispatch]
  );

  const updateItemQuantity = useCallback(
    (itemId: string, quantity: number) => {
      dispatch(updateQuantity({ id: itemId, quantity }));
    },
    [dispatch]
  );

  const incrementItem = useCallback(
    (itemId: string) => {
      dispatch(incrementQuantity(itemId));
    },
    [dispatch]
  );

  const decrementItem = useCallback(
    (itemId: string) => {
      dispatch(decrementQuantity(itemId));
    },
    [dispatch]
  );

  const clearAllItems = useCallback(() => {
    dispatch(clearCart());
  }, [dispatch]);

  const toggleCartVisibility = useCallback(() => {
    dispatch(closeCart());
  }, [dispatch]);

  const openCartDrawer = useCallback(() => {
    dispatch(openCart());
  }, [dispatch]);

  const closeCartDrawer = useCallback(() => {
    dispatch(closeCart());
  }, [dispatch]);

  const getItemQuantity = useCallback(
    (itemId: string): number => {
      return items.find((item) => item.id === itemId)?.quantity || 0;
    },
    [items]
  );

  const isItemInCart = useCallback(
    (itemId: string): boolean => {
      return items.some((item) => item.id === itemId);
    },
    [items]
  );

  const getFreeShippingAmount = useCallback((): number => {
    const freeShippingThreshold = 66.0;
    return Math.max(0, freeShippingThreshold - totalAmount);
  }, [totalAmount]);

  return {
    // State
    items,
    totalItems,
    totalAmount,
    isCartOpen,

    // Actions
    addProductToCart,
    removeItem,
    updateItemQuantity,
    incrementItem,
    decrementItem,
    clearAllItems,
    toggleCartVisibility,
    openCartDrawer,
    closeCartDrawer,

    // Helpers
    getItemQuantity,
    isItemInCart,
    getFreeShippingAmount,
    syncCartWithBackend,
    loadCartFromBackend,
  };
};
