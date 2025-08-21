import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../hooks/TypedHooks";
import { closeMobileNav } from "../store/slices/HeaderSlice";

type ResponsiveNavProps = {
  handleResNav: () => void;
  isResponsiveNavOpen: boolean;
};

const ResponsiveNav = ({
  handleResNav,
  isResponsiveNavOpen,
}: ResponsiveNavProps) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [accordionHeight, setAccordionHeight] = useState("0px");
  const accordionRef = useRef<HTMLUListElement>(null);

  const handleAccordion = () => setIsAccordionOpen((p) => !p);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!accordionRef.current) return;
    setAccordionHeight(
      isAccordionOpen ? `${accordionRef.current.scrollHeight}px` : "0px"
    );
  }, [isAccordionOpen]);

  const shopLinks = [
    { name: "All Products", path: "#" },
    { name: "Supplements", path: "#" },
    { name: "Skincare", path: "#" },
    { name: "Haircare", path: "#" },
    { name: "Immunity", path: "#" },
  ];

  const handleNavClick = () => {
    dispatch(closeMobileNav());
  };
  return (
    <aside
      className={`
        fixed top-0 left-0 h-screen z-50 max-w-[512px] w-full
        bg-bg border-r border-black flex flex-col justify-between
        transform transition-transform duration-500 ease-in-out
        ${isResponsiveNavOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      <div className="w-full flex flex-col justify-between">
        <div className="w-full flex justify-between items-center border-b py-4 px-8">
          <h3 className="font-syne text-text-default uppercase text-lg font-bold">
            hello!
          </h3>
          {/* close responsive nav */}
          <span onClick={handleResNav} className="cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.2"
              stroke="#151516"
              className="size-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </span>
        </div>

        <div className="w-full flex-1 overflow-y-auto">
          <div className="w-full py-4">
            <ul className="w-full px-8">
              <li className="w-full">
                <div className="flex justify-between items-center py-5 text-sm font-semibold uppercase">
                  <Link to={"/Shop"} onClick={handleNavClick}>
                    Shop
                  </Link>
                  <span onClick={handleAccordion} className="cursor-pointer">
                    {isAccordionOpen ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 12h14"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4.5v15m7.5-7.5h-15"
                        />
                      </svg>
                    )}
                  </span>
                </div>
                <ul
                  ref={accordionRef}
                  style={{ height: accordionHeight }}
                  className="pl-4 border-b transition-all duration-500 ease-in-out overflow-hidden"
                >
                  {shopLinks.map((item, idx) => (
                    <li
                      key={idx}
                      className="py-2 text-sm uppercase font-semibold pb-2"
                    >
                      <Link to={item.path} onClick={handleNavClick}>
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              <li className="w-full text-start py-5 border-b text-[14px] uppercase font-semibold">
                <Link to={"/about"} onClick={handleNavClick}>
                  About
                </Link>
              </li>
              <li className="w-full text-start py-5 border-b text-[14px] uppercase font-semibold">
                <Link to={"/science"} onClick={handleNavClick}>
                  Science
                </Link>
              </li>
              <li className="w-full text-start py-5 border-b text-[14px] uppercase font-semibold">
                <Link to={"/faq"} onClick={handleNavClick}>
                  FAQ
                </Link>
              </li>
              <li className="w-full text-start py-5 border-b text-[14px] uppercase font-semibold">
                <Link to={"/contact"} onClick={handleNavClick}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="w-full bg-text-default px-2 py-3">
        <img
          src="/logo/wellness-logo.svg"
          alt="wellness logo"
          className="w-full h-[60px] object-contain invert"
        />
      </div>
    </aside>
  );
};

export default ResponsiveNav;
