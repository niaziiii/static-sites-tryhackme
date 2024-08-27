import { lazy, Suspense } from "react";
import { IPlayerProps } from "@lottiefiles/react-lottie-player";
import background from "./../../constants/asset/background.json";
import LoadingSpinner from "./LoadingSpinner";

const LazyPlayer = lazy(() =>
  import("@lottiefiles/react-lottie-player").then((module) => ({
    default: (props: IPlayerProps) => <module.Player {...props} />,
  }))
);

const playerStyle = {
  minWidth: "100%",
  width: "100%",
  maxHeight: "100vh",
};

const BackgroundPlayAnimation = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <LazyPlayer
        autoplay
        loop
        src={background}
        style={playerStyle}
        controls={false}
      />
    </Suspense>
  );
};

export default BackgroundPlayAnimation;
