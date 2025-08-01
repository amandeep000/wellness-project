import { useState } from "react";

const Header = () => {
  const [isResponsiveNavOpen, setIsResponsiveNavOpen] = useState(false);
  const handleResNav = () => {
    setIsResponsiveNavOpen((prev) => !prev);
  };
  return (
    <>
      <header className="fixed w-full z-40">
        <div className="w-full flex justify-between items-center py-4 px-4 xl:px-8 xl:py-[20px] backdrop-blur-[80px] border border-b-black">
          {/* logo */}
          <div className="order-2 xl:order-1">
            <img
              src="/logo/wellness-logo.svg"
              alt="wellness logo"
              className="h-[23px] xl:h-[32px]  object-center object-cover"
            />
          </div>
          {/* navlinks */}
          <nav className="hidden xl:flex justify-center items-center order-2 flex-1">
            <ul className="flex justify-center items-center">
              <li className="mx-3 text-sm font-semibold relative nav-hover cursor-pointer uppercase text-text-default flex justify-center items-center gap-x-[2px]">
                shop
                <span className="hover:rotate-y-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#151516"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </span>
              </li>
              <li className="mx-3 text-sm font-semibold relative nav-hover cursor-pointer uppercase text-text-default">
                about
              </li>
              <li className="mx-3 text-sm font-semibold relative nav-hover cursor-pointer uppercase text-text-default">
                science
              </li>
              <li className="mx-3 text-sm font-semibold relative nav-hover cursor-pointer uppercase text-text-default">
                about
              </li>
              <li className="mx-3 text-sm font-semibold relative nav-hover cursor-pointer uppercase text-text-default">
                contact
              </li>
            </ul>
          </nav>
          {/* header buttons */}
          <div className="flex justify-center items-center order-3 gap-x-4">
            {/* search button */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1"
              stroke="#1b1b1d"
              className="size-7 hidden xl:block"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
            {/* user */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1"
              stroke="#1b1b1d"
              className="size-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>

            {/*shopping bag */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1"
              stroke="#1b1b1d"
              className="size-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
          </div>
          {/* responsive nav */}
          <div className="flex justify-start items-center order-1 gap-x-4 xl:hidden">
            {/* ham menu */}
            <span onClick={handleResNav} className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1"
                stroke="#1b1b1d"
                className="size-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </span>
            {/* serach icon for sm,md & lg displays */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1"
              stroke="#1b1b1d"
              className="size-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </div>
        </div>
      </header>
      {/* responsive nav */}
    </>
  );
};

export default Header;
