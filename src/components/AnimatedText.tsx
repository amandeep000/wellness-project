export default function AnimatedText() {
  return (
    <div className="w-full overflow-hidden py-4">
      <div className="animate-scroll whitespace-nowrap inline-flex text-4xl">
        {Array(7)
          .fill("Your Wellness, Our priority! ")
          .map((text, i) => (
            <span
              key={i}
              className="text-[58px] font-bold px-10 text-text-light uppercase"
            >
              {text}
            </span>
          ))}
      </div>

      {/* Regular style tag, NOT style jsx */}
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
