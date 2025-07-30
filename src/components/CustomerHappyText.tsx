export default function CutstomerHappyText() {
  return (
    <div className="w-full overflow-hidden py-4">
      <div className="animate-scroll whitespace-nowrap inline-flex ">
        {Array(7)
          .fill("+10000 happy customes")
          .map((text, i) => (
            <span
              key={i}
              className="font-bold mr-[100px] text-text-default uppercase lg:text-[20px]"
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
          animation: scroll 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
