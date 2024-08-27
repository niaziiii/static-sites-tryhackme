import { useState } from "react";
import { QuestionType } from "../../utils/types/type";
import { useGameContext } from "../../context/context";

const Questions = (props: QuestionType) => {
  const {
    questions,
    credits,
    decCredits,
    isChild,
    showNotifications,
  } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [isShowAnswer, setIsShowAnswer] = useState(false);
  const [isAlreadyClicked, setIsAlreadyClicked] = useState(false);
  const { dispatch } = useGameContext();

  const [childerns] = useState(questions.children);

  const decrementCredits = () => {
    if (isAlreadyClicked) return;
    setIsOpen(true);
    decCredits();
    setIsAlreadyClicked(true);
  };

  const toggleAccordion = () => {
    if (credits === 0 || isAlreadyClicked) return;
    setIsOpen(!isOpen);
    setIsShowAnswer(true);
    decrementCredits();
    if (questions.answer && questions.unlock) {
      showNotifications(
        "Action Unlocked",
        <>
          Successfully unlocked action: <b>{questions?.unlockName as string}</b>.
        </>
      );
      dispatch({ type: "ADD_PREVIOUS_NARRATIVE", payload: questions?.unlock });
    }
  };

  return (
    <div
      className={`multi-level-accordion w-full bg-thm hover:bg-thm-900 rounded-xl ${
        isChild ? "border p-2" : "p-4"
      }`}
    >
      <div className="flex flex-col items-start  rounded-lg overflow-hidden">
        <button
          className="w-full text-start px-4 pl-1 py-1"
          onClick={toggleAccordion}
        >
          {questions.alphabet && <b className="mr-3">{questions.alphabet}.</b>}
          {questions.title}
        </button>
        {isShowAnswer && questions.answer && (
          <p className="text-green text-center p-0 ml-8 text-start">
            {questions.answer}
          </p>
        )}
      </div>

      {isOpen && childerns && (
        <div className="py-3 flex flex-col gap-2 w-[95%] ml-auto mt-4">
          {childerns?.map((child, i) => (
            <Questions
              credits={credits}
              decCredits={decCredits}
              key={i}
              questions={child}
              isChild={true}
              showNotifications={showNotifications}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Questions;
