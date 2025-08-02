import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
type ResponsiveNavProps = {
  handleResNav: () => void;
  isResponsiveNavOpen: boolean;
};
const ResponsiveNav = () => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [accordionHeight, setAccordionHeight] = useState("0px");
  const accordionRef = useRef<HTMLUListElement>(null);
  const handleAccordion = () => {
    setIsAccordionOpen((prev) => !prev);
  };

  useEffect(() => {
    if (accordionRef.current) {
      if (isAccordionOpen) {
        const scrollHeight = accordionRef.current.scrollHeight;
        setAccordionHeight(`${scrollHeight}px`);
      } else {
        setAccordionHeight("0px");
      }
    }
  }, [isAccordionOpen]);
  const shopLinks = [
    { name: "All Products", path: "#" },
    { name: "Supplements", path: "#" },
    { name: "Skincare", path: "#" },
    { name: "Haircare", path: "#" },
    { name: "Immunity", path: "#" },
  ];
  return (
    <aside className=" h-screen z-50 max-w-[512px] bg-bg border border-black flex flex-col justify-between">
      <div className="w-full flex flex-col justify-between">
        <div className="w-full flex justify-between items-center border-b py-4 px-8">
          <h3 className="font-syne text-text-default uppercase text-lg font-bold">
            hello!
          </h3>
          {/* close responsive nav */}
          <span className="cursor-pointer">
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
              <li className="w-full ">
                <div className="flex justify-between items-center py-5 text-sm font-semibold uppercase">
                  <Link to={"#"}>Shop</Link>
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
                  className={`pl-4 border-b transition-all duration-500 ease-in-out overflow-hidden`}
                >
                  {shopLinks.map((item, idx) => (
                    <li
                      key={idx}
                      className="py-2 text-sm uppercase font-semibold pb-2"
                    >
                      <Link to={item.path}>{item.name}</Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="w-full text-start py-5 border-b text-[14px] uppercase font-semibold">
                <Link to={"#"}>About</Link>
              </li>
              <li className="w-full text-start py-5 border-b text-[14px] uppercase font-semibold">
                <Link to={"#"}>Science</Link>
              </li>
              <li className="w-full text-start py-5 border-b text-[14px] uppercase font-semibold">
                <Link to={"#"}>FAQ</Link>
              </li>
              <li className="w-full text-start py-5 border-b text-[14px] uppercase font-semibold">
                <Link to={"#"}>Contact</Link>
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
