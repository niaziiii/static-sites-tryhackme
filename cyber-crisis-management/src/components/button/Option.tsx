import { useState } from "react";
import { useGameContext } from "../../context/context";
import { CommunicationButtonOptions } from "../../utils/types/type";
import { POWER_UPS } from "../../constants/componentsData";

export const CommunicationOptionButton = (
  props: CommunicationButtonOptions
) => {
  const { options, selectOption } = props;
  const { title, damage, type, hint, color } = options;
  const { state } = useGameContext();

  const [borderColor, _] = useState(
    hint && state.powerUp == POWER_UPS.COMMUNICATION.key
      ? `${color as string}`
      : null
  );

  return (
    <div className="min-h-[50px] w-full">
      <button
        style={{
          border: `1px solid ${borderColor ? borderColor : "transparent"}`,
        }}
        className={` bg-thm hover:bg-thm-900 rounded-lg py-1 px-4 
      transition-all h-full w-full text-sm font-bold duration-200 ease-in-out hover:scale-105 ${
        type === "selected" ? "!bg-green !text-black" : ""
      }`}
        onClick={() => selectOption(damage, title)}
      >
        {title}
      </button>
    </div>
  );
};
