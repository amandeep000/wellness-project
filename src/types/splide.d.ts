declare module "@splidejs/react-splide" {
  import * as React from "react";

  export interface SplideProps {
    options?: Record<string, any>;
    hasTrack?: boolean;
    tag?: keyof JSX.IntrinsicElements;
    className?: string;
    ariaLabel?: string;
    children?: React.ReactNode;
  }

  export interface SplideSlideProps {
    tag?: keyof JSX.IntrinsicElements;
    className?: string;
    children?: React.ReactNode;
  }

  export const Splide: React.FC<SplideProps>;
  export const SplideSlide: React.FC<SplideSlideProps>;
}
