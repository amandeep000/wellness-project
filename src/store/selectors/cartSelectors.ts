// store/selectors/cartSelectors.ts
import { RootState } from "../Store";

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartTotalItems = (state: RootState) => state.cart.totalItems;
export const selectCartTotalAmount = (state: RootState) =>
  state.cart.totalAmount;
export const selectCartIsOpen = (state: RootState) => state.cart.isCartOpen;
export const selectCartItemById = (state: RootState, itemId: string) =>
  state.cart.items.find((item) => item.id === itemId);
