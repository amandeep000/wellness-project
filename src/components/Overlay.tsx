import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks/TypedHooks";
import { closeMobileNav, closeShopDropdown } from "../store/slices/HeaderSlice";

const Overlay = () => {
  const dispatch = useAppDispatch();

  const { isMobileNavOpen, isShopDropdownOpen } = useAppSelector(
    (state) => state.header
  );

  const overlayVisible = isMobileNavOpen || isShopDropdownOpen;

  if (!overlayVisible) return null;
  const handleClose = () => {
    if (isMobileNavOpen || isShopDropdownOpen) {
      dispatch(closeMobileNav());
      dispatch(closeShopDropdown());
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
