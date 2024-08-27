import { useGameContext } from "../../context/context";
import { ProgressBar } from "primereact/progressbar";
import ThmButton from "../button";
import { AiOutlineClose } from "react-icons/ai";
import { useEffect, useState } from "react";

const DamageShow = ({
  children,
  isGameWon,
}: {
  children: JSX.Element;
  isGameWon: boolean;
}) => {
  const { state } = useGameContext();
  const [repDamageColor, setRepDamageColor] = useState("#A3EA2A");
  const [estateColor, setEstateColor] = useState("#A3EA2A");

  const reStartGame = () => {
    window.location.reload();
  };

  useEffect(() => {
    if (state.estateDamage < 30) {
      setEstateColor("#A3EA2A");
      return;
    }
    if (state.estateDamage < 60) {
      setEstateColor("#FFBF00");
      return;
    }
    setEstateColor("#FF0000");
  }, [state.estateDamage]);

  useEffect(() => {
    if (state.reputationDamage < 30) {
      setRepDamageColor("#A3EA2A");
      return;
    }
    if (state.reputationDamage < 60) {
      setRepDamageColor("#FFBF00");
      return;
    }
    setRepDamageColor("#FF0000");
  }, [state.reputationDamage]);

  return (
    <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center z-10">
      <div className="p-12 bg-thm m-auto w-auto min-w-[550px] max-w-[600px] rounded-lg flex flex-col gap-4 border relative">
        <span
          className="absolute top-4 right-4 text-2xl cursor-pointer "
          onClick={reStartGame}
        >
          <AiOutlineClose />
        </span>
        {isGameWon ? (
          <h1 className="text-3xl font-bold text-center mb-4">
            Congratulations!
          </h1>
        ) : (
          <h1 className="text-3xl font-bold text-center mb-4">
            Oops try again...
          </h1>
        )}
        <div className="flex flex-col gap-2 font-medium text-xl">
          <h2>
            Estate damage: &nbsp;
            <b className={`text-[${estateColor}]`}>{state.estateDamage}%</b>
          </h2>
          <ProgressBar
            value={state.estateDamage}
            pt={{
              value: {
                className: `!bg-[${estateColor}]`,
              },
            }}
          ></ProgressBar>
        </div>

        <div className="flex flex-col gap-2 font-medium text-xl">
          <h2>
            Reputation damage: &nbsp;
            <b className={`text-[${repDamageColor}]`}>
              {state.reputationDamage}%
            </b>
          </h2>
          <ProgressBar
            value={state.reputationDamage}
            pt={{
              value: {
                className: `!bg-[${repDamageColor}]`,
              },
            }}
          ></ProgressBar>
        </div>

        {children && isGameWon && (
          <div className="w-[90%] m-auto mt-6">{children}</div>
        )}
        {!isGameWon && (
          <small className="mt-2 text-sm text-red">
            Your effort was valiant, even though the damage exceeded 50%. Keep
            learning and improving.
          </small>
        )}

        {!isGameWon && (
          <div className="w-[50%] m-auto">
            <ThmButton onClick={reStartGame}>Restart!</ThmButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default DamageShow;
