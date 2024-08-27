import { appAsset } from "../../constants";
import { useEffect, useState } from "react";
import { useGameContext } from "../../context/context";
import { Player, Controls } from "@lottiefiles/react-lottie-player";

const LoadingAnimation = ({
  toggleAnimation,
}: {
  toggleAnimation: () => void;
}) => {
  const [isAnimationVisible, setIsAnimationVisible] = useState(false);
  const { state } = useGameContext();

  // this will mounted when animation is enabled
  useEffect(() => {
    const animationTimeout = setTimeout(() => {
      setIsAnimationVisible(true);
    }, 0);

    return () => clearTimeout(animationTimeout);
  }, []);

  // this will mount when the animation completes
  useEffect(() => {
    const animationTimeout = setTimeout(() => {
      toggleAnimation();
    }, 5000);

    return () => clearTimeout(animationTimeout);
  }, []);

  return (
    <div
      className={`w-[90%] m-auto md:w-full ${
        isAnimationVisible ? "h-[100vh]" : "h-0"
      } transition-all duration-1000 ease-in-out overflow-hidden flex items-center justify-center`}
    >
      <div
        className={`lottie-container ${isAnimationVisible ? "fade-in" : ""}`}
      >
        <Player
          autoplay
          loop
          src={appAsset.intro[state.activeNarativeIndex as unknown as number]}
          style={{ width: "660px", minHeight: "80vh", height: "80vh" }}
        >
          <Controls visible={false} />
        </Player>
      </div>
    </div>
  );
};

export default LoadingAnimation;
