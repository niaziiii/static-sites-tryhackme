import { useEffect, useState } from "react";
import { POWER_UPS_TYPE, TriageOptionType } from "../../utils/types/type";
import { Tooltip } from "primereact/tooltip";

const TriageBox = ({
  triage,
  triageClick,
}: {
  triage: TriageOptionType;
  triageClick: (arg0: POWER_UPS_TYPE) => void;
}) => {
  const [orignalIcon, setOrignalIcon] = useState<string | undefined>(
    triage.greyIcon
  );

  const selectItem = (key: POWER_UPS_TYPE) => {
    setOrignalIcon(triage.icon);
    triageClick(key);
  };

  const highlightIconEnter = () => {
    setOrignalIcon(triage.icon);
  };

  const highlightIconLeave = () => {
    if (triage.type === "selected") return;
    setOrignalIcon(triage.greyIcon);
  };

  const cls = `triage-${triage.key as string}`;

  useEffect(() => {
    if (triage.type === "selected") {
      setOrignalIcon(triage.icon);
      return;
    }

    setOrignalIcon(triage.greyIcon);
  }, [triage]);

  return (
    <>
      <Tooltip
        className="w-[350px] m-w-[350px]"
        target={`.triage-${triage.key as string}`}
        position="top"
      >
        <div className="">
          <h3 className="text-green mb-2 text-xl">{triage.title}</h3>
          <p>{triage.description}</p>
        </div>
      </Tooltip>
      <div
        className={`triage-${
          triage.key as string
        } flex justify-between w-full gap-4 rounded-lg`}
      >
        <div
          className={`${cls} w-full cursor-pointer flex flex-col items-center justify-center bg-thm rounded-lg p-2 hover:scale-105 transition-all dauration-1000  ${
            triage.type === "selected"
              ? "border-2 border-green !shadow-lg !shadow-green "
              : ""
          } `}
          onMouseEnter={highlightIconEnter}
          onMouseLeave={highlightIconLeave}
          onClick={() => selectItem(triage.key as string)}
        >
          <img
            src={orignalIcon}
            alt="triage-icons"
            className="w-20 h-20 mb-2"
          />
          <button className={`transition-all text-lg`}>{triage.title}</button>
        </div>
      </div>
    </>
  );
};

export default TriageBox;
