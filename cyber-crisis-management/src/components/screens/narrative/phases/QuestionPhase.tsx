import { useState, useEffect, useRef, ReactNode } from "react";
import { useGameContext } from "../../../../context/context";
import ThmButton from "../../../button";
import { QuestionPhaseType } from "../../../../utils/types/type";
import { appAsset } from "../../../../constants";
import Questions from "../../../questions/Questions";
import { POWER_UPS } from "../../../../constants/componentsData";
import { Toast } from "primereact/toast";
import { ALL_NARRATIVES } from "../../../../constants/data";
import Popup from "../../../popup";
import { AiFillWarning } from "react-icons/ai";

const QuestionPhase = (props: QuestionPhaseType) => {
  const { incPhases } = props;
  const { state } = useGameContext();
  const [credits, setCredits] = useState<number>(0);
  const [slideUpAnimation, setSlideUpAnimation] = useState<boolean>(false);
  const [totalCredits, setTotalCredits] = useState<number>(0);
  const [initialInstructions, setinitialInstructions] = useState<boolean>(true);

  const toastRef = useRef<Toast>(null);

  useEffect(() => {
    let currentCredits = state.activeNarative.questionCredits;
    if (state.powerUp && state.powerUp == POWER_UPS.CSIRT.key) {
      currentCredits *= 2;
    }

    setCredits(currentCredits);
    setTotalCredits(currentCredits);
  }, [state.powerUp, state.activeNarative.questionCredits]);

  const decCredits = () => {
    if (credits == 0) return;
    setCredits(credits - 1);
  };

  const showNotifications = (heading: string, message: string | ReactNode) => {
    toastRef.current?.show({
      severity: "info",
      summary: heading ? heading : "Info",
      detail: message ? message : "Warning",
      life: 3000,
    });
  };
  const slideUpClasses = [
    "flex items-center justify-center absolute w-full opacity-100 top-[30%] left-[50%] translate-x-[-50%] translate-y-[-50%]",
    "transition-all duration-1000 transform absolute top-[50%] left-[50%] opacity-40 translate-x-[-50%] translate-y-[-50%]",
  ];

  const nextPhase = () => {
    if (state.activeNarativeIndex === ALL_NARRATIVES.length - 1) {
      incPhases(2);
      return;
    }

    incPhases();
  };

  useEffect(() => {
    setTimeout(() => {
      setSlideUpAnimation(true);
    }, 1500);
  }, []);

  return (
    <>
      {initialInstructions && (
        <Popup
          visible={initialInstructions}
          heading={
            <h1 className="flex items-center gap-3 text-red text-xl">
              
              <AiFillWarning className={"!text-[#efd100]"} fontSize={25} />
              Warning{" "}
              <AiFillWarning className={"!text-[#efd100]"} fontSize={25} />
            </h1>
          }
          message={state.activeNarative.initialStory}
          close={() => setinitialInstructions(false)}
          isRefresh={false}
          children={
            <div className="mt-8">
              <ThmButton onClick={() => setinitialInstructions(false)}>
                Let's Proceed!
              </ThmButton>
            </div>
          }
        />
      )}
      <Toast
        ref={toastRef}
        pt={{
          root: {
            className: "!border-[#A3EA2A] rounded !text-white",
          },
          summary: {
            className: "!text-white",
          },
          content: {
            className: "!bg-thm !border-[#A3EA2A] rounded",
          },
          detail: {
            className: "!text-white ",
          },
          icon: {
            className: "!text-green",
          },
          button: {
            className: "!text-green !text-xl",
          },
        }}
      />
      <div
        className={`w-[90%] m-auto relative ${
          slideUpAnimation ? "mt-12" : "mt-2"
        }`}
      >
        <div
          className={slideUpAnimation ? slideUpClasses[1] : slideUpClasses[0]}
        >
          <img
            src={appAsset.question.main}
            alt="Question icon"
            className="w-[20rem]"
          />
        </div>

        <div
          className={`flex flex-col m-auto mb-4 mt-4 transition-all duration-1000 ${
            slideUpAnimation ? "pt-0" : "pt-[370px]"
          }`}
        >
          <p
            className={`py-2 px-6 rounded-lg text-thm bg-green font-bold my-4 relative w-fit`}
          >
            Choices Left
            <b
              className="absolute rounded-full -top-0 left-[100%] translate-x-[-50%] translate-y-[-50%] px-2 py-1 bg-black text-green shadow-green-100"
              style={{ boxShadow: "0px 0px 20px 0px" }}
            >
              {credits}/{totalCredits}
            </b>
          </p>
          <p className="text-white z-10">
            Please select the questions you would like your SOC team to
            investigate. Be careful, your team has limited time so they won't be
            able to investigate everything!
          </p>
        </div>

        <div
          className={`flex flex-col items-center justify-center gap-[20px] relative`}
        >
          {state.activeNarative.questions.map((question, i) => (
            <Questions
              credits={credits}
              decCredits={decCredits}
              key={question.title}
              index={i}
              questions={question}
              showNotifications={showNotifications}
            />
          ))}
        </div>
      </div>

      {credits == 0 && (
        <div className="m-auto mt-14 w-[18rem] md:w-[15rem] lg:w-[20rem]">
          <ThmButton onClick={nextPhase}>Next Phase</ThmButton>
        </div>
      )}
    </>
  );
};

export default QuestionPhase;
