import { useState, useRef, useEffect } from "react";
import { useGameContext } from "../../../../context/context";
import ThmButton from "../../../button";
import { POWER_UPS_TYPE, TriageOptionType } from "../../../../utils/types/type";
import { triagePhaseOptionsLists } from "../../../../constants/componentsData";
import { appAsset } from "../../../../constants";
import TriageBox from "../../../triagebox/TriageBox";

const TriagePhase = ({
  incPhases,
  phase,
  setSelectedActionHandler,
}: {
  incPhases: () => void;
  phase: number;
  setSelectedActionHandler: (arg1: TriageOptionType) => void;
}) => {
  const { dispatch } = useGameContext();
  const [triageOptions, setTriageOptions] = useState<TriageOptionType[]>(
    triagePhaseOptionsLists
  );
  const [selected, setSelected] = useState(false);
  const targetRef = useRef<HTMLDivElement | null>(null);

  const triageClick = (value: POWER_UPS_TYPE) => {
    setSelected(true);
    setTriageOptions((prev: TriageOptionType[]) => {
      return prev.map((option) => {
        if (option.key === value) {
          setTimeout(() => {
            setSelectedActionHandler({ ...option, type: "selected" });
          }, 100);
          return { ...option, type: "selected" };
        } else {
          return { ...option, type: "disabled" };
        }
      });
    });

    dispatch({ type: "ADD_POWER_UP", payload: value });
  };

  useEffect(() => {
    setTimeout(() => {
      if (targetRef.current) {
        targetRef.current.scrollIntoView({ behavior: "smooth" });
        targetRef.current.focus();
      }
    }, 100);
  }, [phase]);

  return (
    <>
      <div className="m-auto mt-0 flex flex-col items-center justify-center gap-[20px]">
        <div
          className=" flex items-center justify-center mb-8 w-full relative"
          ref={targetRef}
        >
          <img
            src={appAsset.triage.main}
            alt="action icon"
            className="w-[20rem]"
          />
        </div>
        <div className="flex justify-between w-full gap-4 rounded-lg">
          {triageOptions.map((triage: TriageOptionType, i) => (
            <TriageBox key={i} triage={triage} triageClick={triageClick} />
          ))}
        </div>
      </div>

      {selected && (
        <div className=" m-auto mt-14 w-[18rem] lg:w-[20rem]">
          <ThmButton onClick={() => incPhases()}>Next Phase</ThmButton>
        </div>
      )}
    </>
  );
};

export default TriagePhase;
