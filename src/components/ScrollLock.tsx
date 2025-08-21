// src/components/ScrollLock.tsx
import { useEffect } from "react";
import { useAppSelector } from "../hooks/TypedHooks";
import type { RootState } from "../store/Store";

const ScrollLock = () => {
  const scrollLocked = useAppSelector((state) => state.header.scrollLocked);

  useEffect(() => {
    if (scrollLocked) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [scrollLocked]);

  return null;
};

export default ScrollLock;
