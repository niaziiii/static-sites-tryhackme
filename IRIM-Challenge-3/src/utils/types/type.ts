export type PopupType = {
  message?: string;
  heading?: string;
  children?: JSX.Element;
  visible: boolean;
  close: () => void;
  isRefresh: boolean;
};

export type GameState = {
  playerSpeed: number;
  walkDuration: number;
  playerHealth: number;
  playerState: "WALKING" | "JUMPING" | "BENDING" | "SPAWING" | string;
};

export type BlockerType = {
  id: number;
  position: number;
  value: number;
  isAlreadyColided: boolean;
  isAlreadyDamage: boolean;
  isGift: boolean;
  title?: string;
  height: "H1" | "H2" | "H3" | string;
  isActive: boolean;
};
