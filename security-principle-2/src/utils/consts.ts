import { QuestionT } from "./types";

export const FINAL_FLAG = "THM{SECURITY_MODELS}";

export const questions: QuestionT[] = [
  {
    id: 1,
    question: "Which model dictates 'no read down'?",
    answers: [
      { id: "a", text: "Bell-LaPadula" },
      { id: "b", text: "Biba" },
      { id: "c", text: "Clark-Wilson" },
    ],
    correctAnswer: "b",
  },
  {
    id: 2,
    question: "Which model states 'no read up'?",
    answers: [
      { id: "a", text: "Bell-LaPadula" },
      { id: "b", text: "Biba" },
      { id: "c", text: "Clark-Wilson" },
    ],
    correctAnswer: "a",
  },
  {
    id: 3,
    question: "Which model teaches 'no write down'?",
    answers: [
      { id: "a", text: "Bell-LaPadula" },
      { id: "b", text: "Biba" },
      { id: "c", text: "Clark-Wilson" },
    ],
    correctAnswer: "a",
  },
  {
    id: 4,
    question: "Which model forces 'no write up'?",
    answers: [
      { id: "a", text: "Bell-LaPadula" },
      { id: "b", text: "Biba" },
      { id: "c", text: "Clark-Wilson" },
    ],
    correctAnswer: "b",
  },
  // Add more questions as needed
];
