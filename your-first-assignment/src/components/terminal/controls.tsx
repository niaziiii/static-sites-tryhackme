import React, {
  useEffect,
  useRef,
  ReactElement,
  JSXElementConstructor,
} from "react";
import Badge from "../common/badge";
import TerminalHeader from "../core/TerminalHeader";
import { CheckPointKey } from "../../utils/utils";
import { useGameContext } from "../../context/context";
type ControlsType = {
  inputText: string;
  setInputText: (value: string) => void;
  terminalOutput: ReactElement[];
  commandHistory: string | string[];
  commandIndex: number;
  setCommandIndex: (value: number) => void;
  showDefaultCMD: ReactElement;
  isPassword: boolean;
  handleInputSubmit: () => void;
};

const ControlsTerminal = (props: ControlsType) => {
  const {
    commandHistory,
    commandIndex,
    inputText,
    showDefaultCMD,
    terminalOutput,
    isPassword,
    setCommandIndex,
    setInputText,
    handleInputSubmit,
  } = props;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const terminalContainerRef = useRef<HTMLDivElement | null>(null);

  const { state } = useGameContext();
  const { allowedAction } = state;

  useEffect(() => {
    // Focus on the input field when the component mounts or when command history changes
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [commandHistory]);

  useEffect(() => {
    // Focus on the input field when the component mounts or when command history changes
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [commandHistory]);

  useEffect(() => {
    // Scroll to the bottom of the terminal container when new content is added
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTop =
        terminalContainerRef.current.scrollHeight;
    }
  }, [terminalOutput]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      // Process user input when Enter key is pressed
      event.preventDefault();
      handleInputSubmit();
    } else if (event.key === "ArrowUp") {
      // Retrieve previous command from history when Arrow Up key is pressed
      event.preventDefault();
      if (commandIndex < commandHistory.length - 1) {
        const newIndex = commandIndex + 1;
        setCommandIndex(newIndex);
        setInputText(commandHistory[newIndex]);
      }
    } else if (event.key === "ArrowDown") {
      // Retrieve next command from history when Arrow Down key is pressed
      event.preventDefault();
      if (commandIndex > 0) {
        const newIndex = commandIndex - 1;
        setCommandIndex(newIndex);
        setInputText(commandHistory[newIndex]);
      } else if (commandIndex === 0) {
        // Clear the input field if the user navigates back to the current command
        setCommandIndex(-1);
        setInputText("");
      }
    }
  };
  const checkFocus = (e: React.MouseEvent<Element, MouseEvent>) => {
    const target = e.target as HTMLElement;
    const className = target?.className || "";
    if (!className.includes("terminal-body")) return;
    inputRef?.current?.focus();
  };

  return (
    <div className={`flex flex-col absolute w-full top-0 h-full `}>
      <Badge childeren={<TerminalHeader />} />
      <div
        ref={terminalContainerRef}
        className={` bg-[#282c33] terminal-body text-white font-[monospace] sm:text-sm md:text-base lg:text-lg p-4 min-w-[660px] w-full  m-0 grow overflow-y-auto 
        ${
          (allowedAction &&
            [
              CheckPointKey.TerminalNmap,
              CheckPointKey.PortScannerNmap,
              CheckPointKey.PasswordSshCommand,
              CheckPointKey.TomPassword,
            ].includes(allowedAction))
            ? "highlight"
            : ""
        }`}
        // || CheckPointKey.PortScannerNmap || CheckPointKey.PasswordSshCommand || CheckPointKey.TomPassword
        onClick={(e) => checkFocus(e)}
      >
        {terminalOutput &&
          terminalOutput.map(
            (
              element: ReactElement<string | JSXElementConstructor<unknown>>,
              index: number
            ) => (
              <div key={index} className="mb-1">
                {element}
              </div>
            )
          )}

        <form onSubmit={handleInputSubmit}>
          <div className="flex items-center">
            {showDefaultCMD}

            <input
              ref={inputRef}
              type={isPassword ? "password" : "text"}
              className="bg-transparent text-white ml-1 outline-none flex-1"
              value={inputText}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ControlsTerminal;
