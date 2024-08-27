import { ReactElement } from "react";
import { CheckPointKey } from "./utils";

export interface ProcessInterface {
  screen: ScreenType;
  title: string;
  icon: string;
  checkPoint?: CheckPointKey;
}

export type ScreenType =
  | null
  | "NET-SCANNER"
  | "PORT-SCANNER"
  | "PASSWORD-MANAGER";

export interface NetScannerInitType {
  disable: boolean;
  error: string | null;
  output: string | null;
}
export enum IMessage {
  NET_SCANNER = "NET-SCANNER",
  PORT_SCANNER = "PORT-SCANNER",
  PASSWORD_MANAGER = "PASSWORD-MANAGER",
  pinbrute_help = "pinbrute --help",
}

export interface GameState {
  screen: ScreenType;
  phase: number;
  networkAnimation: ScreenType;
  chatMessageType: IMessage | null;
  allowedAction?: CheckPointKey | null;
  completedAction?: CheckPointKey | null;
}

export type HandleOutputTypes = {
  inputText: ReactElement | string;
  response: ReactElement | ReactElement;
  error?: boolean;
};
export type PopupType = {
  message?: string;
  heading?: string | JSX.Element;
  children?: JSX.Element;
  visible: boolean;
  close: () => void;
  isRefresh: boolean;
};

export type ChatType = {
  message: string;
  bot: boolean;
  visited?: boolean;
  onSuccess?: boolean;
  checkPoint?: CheckPointKey;
};
