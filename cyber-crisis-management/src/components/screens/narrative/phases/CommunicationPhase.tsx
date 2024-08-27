import { useEffect, useState, useRef } from "react";
import { useGameContext } from "../../../../context/context";
import { CommunicationOptions } from "../../../../utils/types/type";
import ThmButton from "../../../button";
import { CommunicationOptionButton } from "../../../button/Option";
import { appAsset } from "../../../../constants";
import { ALL_NARRATIVES } from "../../../../constants/data";

const CommunicationPhase = ({
  resetPhases,
}: {
  resetPhases: (arg1: boolean) => void;
}) => {
  const { state, dispatch } = useGameContext();

  const [comOption, setComOption] = useState(
    state.activeNarative.communicationList
  );
  const [internal, setInternal] = useState(1);
  const [external, setExternal] = useState(1);
  const targetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    dispatch({
      type: "SET_REPUTATION_DAMAGE",
      payload: (state.reputationDamage || 0) + 30,
    });
  }, []);

  const selectExternal = (damage: number, title: string) => {
    if (external == 0) return;
    setExternal(0);
    setComOption((prev: CommunicationOptions) => {
      const updatedExternal = prev.external.map((option) => ({
        ...option,
        type:
          option.title === title && option.damage === damage
            ? "selected"
            : "disabled",
      }));

      return {
        internal: prev.internal,
        external: updatedExternal,
      };
    });

    dispatch({
      type: "SET_REPUTATION_DAMAGE",
      payload: state.reputationDamage - damage,
    });
  };

  const selectInternal = (damage: number, title: string) => {
    if (internal == 0) return;
    setInternal(0);

    setComOption((prev: CommunicationOptions) => {
      const updatedInternal = prev.internal.map((option) => ({
        ...option,
        type:
          option.title === title && option.damage === damage
            ? "selected"
            : "disabled",
      }));

      return {
        internal: updatedInternal,
        external: prev.external,
      };
    });

    dispatch({
      type: "SET_REPUTATION_DAMAGE",
      payload: state.reputationDamage - damage,
    });
  };

  const moveToOtherNarrative = () => {
    if (state.activeNarativeIndex < ALL_NARRATIVES.length - 1) {
      dispatch({
        type: "UPDATE_NARRATIVE",
        payload: state.activeNarativeIndex + 1,
      });
      resetPhases(false);
    } else {
      resetPhases(true);
    }
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
      <div className="flex items-center justify-center mb-10 -mt-16">
        <img
          src={appAsset.communication.main}
          alt="Question icon"
          className="w-[20rem]"
        />
      </div>
      <div className="grid grid-cols-2 gap-10 m-auto" ref={targetRef}>
        <div className="flex flex-col">
          <h2 className="text-center text-2xl font-bold ">
            Internal Communication
          </h2>
          <div className="flex flex-col  gap-4 mt-8">
            {comOption.internal.map((option, i) => {
              return (
                <CommunicationOptionButton
                  key={i}
                  options={option}
                  selectOption={selectInternal}
                />
              );
            })}
          </div>
        </div>
        <div className="flex flex-col">
          <h2 className="text-center text-2xl font-bold ">
            External Communication
          </h2>
          <div className="flex flex-col gap-4 mt-8">
            {comOption.external.map((option, i) => {
              return (
                <CommunicationOptionButton
                  key={i}
                  options={option}
                  selectOption={selectExternal}
                />
              );
            })}
          </div>
        </div>
      </div>
      {internal == 0 && external == 0 && (
        <div className="mt-14 w-[60%]  md:w-[18rem] lg:w-[20rem] m-auto">
          <ThmButton onClick={moveToOtherNarrative}>
            {state.activeNarativeIndex < ALL_NARRATIVES.length - 1
              ? "Next Story"
              : "Finish"}
          </ThmButton>
        </div>
      )}
    </>
  );
};
export default CommunicationPhase;
