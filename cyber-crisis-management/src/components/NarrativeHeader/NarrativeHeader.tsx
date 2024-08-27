import { useState, useEffect } from "react";
import { BreadCrumb } from "primereact/breadcrumb";
import { useGameContext } from "../../context/context";
import { BsFillShieldLockFill } from "react-icons/bs";
import { MenuItem } from "primereact/menuitem";
import { ALL_NARRATIVES, phasesInstructions } from "../../constants/data";

export const NarrativeHeader = ({ phase }: { phase: number }) => {
  const { state } = useGameContext();
  const [items, setItems] = useState<MenuItem[] | []>([]);

  useEffect(() => {
    const totalIncidents = ALL_NARRATIVES.map((_, i) => {
      if (state.activeNarativeIndex == i) {
        return { label: `Story 0${i + 1}`, color: "red" };
      }
      return { label: `0${i + 1}` };
    });
    setItems(totalIncidents);
  }, [state.activeNarativeIndex]);

  useEffect(() => {
    document.querySelectorAll(".labels-crum")?.forEach((elem, i) => {
      if (state.activeNarativeIndex === i) {
        elem.classList.add("!text-green");
      } else {
        elem.classList.add("!text-white");
      }
    });
  }, [items]);

  const home = {
    icon: <BsFillShieldLockFill />,
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div>
        <BreadCrumb
          model={items}
          home={home}
          pt={{
            icon: {
              className: "!bg-red-500 !p-8 ",
            },
            root: {
              className:
                "!bg-transparent !border-none !text-3xl !font-bold !text-white !py-0 !overflow-hidden",
            },
            menu: {
              className: "!gap-1 !text-white ",
            },
            label: {
              className: "hover:!text-green labels-crum",
            },

            separatorIcon: {
              className: "!text-white",
            },
            action: {
              className: "focus:!shadow-none",
            },
          }}
        />
      </div>
      <p className="mt-4 text-green w-[90%] m-auto">
        {phasesInstructions[phase - 1]}
      </p>
    </div>
  );
};
