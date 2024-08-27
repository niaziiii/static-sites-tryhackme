import React, { createContext, useContext, useReducer } from "react";
import { GameState, ScreenType, IMessage } from "../utils/type";
import { CheckPointKey } from "../utils/utils";

// Action types
// eslint-disable-next-line react-refresh/only-export-components
export const actionTypes = {
  SET_SCREEN: "SET_SCREEN",
  DEFAULT_SCREEN: "DEFAULT_SCREEN",
  SET_ANIMATION: "SET_ANIMATION",
  DEFAULT_ANIMATION: "DEFAULT_ANIMATION",
  SET_PHASE: "SET_PHASE",
  SET_MESSAGE: "SET_MESSAGE",
  SET_ALLOWED_ACTION: "SET_ALLOWED_ACTION",
  SET_COMPLETED_ACTION: "SET_COMPLETED_ACTION",
} as const;

export type Action = {
  type: keyof typeof actionTypes;
  payload?: unknown;
};

const gameReducer = (state: GameState, action: Action): GameState => {
  switch (action.type) {
    case actionTypes.DEFAULT_SCREEN:
      return { ...state, screen: null };
    case actionTypes.SET_SCREEN:
      return { ...state, screen: action.payload as ScreenType };
    case actionTypes.SET_ANIMATION:
      return { ...state, networkAnimation: action.payload as ScreenType };
    case actionTypes.DEFAULT_ANIMATION:
      return { ...state, networkAnimation: null };
    case actionTypes.SET_PHASE:
      return { ...state, phase: action.payload as number };
    case actionTypes.SET_MESSAGE:
      return { ...state, chatMessageType: action.payload as IMessage };
    case actionTypes.SET_ALLOWED_ACTION:
      return { ...state, allowedAction: action.payload as CheckPointKey };
    case actionTypes.SET_COMPLETED_ACTION:
      return { ...state, completedAction: action.payload as CheckPointKey };
    default:
      return state;
  }
};

const initialGameState: GameState = {
  screen: null, // preseting the desktop which scanner/brower to open/show
  phase: 1,
  networkAnimation: null, //presting the network map which animation should play..
  chatMessageType: null,
};

type setAction = (payload: CheckPointKey | undefined) => void;

interface contextFunctions {
  setAllowedAction: setAction;
  setCompletedAction: setAction;
}

export const GameContext = createContext<
  | { state: GameState; dispatch: React.Dispatch<Action>; fn: contextFunctions }
  | undefined
>(undefined);

export const GameContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer<React.Reducer<GameState, Action>>(
    gameReducer,
    initialGameState
  );

  const setAllowedAction: setAction = (payload) =>
    dispatch({ type: actionTypes.SET_ALLOWED_ACTION, payload });

  const setCompletedAction: setAction = (payload) =>
    dispatch({ type: actionTypes.SET_COMPLETED_ACTION, payload });

  const fn = { setAllowedAction, setCompletedAction };

  return (
    <GameContext.Provider value={{ state, dispatch, fn }}>
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
