import React, { createContext, useContext, useReducer } from "react";
import { GameState } from "../utils/types/type";
import { ALL_NARRATIVES } from "../constants/data";
import {
  setUnlockedAction,
  setPowerUpTriage,
  setdamageState,
  setReputationState,
  setActionCredits,
  setQuestionCredits,
  updateNarrative,
} from "./reducer";

// Action types
export const actionTypes = {
  START_GAME: "START_GAME",
  END_GAME: "END_GAME",
  UPDATE_NARRATIVE: "UPDATE_NARRATIVE",
  SHOW_SECREEN: "SHOW_SECREEN",
  ADD_PREVIOUS_NARRATIVE: "ADD_PREVIOUS_NARRATIVE",
  ADD_POWER_UP: "ADD_POWER_UP",
  SET_ESTATE_DAMAGE: "SET_ESTATE_DAMAGE",
  SET_REPUTATION_DAMAGE: "SET_REPUTATION_DAMAGE",
  SET_ACTION_CREDITS: "SET_ACTION_CREDITS",
  SET_QUESTION_CREDITS: "SET_QUESTION_CREDITS",
};

type ActionKeys = keyof typeof actionTypes;

export type Action = {
  type: (typeof actionTypes)[ActionKeys];
  payload?: unknown;
};

const gameReducer = (state: GameState, action: Action): GameState => {
  switch (action.type) {
    // GAME STARTING
    case actionTypes.START_GAME:
      return { ...state, isGameStarted: true };

    //  Updating / changing narrative
    case actionTypes.UPDATE_NARRATIVE:
      return updateNarrative(state, action);

    // ADDING SELECTED UNLOCKED-ACTION NARRATIVE
    case actionTypes.ADD_PREVIOUS_NARRATIVE:
      return setUnlockedAction(state, action);

    // ADDING TRIAGE POWER UP
    case actionTypes.ADD_POWER_UP:
      return setPowerUpTriage(state, action);

    // SETTING damage STATE
    case actionTypes.SET_ESTATE_DAMAGE:
      return setdamageState(state, action);

    // SETTING REPUTATION STATE
    case actionTypes.SET_REPUTATION_DAMAGE:
      return setReputationState(state, action);

    // SETTING ACTION CREDITS
    case actionTypes.SET_ACTION_CREDITS:
      return setActionCredits(state, action);

    // SETTING QUESTIONS CREDITS
    case actionTypes.SET_QUESTION_CREDITS:
      return setQuestionCredits(state, action);

    default:
      return state;
  }
};

const initialGameState: GameState = {
  isGameStarted: false,
  activeNarativeIndex: 0,
  reputationDamage: 0,
  estateDamage: 0,
  powerUp: null,
  activeNarative: {
    ...ALL_NARRATIVES[0],
  },
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
