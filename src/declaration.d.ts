// src/declarations.d.ts or src/types/splide.d.ts
declare module "@splidejs/react-splide" {
  import * as React from "react";

  export interface SplideProps {
    options?: any;
    hasTrack?: boolean;
    children?: React.ReactNode;
    tag?: keyof JSX.IntrinsicElements;
    className?: string;
    ariaLabel?: string;
  }

  export interface SplideSlideProps {
    tag?: keyof JSX.IntrinsicElements;
    className?: string;
    children?: React.ReactNode;
  }

  export const Splide: React.FC<SplideProps>;
  export const SplideSlide: React.FC<SplideSlideProps>;
}
