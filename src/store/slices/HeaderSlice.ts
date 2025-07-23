import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface HeaderState {
  isShopDropdownOpen: boolean;
  overlayVisible: boolean;
  scrollLocked: boolean;
  isMobileNavOpen: boolean;
}

const initialState: HeaderState = {
  isShopDropdownOpen: false,
  overlayVisible: false,
  scrollLocked: false,
  isMobileNavOpen: false,
};

const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    openShopDropdown(state) {
      state.isShopDropdownOpen = true;
      state.overlayVisible = true;
    },
    closeShopDropdown(state) {
      state.isShopDropdownOpen = false;
      state.overlayVisible = false;
      if (!state.isMobileNavOpen) {
        state.scrollLocked = false;
      }
    },
    openMobileNav(state) {
      state.isMobileNavOpen = true;
      state.overlayVisible = true;
      state.scrollLocked = true;
    },
    closeMobileNav(state) {
      state.isMobileNavOpen = false;
      state.overlayVisible = false;
      state.scrollLocked = false;
    },
  },
});
export const {
  openShopDropdown,
  closeShopDropdown,
  openMobileNav,
  closeMobileNav,
} = headerSlice.actions;

export default headerSlice.reducer;
