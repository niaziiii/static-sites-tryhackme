import { useState, useEffect, useCallback, useRef } from "react";
import {
  OptionBlockType,
  heightLevels,
  options,
  playerStates,
} from "../../constants/data";
import BackgroundPlayAnimation from "../animations/BackgroundPlayAnimation";
import PlayerStats from "../playerstats/PlayerStats";
import PlayerMovement from "../animations/PlayerMovement";
import { actionTypes, useGameContext } from "../../context/context";
import OptionBlock from "../animations/OptionBlock";

const initPosition = 580;
const OptimizedGamePlay = ({ gameEnd }: { gameEnd: () => void }) => {
  const { state, dispatch } = useGameContext();

  const { playerHealth } = state;

  const [asset, setAsset] = useState<OptionBlockType | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [assetLeft, setAssetLeft] = useState(initPosition);

  const [playerState, setPlayerState] = useState(playerStates.WALKING);

  const handleKeyDown = (event: { keyCode: number; key: string }) => {
    if (event.key === "ArrowUp" || event.keyCode == 32) {
      setPlayerState(playerStates.JUMPING);
    } else if (event.key === "ArrowDown") {
      setPlayerState(playerStates.BENDING);
    }
  };

  const normalWalking = useCallback(() => {
    setPlayerState(playerStates.WALKING);
  }, []);

  // Keep track of th timeout ID
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(normalWalking, 700);
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [normalWalking]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const _updatePlayerHealth = (value: number) => {
    setAsset(null);
    setCurrentIndex(currentIndex + 1);
    return dispatch({
      type: actionTypes.UPDATE_HEALTH,
      payload: value,
    });
  };

  const spawnPlayer = () => {
    setAsset(null);
    dispatch({
      type: actionTypes.SET_PLAYER_STATE,
      payload: "SPAWING",
    });
  };

  const checkCollision = (blocker: OptionBlockType) => {
    // console.log(blocker, playerState);
    console.log("checkCollision", playerState, blocker);

    const score = blocker.isGift ? 100 : -500;
    const newScore = playerHealth + score;

    if (blocker.isGift) {
      //Checking if height is H1 or player state is jumping
      if (blocker.height === heightLevels.H1) {
        if (playerState === playerStates.JUMPING) {
          _updatePlayerHealth(newScore);
          return;
        }

        console.log("Pause");
        setTimeout(() => setCurrentIndex(currentIndex + 1), 500);
        return;
      }

      //Checking if height is H2 or player state is jumping/walking
      if (
        blocker.height === heightLevels.H2 &&
        [playerStates.JUMPING, playerStates.WALKING].includes(playerState)
      ) {
        _updatePlayerHealth(newScore);
        return;
      }

      //Checking if height is H3 or player state is walking/bending
      if (
        blocker.height === heightLevels.H3 &&
        [playerStates.WALKING, playerStates.BENDING].includes(playerState)
      ) {
        _updatePlayerHealth(newScore);
        return;
      }
    } else {
      // H2 blockers for taking damage
      if (blocker.height === heightLevels.H2) {
        if (playerState === playerStates.BENDING) {
          return;
        }

        _updatePlayerHealth(newScore);
        spawnPlayer();
        return;
      }

      if (blocker.height === heightLevels.H3) {
        // H3 blockers for taking damage
        if (playerState === playerStates.JUMPING) {
          return;
        }

        _updatePlayerHealth(newScore);
        spawnPlayer();
        return;
      }
    }
  };

  useEffect(() => {
    const opt = options[currentIndex];
    if (!opt) return;

    if (opt.id === asset?.id) return;

    console.log("useEffect", playerState);

    setAsset(opt);
    setAssetLeft(initPosition);

    setTimeout(() => {
      setAssetLeft(0);
      setTimeout(() => {
        checkCollision(opt);
      }, 2500);
    }, 1000);
  }, [currentIndex, playerState, playerHealth, asset?.id, checkCollision]);

  return (
    <div className="flex flex-col items-center justify-center max-h-screen bg-thm-500 !overflow-y-hidden !overflow-x-hidden relative w-[660px] m-auto mt-20 rounded-lg">
      <PlayerStats playerHealth={state.playerHealth} gameEnd={gameEnd} />

      <div className="background w-full overflow-hidden">
        <BackgroundPlayAnimation />
        {asset && <OptionBlock option={asset} left={assetLeft} />}
      </div>

      <div className="absolute -bottom-6 left-0 w-[15rem] max-w-[15rerm]">
        <PlayerMovement />
      </div>

      {/* <div className="w-full !overflow-hidden z-10 absolute bottom-4 left-0 p-20 min-h-[50vh]">
        {blockers.map((block, i) => {
          return (
            block.isAlreadyDamage === false && (
              <PlayBlocker blocker={block} key={i} />
            )
          );
        })}
      </div> */}
    </div>
  );
};

export default OptimizedGamePlay;
