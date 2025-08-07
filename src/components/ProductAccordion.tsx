import { useState, useRef, useEffect } from "react";
import { Plus, Minus } from "lucide-react";

export type AccordionItem = {
  id: string;
  title: string;
  content: string[];
};

const accordionData = [
  {
    id: "1",
    title: "Benefits",
    content: [
      "Supports Healthy Skin: Boosts skin elasticity, hydration, and firmness, helping to reduce the appearance of wrinkles and promote a youthful glow.",
      "Strengthens Hair and Nails: Encourages healthier, stronger hair growth and helps to reduce brittle nails, giving you a polished look from within.",
      "Promotes Joint Health: Enhances joint flexibility and reduces discomfort, supporting an active lifestyle and overall mobility.",
      "Improves Bone Density: Aids in maintaining strong and healthy bones by supporting bone structure and density.",
      "Enhances Muscle Recovery: Assists in muscle repair and recovery, making it an excellent supplement for active individuals and athletes.",
    ],
  },
  {
    id: "2",
    title: "How to Take Supplements",
    content: [
      "Recommended Dosage: Take 1 capsule daily, preferably with water or your favorite beverage.",
      "Best Time to Take: For optimal results, consume the supplement in the morning on an empty stomach or as advised by your healthcare professional.",
      "Consistency is Key: Incorporate the supplement into your daily routine to maximize its benefits.",
      "Optional Pairing: Pair with a balanced diet and a healthy lifestyle to enhance the effects.",
      "Always read the product label for specific instructions and consult your healthcare provider if you are pregnant, nursing, or taking medications.",
      "This is a demo store, this information is only for demo purposes.",
    ],
  },
  {
    id: "3",
    title: "Ingredients",
    content: [
      "Zinc",
      "Vitamin C (as L-Ascorbic Acid)",
      "Selenium",
      "Berry Fruit",
    ],
  },
];

const Accordion = () => {
  const [activeIndex, setActiveIndex] = useState<string | null>(null);
  const contentRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const toggle = (id: string) => {
    setActiveIndex((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full space-y-4">
      {accordionData.map((item) => {
        const isActive = activeIndex === item.id;

        return (
          <div key={item.id} className="border-white border-b">
            <button
              className="w-full flex items-center justify-between py-5 text-left"
              onClick={() => toggle(item.id)}
            >
              <h3 className="text-lg font-bold py-1 uppercase text-white">
                {item.title}
              </h3>
              {isActive ? (
                <Minus size={21} className="text-white" />
              ) : (
                <Plus size={21} className="text-white" />
              )}
            </button>

            {/* Animate this content */}
            <div
              ref={(el) => void (contentRefs.current[item.id] = el)}
              className={`overflow-hidden transition-all duration-500 ease-in-out`}
              style={{
                maxHeight: isActive
                  ? `${contentRefs.current[item.id]?.scrollHeight}px`
                  : "0px",
              }}
            >
              <div className="pb-4 text-sm text-white">
                {item.title === "How to Take Supplements" ? (
                  <ol className="list-decimal pl-6 space-y-2">
                    {item.content.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ol>
                ) : (
                  <ul className="list-disc pl-6 space-y-2">
                    {item.content.map((point, i) => {
                      const [label, rest] = point.split(/:(.+)/);
                      return (
                        <li key={i}>
                          <span>
                            {rest ? (
                              <>
                                <strong>{label}:</strong> {rest}
                              </>
                            ) : (
                              label
                            )}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
