import { useState, useEffect } from "react";
import { animations, playerStates } from "../../constants/data";
import { useGameContext, actionTypes } from "../../context/context";
import { lazy } from "react";
import { IPlayerProps } from "@lottiefiles/react-lottie-player";

const LazyPlayer = lazy(() =>
  import("@lottiefiles/react-lottie-player").then((module) => ({
    default: (props: IPlayerProps) => <module.Player {...props} />,
  }))
);

const PlayerMovement = () => {
  const { state, dispatch } = useGameContext();
  const [animationLoop, setAnimationLoop] = useState<boolean>(true);
  const [releaseAnimationPlayed, setReleaseAnimationPlayed] = useState<boolean>(false);
  const [animationSrc, setAnimationSrc] = useState<unknown>(
    animations.walking as unknown as string
  );

  const handleKeyDown = (event: { keyCode: number; key: string }) => {
    if (event.key === "ArrowUp" || event.keyCode === 32) {
      setAnimationSrc(animations.jump);
      setAnimationLoop(false);
      setReleaseAnimationPlayed(false)
      dispatch({ type: actionTypes.SET_PLAYER_STATE, payload: playerStates.JUMPING });
    } else if (event.key === "ArrowDown") {
      setAnimationSrc(animations.bending);
      setAnimationLoop(false);

      setReleaseAnimationPlayed(false)
      dispatch({ type: actionTypes.SET_PLAYER_STATE, payload: "BENDING" });
    }

  };

  const handleKeyUp = (event: { keyCode: number; key: string }) => {
    if (event.key === "ArrowUp" || event.keyCode === 32) {
      setAnimationSrc(animations.jumpRelease);
      setReleaseAnimationPlayed(true)
    } else if (event.key === "ArrowDown") {
      setAnimationSrc(animations.bendingRelease);
      setReleaseAnimationPlayed(true)
    }
  };

  const normalWalking = () => {
    setAnimationSrc(animations.walking);
    setAnimationLoop(true);
    setReleaseAnimationPlayed(false)
    dispatch({ type: actionTypes.SET_PLAYER_STATE, payload: "WALKING" });
  };

  useEffect(() => {
    if (state.playerState === "SPAWING") {
      setAnimationSrc(animations.playerSpawning)
      setAnimationLoop(false);
      setReleaseAnimationPlayed(true)
    }
  }, [state.playerState]);


  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const onAnimationEvent = (event: string) => {
    if (event === "complete") {
      normalWalking();
    }
    return
  };


  return (
    <div className="flex">
      <LazyPlayer
        autoplay
        loop={animationLoop}
        src={animationSrc as string}
        style={{
          width: "35rem",
        }}
        keepLastFrame={!animationLoop}
        speed={1.5}
        controls={true}
        onEvent={releaseAnimationPlayed ? onAnimationEvent : () => { return }}
      />
    </div>
  );
};

export default PlayerMovement;
