// hooks/useCart.ts
import { useCallback, useEffect, useState } from "react";
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
  loadCart,
} from "../store/slices/cartSlice";
import {
  selectCartItems,
  selectCartIsOpen,
  selectCartTotalAmount,
  selectCartTotalItems,
} from "../store/selectors/cartSelectors";
import { useAuth } from "./useAuth";
import { cartApi } from "../api/cart";

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
  const items = useAppSelector(selectCartItems);
  const totalItems = useAppSelector(selectCartTotalItems);
  const totalAmount = useAppSelector(selectCartTotalAmount);
  const isCartOpen = useAppSelector(selectCartIsOpen);

  const { data: currentUser } = useAuth();
  const [isSyncing, setIsSyncing] = useState(false);

  // Load cart from backend when user logs in
  useEffect(() => {
    if (currentUser) {
      if (items.length > 0) {
        // If user has local items, sync them with backend first
        syncCartWithBackend().catch(() => {
          // If sync fails, just load backend cart
          loadCartFromBackend();
        });
      } else {
        // Load cart from backend if no local items
        loadCartFromBackend();
      }
    }
  }, [currentUser]);

  // Save to localStorage whenever cart changes
  useEffect(() => {
    try {
      localStorage.setItem("wellness-cart", JSON.stringify(items));
    } catch (error) {
      console.error("Failed to save cart to localStorage", error);
    }
  }, [items]);

  // Load cart from localStorage on initial load
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
  }, [dispatch]);

  // ✅ Updated: Sync cart with backend using cartApi
  const syncCartWithBackend = useCallback(async () => {
    if (!currentUser || items.length === 0) {
      throw new Error("User not authenticated or cart is empty");
    }

    setIsSyncing(true);
    try {
      const cartItems = items.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      }));

      console.log("Syncing cart data:", cartItems);

      const result = await cartApi.syncCart(cartItems);

      console.log("Cart synced successfully:", result);

      // Update Redux store with synced data
      if (result.data?.items?.length > 0) {
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
    } finally {
      setIsSyncing(false);
    }
  }, [items, currentUser, dispatch]);

  // ✅ Updated: Load cart from backend using cartApi
  const loadCartFromBackend = useCallback(async () => {
    if (!currentUser) return;

    try {
      const result = await cartApi.getCart();
      const backendCart = result.data;

      // Handle empty cart response
      if (Array.isArray(backendCart) && backendCart.length === 0) {
        dispatch(loadCart([]));
        return;
      }

      // Handle cart with items
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
      } else {
        dispatch(loadCart([]));
      }
    } catch (error) {
      console.error("Failed to load cart from backend:", error);
    }
  }, [currentUser, dispatch]);

  const clearAllItems = useCallback(async () => {
    try {
      if (currentUser) {
        await cartApi.clearCart();
      }
      dispatch(clearCart());
    } catch (error) {
      console.error("Failed to clear cart on backend:", error);

      dispatch(clearCart());
    }
  }, [currentUser, dispatch]);

  const addProductToCart = useCallback(
    (product: CartProductInput | any, quantity: number = 1) => {
      const cartItem = {
        id: product._id || product.id || product.slug,
        slug: product.slug,
        name: product.name,
        price: product.price,
        quantity,
        stock: product.stock || 100,
        image: product.images?.[0] || product.image || "",
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
    isSyncing,

    // Actions
    addProductToCart,
    removeItem,
    updateItemQuantity,
    incrementItem,
    decrementItem,
    clearAllItems,
    openCartDrawer,
    closeCartDrawer,

    syncCartWithBackend,
    loadCartFromBackend,

    // Helpers
    getItemQuantity,
    isItemInCart,
    getFreeShippingAmount,
  };
};
