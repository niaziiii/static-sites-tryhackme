export type RestartT = {
  restartGame: () => void;
  visible: boolean;
  updateVisibility: () => void;
};

export type InstructionModalT = {
  visible: boolean;
  updateVisibility: () => void;
};

export type FlagModalT = {
  restartGame: () => void;
  visible: boolean;
  updateVisibility: () => void;
};

export type HeaderT = {
  correct: number;
  seconds?: number;
};

export type AnswerT = {
  id: string;
  text: string;
};

export type QuestionT = {
  id: number;
  question: string;
  answers: AnswerT[];
  correctAnswer: string;
};
