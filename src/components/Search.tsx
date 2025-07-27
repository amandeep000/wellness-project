import React, { useState } from "react";

const Search = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <section className="w-screen py-6 h-screen bg-[#fbfaf6]">
      <div className="px-3 md:px-5 w-full flex items-center gap-x-2.5 md:gap-x-4 lg:px-9 xl:px-[60px] xl:py-[30px] lg:gap-6 max-w-[900px] mx-auto">
        <input
          type="text"
          placeholder="Search..."
          autoFocus
          className="flex-1 py-3 border-accent border-2 rounded-lg pl-3 text-[#59432d] font-medium md:text-lg outline-none xl:text-3xl"
        />
        <span className="border-accent border-2 px-[10px] py-[10px] rounded-lg ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#151516"
            className="size-7 xl:size-9"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </span>
      </div>
      {/* container div */}
      <div className="w-full overflow-y-auto"></div>
    </section>
  );
};

export default Search;
