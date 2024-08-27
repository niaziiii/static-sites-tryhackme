import { useState, useEffect } from "react";
import Popup from "../popup";
import { useGameContext } from "../../context/context";
import ThmButton from "../button";
import CopyingFlag from "../popup/CopyingFlag";

const GameEnd = () => {
  const { state } = useGameContext();
  const [showFlag, setShowFlag] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);

  useEffect(() => {
    if (state.playerHealth >= 0) setIsGameWon(true);
    else setIsGameWon(false);

    setShowFlag(true);
  }, []);

  return (
    <div>
      {showFlag &&
        (isGameWon ? (
          <Popup
            heading="Flag"
            isRefresh
            visible={true}
            close={() => setShowFlag(true)}
            children={<div className="w-full absolute left-[50%] top-[6rem] -translate-x-[50%] -translate-y-[50%] z-10 bg-thm-900 p-4 rounded-lg">
              <CopyingFlag message="THM{Avoiding.the.Common.IM.Mistakes}" />
            </div>}
          />
        ) : (
          <Popup
            close={() => setShowFlag(true)}
            isRefresh
            visible={true}
            heading="Game Over"
            message="Didn't happen this time! Best of luck for the next attempt."
            children={
              <div className="mt-4">
                <ThmButton onClick={() => window.location.reload()}>
                  Please Restart!
                </ThmButton>
              </div>
            }
          />
        ))}
    </div>
  );
};

export default GameEnd;
