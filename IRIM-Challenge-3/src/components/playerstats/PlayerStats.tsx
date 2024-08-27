import { formatTime } from "../../constants/callbacks";
import { useEffect, useState } from "react";

interface PlayerStatsProps {
  playerHealth: number;
  gameEnd: () => void;
}
const PlayerStats = ({ playerHealth, gameEnd }: PlayerStatsProps) => {
  const [remainingTime, setRemainingTime] = useState(60);

  // Updating remaining time
  useEffect(() => {
    const interval = setInterval(() => {
      if (remainingTime <= 0) {
        gameEnd();
        return;
      }
      const _remaining = remainingTime - 1;
      setRemainingTime(Math.round(_remaining));
    }, 1000);

    return () => clearInterval(interval);
  }, [remainingTime, gameEnd]);

  return (
    <div className="flex justify-between p-2 absolute top-0 left-0 w-full">
      <div className="bg-[#151C2B] px-2 py-0 rounded-lg shadow-md flex items-center">
        <span className="text-white text-xl font-semibold mr-2">Score:</span>
        <span
          id="score"
          className="text-white text-2xl font-bold animate-pulse"
        >
          {playerHealth}
        </span>
      </div>
      <div className="bg-[#151C2B] px-2 py-0 rounded-lg shadow-md flex items-center">
        <span className="text-white text-xl font-semibold mr-2">Time:</span>
        <span id="time" className="text-white text-2xl font-bold animate-pulse">
          {formatTime(remainingTime)}
        </span>
      </div>
    </div>
  );
};

export default PlayerStats;
