import { Link } from "react-router-dom";
import Accordion from "./Accordion";

const Footer = () => {
  const accordionData = [
    {
      id: "products",
      title: "Products",
      items: [
        "Boost Energy Capsules",
        "Collagen Capsules",
        "Hair, Skin & Nails Capsules",
        "Immunity Boost Capsules",
        "Men's Multi Capsules",
        "Stress Relief Capsules",
        "Women's Multi Capsules",
      ],
    },
    {
      id: "info",
      title: "Info",
      items: ["FAQ", "about us", "our mission", "contact"],
    },
    {
      id: "social",
      title: "Social",
      items: ["Instagram", "Facebook", "LinkedIn", "tik tok"],
    },
  ];

  return (
    <footer className="bg-[#151515] text-text-light">
      <div className="px-4 lg:px-8 pt-4 max-w-[1440px] mx-auto">
        <div className="lg:flex lg:gap-12 py-8">
          {/* Mobile View: Accordion */}
          <div className="w-full lg:hidden">
            <Accordion data={accordionData} />
          </div>

          {/* Left: List Columns */}
          <div className="hidden flex-1 lg:flex justify-between gap-8">
            {accordionData.map((data) => (
              <div key={data.id} className="min-w-[120px] text-nowrap">
                <h3 className="font-bold py-5 uppercase text-lg ">
                  {data.title}
                </h3>
                <ul className="">
                  {data.items.map((item, idx) => (
                    <li key={idx} className="py-2 capitalize cursor-pointer">
                      <Link
                        to={"#"}
                        className="hover:underline transition-all duration-300 ease-in-out"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Right: About Developer */}
          <div className="flex-1 w-full mt-4 lg:mt-0">
            <div className="uppercase text-lg font-bold py-5">
              about developer
            </div>
            <p className="mb-2">
              Greetings! I'm Aman Deep Singh, a passionate Frontend Web
              Developer hailing from the picturesque city of Shimla, Himachal
              Pradesh. Each morning, I start my day with a refreshing cup of
              green tea, and then I dive into the digital realm, crafting
              innovative and dynamic web experiences. My dedication to building
              engaging and interactive web applications is unwavering, as I
              strive to bring ideas to life on the web every single day.
            </p>
            <p>
              Those who know me often say I'm obsessed, and I embrace that
              wholeheartedly. My relentless drive and passion for learning new
              things fuel my journey every day.
            </p>
          </div>
        </div>

        {/* Footer Bottom Links */}
        <div className="text-xs md:text-sm border-white/20 border-b py-4 mb-6 flex flex-wrap justify-between items-center gap-2">
          <span>Terms & Conditions</span>
          <span>Privacy & Cookie</span>
          <span>Made with ❤️ and lines of code by Aman(AuraWolf)</span>
        </div>

        {/* Logo */}
        <div className="pt-6 w-full">
          <img
            src="/logo/wellness-logo.svg"
            alt="wellness logo"
            className="invert w-full h-auto"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
