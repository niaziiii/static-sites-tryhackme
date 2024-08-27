import { lazy, Suspense } from "react";
import { IPlayerProps } from "@lottiefiles/react-lottie-player";

const LazyPlayer = lazy(() =>
  import("@lottiefiles/react-lottie-player").then((module) => ({
    default: (props: IPlayerProps) => <module.Player {...props} />,
  }))
);

const Blocker = ({ animation }: { animation: string }) => {
  return (
    <div>
      <Suspense fallback={<div>Loading JSON data...</div>}>
        <LazyPlayer
          autoplay
          loop
          src={animation}
          style={{
            width: "4rem",
          }}
          controls={false}
        />
      </Suspense>
    </div>
  );
};

export default Blocker;
