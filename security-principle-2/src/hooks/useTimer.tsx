import { useInterval } from "primereact/hooks";
import { useState } from "react";

interface UseTimerProps {
  initialSeconds?: number;
  updateFailureModalVisibility: () => void;
}

const useTimer = ({
  initialSeconds,
  updateFailureModalVisibility,
}: UseTimerProps) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [active, setActive] = useState(false);

  useInterval(
    () => {
      if (seconds !== 0) {
        setSeconds((prevSecond) =>
          prevSecond === 1 ? 0 : prevSecond && prevSecond - 1
        );
      } else {
        updateFailureModalVisibility();

        setActive(false);
      }
    },
    1000,
    active
  );

  const startTimer = () => {
    setActive(true);
  };

  const stopTimer = () => {
    setActive(false);
  };

  const resetTimer = () => {
    setSeconds(initialSeconds);
    setActive(true);
  };

  return {
    seconds,
    active,
    startTimer,
    stopTimer,
    resetTimer,
  };
};

export default useTimer;
