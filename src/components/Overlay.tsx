import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks/TypedHooks";
import { closeMobileNav, closeShopDropdown } from "../store/slices/HeaderSlice";
import { closeCart } from "../store/slices/cartSlice";

const Overlay = () => {
  const dispatch = useAppDispatch();

  const { isMobileNavOpen, isShopDropdownOpen } = useAppSelector(
    (state) => state.header
  );
  const isCartDrawerOpen = useAppSelector((state) => state.cart.isCartOpen);

  const overlayVisible =
    isMobileNavOpen || isShopDropdownOpen || isCartDrawerOpen;

  if (!overlayVisible) return null;
  const handleClose = () => {
    if (isMobileNavOpen || isShopDropdownOpen || isCartDrawerOpen) {
      dispatch(closeMobileNav());
      dispatch(closeShopDropdown());
      dispatch(closeCart());
    }
  };

  return (
    <div
      className="fixed inset-0 overlay bg-black/20 z-30 transition-all duration-500 ease-in-out"
      onClick={handleClose}
    />
  );
};

export default Overlay;
