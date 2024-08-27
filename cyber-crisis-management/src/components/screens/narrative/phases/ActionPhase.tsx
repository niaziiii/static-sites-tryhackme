import { useState, useEffect, useRef } from "react";
import { useGameContext } from "../../../../context/context";
import ThmButton from "../../../button";
import { ActionOptionType } from "../../../../utils/types/type";
import { appAsset } from "../../../../constants";
import { POWER_UPS } from "../../../../constants/componentsData";
import { LOCKED_ACTIONS } from "../../../../constants/data";
import { AiFillLock } from "react-icons/ai";

const ActionPhase = ({ incPhases }: { incPhases: () => void }) => {
  const { state, dispatch } = useGameContext();
  const [credits, setCredits] = useState(state.activeNarative.actionCredits);
  const [totalCredits, setTotalCredits] = useState(1);
  const [actionOptions, setActionOptions] = useState<ActionOptionType[]>(
    state.activeNarative.actionLists
  );
  const [disabledActionOptions, setDisabledActionOptions] = useState<
    ActionOptionType[]
  >(state.activeNarative.actionLists);

  const targetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    dispatch({
      type: "SET_ESTATE_DAMAGE",
      payload: (state.estateDamage || 0) + 30,
    });

    const actionOpt = state.activeNarative.unlockedActions;
    const prevUniqueActions = [...new Set(actionOpt)];

    setActionOptions((prev) => {
      return prev.filter((action) => {
        if (!action.action) return true;

        const lockedAction = action.action;
        const lockedActionObj = LOCKED_ACTIONS[lockedAction];
        action.actionName = lockedActionObj.name;

        return prevUniqueActions.includes(lockedAction);
      });
    });

    let currentCredits = state.activeNarative.actionCredits;

    if (state.powerUp && state.powerUp == POWER_UPS.ACTION.key) {
      currentCredits *= 2;
    }

    setCredits(currentCredits);
    setTotalCredits(currentCredits);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const disabledActionss = state.activeNarative.actionLists.filter(
      (action: ActionOptionType) => {
        if (!action.action) return false;

        if (
          state.activeNarative.unlockedActions.includes(
            (action as unknown as { action: never }).action
          )
        ) {
          return false;
        } else {
          return true;
        }
      }
    );

    setDisabledActionOptions(disabledActionss);
  }, []);

  const decCredits = () => {
    if (credits == 0) return;
    setCredits(credits - 1);
  };

  const actionClick = (value: number | undefined, title: string) => {
    if (credits == 0) return;

    const isAlreadyIncluded = actionOptions.some(
      (item) => item.title === title && item.type === "selected"
    );

    if (isAlreadyIncluded) return;

    setActionOptions((prev: ActionOptionType[]) => {
      return prev.map((option) => {
        if (option.title == title && option.type == "selected")
          return { ...option };

        if (option.title === title) {
          return { ...option, type: "selected" };
        } else {
          return { ...option };
        }
      });
    });

    if (!value) return;
    decCredits();
    dispatch({
      type: "SET_ESTATE_DAMAGE",
      payload: state.estateDamage - value,
    });
  };

  useEffect(() => {
    setTimeout(() => {
      if (targetRef.current) {
        targetRef.current.scrollIntoView({ behavior: "smooth" });
        targetRef.current.focus();
      }
    }, 100);
  }, []);
  return (
    <>
      <div className="-mt-16 flex flex-col items-center justify-between w-[80%] m-auto">
        <div className=" flex items-center justify-center">
          <img
            src={appAsset.action.main}
            alt="action icon"
            className="w-[20rem]"
          />
        </div>

        <div className="flex items-center justify-start m-auto mb-4 mt-4">
          <p className="py-2 px-6 rounded-lg my-4 text-thm bg-green font-bold relative">
            Choices Left
            <b
              className="absolute rounded-full -top-0 left-[100%] translate-x-[-50%] translate-y-[-50%] px-2 py-1 bg-black text-green shadow-green-100"
              style={{ boxShadow: "0px 0px 20px 0px" }}
            >
              {credits}/{totalCredits}
            </b>
          </p>
        </div>
      </div>
      <div
        className="m-auto flex flex-col items-center justify-center gap-[20px]"
        ref={targetRef}
      >
        {/* the unlocked action */}
        {actionOptions.map((action: ActionOptionType, i) => (
          <div
            className="w-full flex items-center justify-center relative"
            key={i}
          >
            {action.actionName && (
              <div
                style={{ boxShadow: "#3BC81E 0px 0px 20px 0px" }}
                className="px-2 rounded-lg text-thm bg-green absolute -right-[14px] -top-[12px] z-10"
              >
                {action.actionName}
              </div>
            )}
            <button
              onClick={() => actionClick(action.damage, action.title)}
              className={`py-4 text-sm font-bold transition-all duration-200 ease-in-out hover:scale-105 hover:bg-thm-900 bg-thm rounded-lg   px-4 w-full ${
                action.type == "selected" ? "!bg-green !text-black" : ""
              }`}
            >
              {action.title}
            </button>
          </div>
        ))}

        {/* the disabled actions */}
        {disabledActionOptions.map((action: ActionOptionType, i) => (
          <div
            className="w-full flex items-center justify-center relative"
            key={i}
          >
            {action.actionName && (
              <div className="py-1 text-red px-4 rounded-lg  absolute -left-[14px] -top-[20px] z-10">
                <AiFillLock fontSize={25} />
              </div>
            )}
            <button
              disabled
              className={`cursor-not-allowed py-4 text-sm font-bold transition-all duration-200 ease-in-out bg-thm-900  rounded-lg px-4   w-full ${
                action.type == "selected" ? "!bg-green !text-black" : ""
              }`}
            >
              Action not available due to investigation gaps.
            </button>
          </div>
        ))}
      </div>

      {credits === 0 && (
        <div className="m-auto mt-14 w-[18rem] lg:w-[20rem]">
          <ThmButton onClick={() => incPhases()}>Next Phase</ThmButton>
        </div>
      )}
    </>
  );
};

export default ActionPhase;
