import { useState } from "react";
// import OptimizedGamePlay from "../components/screens/OptimizedGamePlay.tsx";
import GamePlay from "../components/screens/GamePlay.tsx";
import IntroductionScreen from "../components/screens/IntroductionScreen.tsx";
import GameEnd from "../components/screens/GameEnd.tsx";

const Layout = () => {
  const [gameEnd, setGameEnd] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  const render = () => {
    if (showIntro)
      return <IntroductionScreen next={() => setShowIntro(false)} />;

    return <GamePlay gameEnd={() => setGameEnd(true)} />;
  };

  return (
    <div>
      {gameEnd && <GameEnd />}
      {render()}
    </div>
  );
};
export default Layout;
