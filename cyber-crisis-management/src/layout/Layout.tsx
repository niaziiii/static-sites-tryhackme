import IntroductionScreen from "../components/screens/introduction/index.tsx";
import Narrative from "../components/screens/narrative/index.tsx";
import { actionTypes, useGameContext } from "../context/context.tsx";

const Layout = () => {
  const { state, dispatch } = useGameContext();

  if (!state.isGameStarted) {
    return (
      <IntroductionScreen
        next={() => dispatch({ type: actionTypes.START_GAME })}
      />
    );
  }
  return <Narrative />;
};

export default Layout;
