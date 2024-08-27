// Context to maange if the game has started or has ended
import { createContext, useState } from "react";

export const GameContext = createContext({
  state: "idle",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  setGame: (_state: string) => {},
});

export const GameContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, setState] = useState("idle");
  const setGame = (state: string) => setState(state);
  const value = { state, setGame };
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
