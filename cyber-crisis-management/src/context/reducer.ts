import { Action } from "./context";
import { GameState, POWER_UPS_TYPE } from "../utils/types/type";
import { ALL_NARRATIVES } from "../constants/data";

// setting values to global question credit
export const setQuestionCredits = (state: GameState, action: Action) => {
  return {
    ...state,
    activeNarative: {
      ...state.activeNarative,
      questionCredits: action.payload as number,
    },
  };
};

// setting values to global action credit
export const setActionCredits = (state: GameState, action: Action) => {
  return {
    ...state,
    activeNarative: {
      ...state.activeNarative,
      actionCredits: action.payload as number,
    },
  };
};

// setting values to global -> reputation state
export const setReputationState = (state: GameState, action: Action) => {
  return {
    ...state,
    reputationDamage: action.payload as number,
  };
};

// setting values to global -> damage state
export const setdamageState = (state: GameState, action: Action) => {
  return {
    ...state,
    estateDamage: action.payload as number,
  };
};

// setting unlock actions to current narrative
export const setUnlockedAction = (state: GameState, action: Action) => {
  return {
    ...state,
    activeNarative: {
      ...state.activeNarative,
      unlockedActions: [
        ...state.activeNarative.unlockedActions,
        action.payload as string,
      ],
    },
  };
};

// setting powerup to current narrative
export const setPowerUpTriage = (state: GameState, action: Action) => {
  return {
    ...state,
    activeNarative: {
      ...state.activeNarative,
      powerUp: action.payload as POWER_UPS_TYPE,
    },
  };
};

// changing the narrative and setting the state
export const updateNarrative = (state: GameState, action: Action) => {
  const updatedActiveNarrative = {
    ...ALL_NARRATIVES[action.payload as number],
  };

  return {
    ...state,
    activeNarative: updatedActiveNarrative,
    activeNarativeIndex: action.payload as number,
    powerUp: state.activeNarative.powerUp,
  };
};
