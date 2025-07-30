export default function AnimatedText() {
  const imageData = [
    "/featuredOnimages/brides.webp",
    "/featuredOnimages/daily.avif",
    "/featuredOnimages/pagesix.avif",
    "/featuredOnimages/shape.webp",
    "/featuredOnimages/si.avif",
    "/featuredOnimages/wellgood.avif",
  ];

  // Only duplicate once for seamless loop
  const allImages = [...imageData, ...imageData];

  return (
    <div className="w-full overflow-hidden py-4 bg-bg">
      <div className="scroll-track flex w-max animate-scroll gap-x-[60px]">
        {allImages.map((brand, i) => (
          <div
            key={i}
            className="w-[140px] h-[82px] md:w-[140px] md:h-[140px] flex-shrink-0"
          >
            <img
              src={brand}
              alt={`featured-logo-${i}`}
              className="w-full h-full object-contain"
            />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </div>
  );
}
