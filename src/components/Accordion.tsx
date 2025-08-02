// Accordion.tsx
import { useState } from "react";
import { Link } from "react-router-dom";

type AccordionItemData = {
  id: string;
  title: string;
  items: string[];
};

type AccordionProps = {
  data: AccordionItemData[];
};

export default function Accordion({ data }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full mx-auto space-y-4">
      {data.map((item) => (
        <AccordionItem
          key={item.id}
          id={item.id}
          title={item.title}
          items={item.items}
          isOpen={openId === item.id}
          onToggle={handleToggle}
        />
      ))}
    </div>
  );
}

type AccordionItemProps = {
  id: string;
  title: string;
  items: string[];
  isOpen: boolean;
  onToggle: (id: string) => void;
};

function AccordionItem({
  id,
  title,
  items,
  isOpen,
  onToggle,
}: AccordionItemProps) {
  return (
    <div className="border-white/30 border-b pb-4">
      <div
        className="flex justify-between items-center py-5 cursor-pointe w-full"
        onClick={() => onToggle(id)}
      >
        <span className="font-bold text-text-light uppercase text-lg">
          {title}
        </span>
        <button className="text-xl font-bold focus:outline-none text-text-light transition-all duration-300 ease-in-out">
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Accordion Content with Transition */}
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className=" space-y-2 ">
          {items.map((item, index) => (
            <li key={index} className="text-text-light py-2 capitalize">
              <Link to={"#"}>{item}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
