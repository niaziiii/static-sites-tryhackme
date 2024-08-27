import { useState, useEffect } from "react";
import { blockerData, playerStates, heightLevels } from "../../constants/data";
import BackgroundPlayAnimation from "../animations/BackgroundPlayAnimation";
import PlayerStats from "../playerstats/PlayerStats";
import PlayerMovement from "../animations/PlayerMovement";
import { actionTypes, useGameContext } from "../../context/context";
import SimpleBlock from "../animations/SimpleBlock";

const GamePlay = ({ gameEnd }: { gameEnd: () => void }) => {
  const { state, dispatch } = useGameContext();
  const [blockers, setBlockers] = useState(blockerData);

  const [remainingTime, setRemainingTime] = useState(state.walkDuration);
  const startTime = Date.now();
  let animationTimeout: number | undefined = undefined;

  const updatePlayerHealth = (active: boolean, value: number) => {
    if (!active) return;

    return dispatch({
      type: actionTypes.UPDATE_HEALTH,
      payload: value,
    });
  };

  const animateBlockers = () => {
    if (remainingTime === 0) {
      gameEnd();
    }

    const currentTime = Date.now();
    const newElapsedTime = (currentTime - startTime) / 1000;

    const updatedBlockers = blockers.map((blocker) => {
      const distanceMoved = newElapsedTime * state.playerSpeed;
      const newPosition = blocker.position - distanceMoved;

      // Check if the blocker has already collided with the player
      const isAlreadyColided = newPosition <= 100;

      return {
        ...blocker,
        position: newPosition,
        isAlreadyColided: isAlreadyColided,
      };
    });

    setBlockers(updatedBlockers);

    updatedBlockers.forEach((blocker) => {
      if (blocker.isAlreadyColided && !blocker.isAlreadyDamage) {
        // Handle the gift logic for different player states
        if (blocker.isGift && blocker.isActive) {
          //Checking if height is H1 or player state is jumping
          if (blocker.height === heightLevels.H1 && state.playerState === playerStates.JUMPING) {
            updatePlayerHealth(
              blocker.isActive,
              state.playerHealth + blocker.value
            );
            blocker.isAlreadyDamage = true;
          }

          //Checking if height is H2 or player state is jumping/walking
          if (
            blocker.height === heightLevels.H2 &&
            (state.playerState === playerStates.WALKING || state.playerState === playerStates.JUMPING)
          ) {
            updatePlayerHealth(
              blocker.isActive,
              state.playerHealth + blocker.value
            );
            blocker.isAlreadyDamage = true;
          }

          //Checking if height is H3 or player state is jumping/bending
          if (
            blocker.height === heightLevels.H3 &&
            (state.playerState === playerStates.WALKING || state.playerState === playerStates.BENDING)
          ) {
            updatePlayerHealth(
              blocker.isActive,
              state.playerHealth + blocker.value
            );
            blocker.isAlreadyDamage = true;
          }
          blocker.isActive = false;
        } else {
          // H2 blockers for taking damage
          if (blocker.height === heightLevels.H2) {
            if (state.playerState === playerStates.BENDING) {
              blocker.isActive = false;
              return;
            }
            if (blocker.isActive) {
              updatePlayerHealth(
                blocker.isActive,
                state.playerHealth - blocker.value
              );
              dispatch({
                type: actionTypes.SET_PLAYER_STATE,
                payload: "SPAWING",
              });
            }
            blocker.isAlreadyDamage = true;
          }

          if (blocker.height === heightLevels.H3) {
            // H3 blockers for taking damage
            if (state.playerState === playerStates.JUMPING) {
              blocker.isActive = false;
              return;
            }
            if (blocker.isActive) {
              updatePlayerHealth(
                blocker.isActive,
                state.playerHealth - blocker.value
              );
              dispatch({
                type: actionTypes.SET_PLAYER_STATE,
                payload: "SPAWING",
              });
            }
            blocker.isAlreadyDamage = true;
          }
        }

        // Update the blockers array with the changes
        setBlockers((prevBlock) =>
          prevBlock.map((prevBlocker) =>
            prevBlocker.id === blocker.id ? { ...blocker } : prevBlocker
          )
        );
      }
    });

    if (newElapsedTime <= state.walkDuration) {
      animationTimeout = setTimeout(animateBlockers, 1000 / 60);
    }
  };

  useEffect(() => {
    animateBlockers();

    return () => {
      if (animationTimeout) {
        clearTimeout(animationTimeout);
      }
    };
  }, [state.playerHealth, state.playerState, remainingTime, animationTimeout]);

  // Updating remaining time
  useEffect(() => {
    if (remainingTime === 0) {
      return;
    }

    const interval = setInterval(() => {
      const currentTime = Date.now();
      const newElapsedTime = (currentTime - startTime) / 1000;
      const newRemainingTime = Math.max(0, state.walkDuration - newElapsedTime);

      setRemainingTime(newRemainingTime);
    }, 1000);

    return () => clearInterval(interval);
  }, [state.walkDuration]);

  return (
    <div className="flex flex-col items-center justify-center max-h-screen bg-thm-500 !overflow-y-hidden !overflow-x-hidden relative w-[660px] m-auto mt-20 rounded-lg">
      <PlayerStats playerHealth={state.playerHealth} gameEnd={gameEnd} />

      <div className="background w-full overflow-hidden">
        <BackgroundPlayAnimation />
      </div>

      <div className="absolute -bottom-6 left-0 w-[15rem] max-w-[15rerm]">
        <PlayerMovement />
      </div>

      <div className="w-full !overflow-hidden z-10 absolute bottom-4 left-0 p-20 min-h-[60vh]">
        {blockers.map((block, i) => {
          return (
            block.isAlreadyDamage === false && (
              <SimpleBlock blocker={block} key={i} />
            )
          );
        })}
      </div>
    </div>
  );
};

export default GamePlay;
