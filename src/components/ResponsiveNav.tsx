import { Link } from "react-router-dom";
type ResponsiveNavProps = {
  handleResNav: () => void;
  isResponsiveNavOpen: boolean;
};
const ResponsiveNav = () => {
  return (
    <aside className=" h-screen z-50 max-w-[512px] bg-bg border border-black flex flex-col justify-start items-start">
      <div className="w-full flex justify-between items-center border-b py-4 px-8">
        <h3 className="font-syne text-text-default uppercase text-lg font-semibold">
          Namaste!
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
            <li className="w-full flex justify-between items-center py-5 border-b text-sm font-semibold uppercase">
              <Link to={"#"}>Shop</Link>
              <span>
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
              </span>
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
        <div className="w-full flex justify-center items-center px-8 bg-text-default mt-[152px]">
          <h2 className="text-2xl text-text-light px-8 py-6">
            Science-Backed wellness{" "}
          </h2>
        </div>
      </div>
    </aside>
  );
};

export default ResponsiveNav;
