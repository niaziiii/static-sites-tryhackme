/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import RestartModal from "./components/RestartModal";
import InstructionModal from "./components/InstructionModal";
import FlagModal from "./components/FlagModal";
import { questions } from "./utils/consts";
import { shuffleArray } from "./utils/utils";
import { AnswerT, QuestionT } from "./utils/types";
import useTimer from "./hooks/useTimer";

function App() {
  const [shuffledquestions, setShuffledQuestions] = useState<QuestionT[]>(
    shuffleArray(questions)
  );
  const [selectedAnswer, setSelectedAnswer] = useState<null | string>(null);
  const [answerClassAnimation, setAnswerClassAnimation] =
    useState<null | Boolean>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [showFlagModal, setShowFlagModal] = useState(false);
  const [showInstructionsModal, setShowInstructionsModal] = useState(true);
  const [showRestartModal, setShowRestartModal] = useState(false);
  const updateRestartModalVisibility = () => {
    setShowRestartModal((prev) => !prev);
  };
  const updateInstructionModalVisibility = () => {
    setShowInstructionsModal((prev) => !prev);
  };
  const updateFlagModalVisibility = () => {
    setShowFlagModal((prev) => !prev);
  };
  const { seconds, stopTimer, resetTimer } = useTimer({
    initialSeconds: 30,
    updateFailureModalVisibility: updateRestartModalVisibility,
  });

  const restartGame = () => {
    setCorrect(0);
    setCurrentQuestion(0);
    setShuffledQuestions(shuffleArray(questions));
    setShowInstructionsModal(true);
  };

  const checkAnswer = (selectedAnswer: string) => {
    if (selectedAnswer === shuffledquestions[currentQuestion].correctAnswer) {
      setCorrect((prev) => prev + 1);
      setAnswerClassAnimation(false);
      setTimeout(() => {
        setAnswerClassAnimation(null);
      }, 500);
      if (currentQuestion + 1 === shuffledquestions.length) {
        stopTimer();
        updateFlagModalVisibility();
        return;
      }
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setAnswerClassAnimation(true);
      setTimeout(() => {
        setAnswerClassAnimation(null);
      }, 1000);
    }
  };

  useEffect(() => {
    if (!showInstructionsModal) {
      resetTimer();
    }
  }, [showInstructionsModal]);

  return (
    <section className="flex flex-col min-h-screen gap-20 px-4 text-white bg-thm">
      <Header correct={correct} seconds={seconds} />
      <section className="flex flex-col items-center gap-10">
        <h2 className="text-xl font-medium">
          {shuffledquestions[currentQuestion].question}
        </h2>
        <div className="flex gap-12">
          {shuffledquestions[currentQuestion].answers.map((answer: AnswerT) => (
            <div
              onClick={() => {
                checkAnswer(answer.id);
                setSelectedAnswer(answer.id);
              }}
              className={`cardBox hover:scale-95 ease-in duration-200  ${
                answerClassAnimation && selectedAnswer === answer.id
                  ? "hover-animation bg-red"
                  : ""
              }`}
              key={answer.id}
            >
              <div
                className={`duration-200 ease-in card ${
                  answerClassAnimation && selectedAnswer === answer.id
                    ? "card-wrong"
                    : answerClassAnimation !== null &&
                      selectedAnswer === answer.id
                    ? " card-correct text-thm hover:bg-green "
                    : ""
                } `}
              >
                {answer.text}
              </div>
            </div>
          ))}
        </div>
      </section>
      <RestartModal
        restartGame={restartGame}
        visible={showRestartModal}
        updateVisibility={updateRestartModalVisibility}
      />

      <InstructionModal
        visible={showInstructionsModal}
        updateVisibility={updateInstructionModalVisibility}
      />
      <FlagModal
        restartGame={restartGame}
        visible={showFlagModal}
        updateVisibility={updateFlagModalVisibility}
      />
    </section>
  );
}

export default App;
