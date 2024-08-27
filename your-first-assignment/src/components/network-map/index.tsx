import { useRef, useEffect } from "react";
import Badge from "../common/badge";
import { Player } from "@lottiefiles/react-lottie-player"; // Import Player from the library

const Index = ({
  animation,
  animationPlay,
}: {
  animation: string | null;
  animationPlay: boolean;
}) => {
  const lottieRef = useRef<Player>(null); // Ref to the Lottie Player component

  // Function to toggle play/pause
  const togglePlay = (isPlay: boolean) => {
    if (lottieRef.current) {
      if (isPlay) {
        return lottieRef.current.play(); // Pause the animation
      }
      lottieRef.current.stop(); // Play the animation
      return;
    }
  };

  useEffect(() => {
    togglePlay(animationPlay);
  }, [animationPlay]);

  if (animation == null) {
    return (
      <>
        <div className="border border-gray">
          <Badge title="Network Map" />
          <div className="flex text-center justify-center text-green">
            <h1>My PC</h1>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="border border-gray">
      <Badge title="Network Map" />
      <div className="h-full w-full flex items-center justify-center	">
        <Player
          autoplay={animationPlay}
          loop={false}
          src={animation}
          controls={false}
          ref={lottieRef}
          keepLastFrame={true}
        />
      </div>
    </div>
  );
};

export default Index;
