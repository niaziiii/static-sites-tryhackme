import { useState } from "react";
import TriagePhase from "./phases/TriagePhase";
import ActionPhase from "./phases/ActionPhase";
import CommunicationPhase from "./phases/CommunicationPhase";
import QuestionPhase from "./phases/QuestionPhase";
import Stepper from "../../stepper/Stepper";
import { NarrativeHeader } from "../../NarrativeHeader/NarrativeHeader";
import LoadingAnimation from "../../loadingAnimation/LoadingAnimation";
import FlagScreen from "../../flagScreen/FlagScreen";
import { TriageOptionType } from "../../../utils/types/type";
import ActionBadge from "../../actionBadge/ActionBadge";
import StateCounter from "../../stateCounter/StateCounter";
import { useGameContext } from "../../../context/context";

const Narrative = () => {
  const { state } = useGameContext();
  const [phase, setPhase] = useState(1);
  const [flag, setFlag] = useState(false);
  const [isAnimationPlaying, setIsAnimationPlaying] = useState(true);
  const [selectedAction, setSelectedAction] = useState<TriageOptionType | null>(
    null
  );

  const incPhases = (inc = 1) => {
    const increment = inc || 1;
    if (phase == 4) return;
    setPhase(phase + increment);
  };

  const resetPhases = (isGameEnd: boolean) => {
    if (isGameEnd) {
      setFlag(true);
    } else {
      setPhase(1);
      setIsAnimationPlaying(true);
      setSelectedAction(null);
    }
  };

  const setSelectedActionHandler = (action: TriageOptionType) => {
    setSelectedAction(action);
  };

  if (flag) {
    return <FlagScreen />;
  }

  return (
    <>
      {/* <DamageShow /> */}
      {isAnimationPlaying ? (
        <LoadingAnimation
          toggleAnimation={() => setIsAnimationPlaying(false)}
        />
      ) : (
        <div className="m-auto pb-20">
          <div className="w-full flex items-center justify-center pt-8 pb-10">
            <NarrativeHeader phase={phase} />
          </div>

          <div className="w-[90%] m-auto ">
            <Stepper activePhase={phase} />
          </div>
          <div className="w-[90%] m-auto  flex flex-col gap-2 !mt-16">
            <div className="flex flex-col gap-2 w-fit">
              <StateCounter title="Estate Damage" damage={state.estateDamage} />
              <StateCounter
                title="Reputation Damage"
                damage={state.reputationDamage}
              />
            </div>
          </div>
          <div className="relative">
            {selectedAction && <ActionBadge selected={selectedAction} />}
          </div>
          <div className="w-[90%] m-auto">
            {/* Question Phase */}
            {phase == 1 && <QuestionPhase incPhases={incPhases} />}

            {/* Triage Phase */}
            {phase == 2 && (
              <TriagePhase
                phase={phase}
                incPhases={incPhases}
                setSelectedActionHandler={setSelectedActionHandler}
              />
            )}

            {/* Action Phase */}
            {phase == 3 && <ActionPhase incPhases={incPhases} />}

            {/* Communication Phase */}
            {phase == 4 && <CommunicationPhase resetPhases={resetPhases} />}
          </div>
        </div>
      )}
    </>
  );
};

export default Narrative;
