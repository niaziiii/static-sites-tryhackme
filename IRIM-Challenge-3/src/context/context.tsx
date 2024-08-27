import React, { createContext, useContext, useReducer } from "react";
import { GameState } from "../utils/types/type";

// Action types
export const actionTypes = {
  END_GAME: "END_GAME",
  UPDATE_HEALTH: "UPDATE_HEALTH",
  SET_PLAYER_STATE: "SET_PLAYER_STATE",
} as const;

export type Action = {
  type: keyof typeof actionTypes;
  payload?: unknown;
};

const gameReducer = (state: GameState, action: Action): GameState => {
  switch (action.type) {
    case actionTypes.UPDATE_HEALTH:
      return { ...state, playerHealth: action.payload as number };

    case actionTypes.SET_PLAYER_STATE:
      return { ...state, playerState: action.payload as string };

    default:
      return state;
  }
};

const initialGameState: GameState = {
  playerHealth: 0, // inital player health
  playerSpeed: 200, // 100kmph
  walkDuration: 60, //sec
  playerState: "WALKING", //Player moving state
};

export const GameContext = createContext<
  { state: GameState; dispatch: React.Dispatch<Action> } | undefined
>(undefined);

export const GameContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer<React.Reducer<GameState, Action>>(
    gameReducer,
    initialGameState
  );

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useGameContext = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGameContext must be used within a GameContextProvider");
  }
  return context;
};
