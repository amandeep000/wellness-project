const OurTeamText = () => {
  return (
    <div className="w-full overflow-hidden py-8">
      <div className="animate-scroll whitespace-nowrap inline-flex">
        {Array(7)
          .fill("Meet our perfect team")
          .map((text, i) => (
            <span
              key={i}
              className="text-text-default font-bold px-10 uppercase text-lg"
            >
              {text}
            </span>
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
          animation: scroll 15s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default OurTeamText;
