import { ReactNode } from "react";
import { POWER_UPS } from "../../constants/componentsData";

// question phase types
export interface QuestionPhaseType {
  incPhases: (num?: number) => void;
}

export interface QuestionType {
  decCredits: () => void;
  credits: number;
  questions: questionModel;
  index?: number;
  isChild?: boolean;
  showNotifications: (arg1: string, arg2: string | ReactNode) => void;
}

// Triage phase types
export type TriageOptionType = {
  key?: POWER_UPS_TYPE | string;
  title: string;
  description: string;
  type: "selected" | "disabled";
  icon?: string;
  greyIcon?: string;
  isPowerUp?: boolean;
};

// action phase types
export type ActionOptionType = {
  title: string;
  type: "selected" | "disabled" | string;
  damage: number;
  action: string | false;
  actionName?: string;
};

// communication phase types
export type CommunicationOption = {
  title: string;
  damage: number;
  type: "selected" | "disabled" | string;
  action: "internal" | "external";
  hint: boolean;
  color?: string;
};

export type CommunicationOptions = {
  internal: CommunicationOption[];
  external: CommunicationOption[];
};

export type CommunicationButtonOptions = {
  options: CommunicationOption;
  selectOption: (damage: number, title: string) => void;
};

export type PopupType = {
  message?: string;
  heading?: string | JSX.Element;
  children?: JSX.Element;
  visible: boolean;
  close: () => void;
  isRefresh: boolean;
};

export type LockedActionType = {
  [key: string]: {
    key: string;
    name: string;
  };
};

export interface questionModel {
  title?: string;
  answer?: string;
  unlock?: string;
  unlockName?: string;
  children?: questionModel[];
  alphabet: string;
}

export type POWER_UPS_TYPE = keyof typeof POWER_UPS | string;

export type NarrativeModel = {
  questionCredits: number;
  actionCredits: number;
  questions: questionModel[];
  powerUp: POWER_UPS_TYPE | null;
  unlockedActions: string[] | [];
  actionLists: ActionOptionType[];
  communicationList: CommunicationOptions;
  initialStory?: string;
};

// Reducer function
export type GameState = {
  isGameStarted: boolean;
  activeNarativeIndex: number;
  reputationDamage: number;
  estateDamage: number;
  powerUp: POWER_UPS_TYPE | null;
  activeNarative: NarrativeModel;
};
