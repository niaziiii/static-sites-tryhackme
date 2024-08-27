import { useState, ReactElement } from "react";

import {
  welcomeText,
  defaultCMD,
  secretFileData,
  DirectoryLists,
  phase3,
  PhaseLists,
  terminalCmds,
  CheckPointKey,
} from "../../utils/utils";
import ControlsTerminal from "./controls";
import { useGameContext, actionTypes } from "../../context/context";
import { HandleOutputTypes } from "../../utils/type";
import { ChatType } from "../../utils/type";
import Banner from "./Banner";

interface TerminalProps {
  setMessages: (messages: ChatType[]) => void;
  setChat: (message: ChatType) => void;
  setAnimation: (index: number | null) => void;
  playAnimation: () => void;
  resetAnimation: () => void;
  moveNextChat: (verifyCheckpoint: boolean) => void;
}
const initialDirectory = "/home/tom/";
const rootDirectory = "/root";
const homeDirectory = "/home/";
const baseDirectory = "/";

const Index = ({
  moveNextChat,
  playAnimation,
  setAnimation,
}: TerminalProps) => {
  const [inputText, setInputText] = useState("");
  const [terminalOutput, setTerminalOutput] = useState<ReactElement[]>([
    welcomeText,
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [commandIndex, setCommandIndex] = useState<number>(-1);
  const [showDefaultCMD, setShowDefaultCMD] = useState(defaultCMD);
  const [isPassword, setIsPassword] = useState(false);
  // const { dispatch } = useGameContext();
  const [currentDirectory, setCurrentDirectory] = useState<string | null>(
    initialDirectory
  );
  const { state, dispatch, fn } = useGameContext();
  const { setAllowedAction, setCompletedAction } = fn;
  const { allowedAction } = state;
  const [host, setHost] = useState("user@attackbox");

  const handleDefaultSetting = (command: string[]) => {
    setCommandHistory(command);
    setCommandIndex(-1);
    setInputText("");
  };

  const handleOutput = (props: HandleOutputTypes) => {
    const { inputText, response } = props;
    setTerminalOutput((prev) => {
      return [
        ...prev,
        <div className="flex">
          {host}$ ~{">"}
          <p className={`ml-1   text-white`}>{inputText}</p>
        </div>,
        response,
      ];
    });
  };

  const handleInputSubmit = () => {
    const command = inputText.trim();
    let response = <div className="text-white">command not found</div>;
    const termInput = `${host}$ ~> ${command}`;

    // phase 1 cmd
    // this is for administration cmd for phase 1
    if (command === terminalCmds.ssh.command && !isPassword) {
      if (CheckPointKey.PasswordSshCommand !== allowedAction) return;

      setCommandHistory([command, ...commandHistory]);
      setCommandIndex(-1);
      setInputText("");
      setTerminalOutput((prev) => [...prev, <>{termInput}</>]);
      setShowDefaultCMD(<span className="text-blue">Enter Password</span>);
      setIsPassword(true);

      setAllowedAction(undefined);
      setCompletedAction(CheckPointKey.PasswordSshCommand);
      moveNextChat(false);
      return;
    }
    // this is for checking password is correct..
    if (isPassword) {
      if (command === terminalCmds.sshPassword.command) {
        if (CheckPointKey.TomPassword !== allowedAction) return;

        handleOutput({ inputText: <Banner />, response });
        // const inputText = renderToString(<Banner />);
        // handleOutput({ inputText,response });
        setAnimation(3);
        playAnimation();

        handleDefaultSetting([...commandHistory]);
        const updatedHost = "tom@victim";
        setHost(updatedHost);
        setShowDefaultCMD(
          <span className="text-red">
            {updatedHost}$ ~{">"}
          </span>
        );
        // setMessages(TerminalPasswordMessages);
        setIsPassword(false);

        setAllowedAction(undefined);
        setCompletedAction(CheckPointKey.TomPassword);
        moveNextChat(false);

        return;
      }

      const HidePassword = "*".repeat(command.length);
      response = <div className="text-white">Invalid password</div>;
      setInputText("");
      handleOutput({ inputText: HidePassword, response, error: false });
      return;
    }

    // phase 2 cmd

    // this for reviewing the list in the directory
    if (command == terminalCmds.listFiles.command) {
      if (currentDirectory == initialDirectory) {
        response = <DirectoryLists lists={[]} />;
      }

      if (currentDirectory == "/home") {
        response = <DirectoryLists lists={["tom"]} />;
      }

      if (currentDirectory == baseDirectory) {
        response = <DirectoryLists lists={["home", "root"]} />;
      }

      if (currentDirectory == rootDirectory) {
        response = <DirectoryLists lists={["flag.txt"]} />;
      }

      handleOutput({ inputText, response, error: false });
      handleDefaultSetting([command, ...commandHistory]);
      return;
    }

    // this is for reading the file => cat flag.txt
    if (
      command == terminalCmds.openFile.command &&
      currentDirectory == rootDirectory
    ) {
      if (CheckPointKey.CatCommand !== allowedAction) return;
      setTerminalOutput((prev) => {
        return [
          ...prev,
          <div className="flex">
            {host}/root$ ~{">"}
            <p className="text-white">{inputText}</p>
          </div>,
          <div className="bg-thm text-green p-2 rounded ml-1">
            <p className=""> {secretFileData}</p>
            <br />
            <p>{`{THM_01_F1R$T_A$$IGNMEN7}`}</p>
          </div>,
        ];
      });

      handleDefaultSetting([command, ...commandHistory]);
      setShowDefaultCMD(
        <span className="text-white">
          {host}/root$ ~{">"}
        </span>
      );

      setAllowedAction(undefined);
      setCompletedAction(CheckPointKey.CatCommand);
      moveNextChat(false);
      return;
    }

    // phase 3 cmd
    if (command === phase3.netScanner.cmd) {
      if (CheckPointKey.TerminalNmap !== allowedAction) return;
      response = <PhaseLists lists={phase3.netScanner.output} />;
      setAllowedAction(undefined);
      setCompletedAction(CheckPointKey.TerminalNmap);
      moveNextChat(false);
      handleOutput({ inputText, response, error: false });
      handleDefaultSetting([command, ...commandHistory]);
      // setMessages(postNmapMessages);
      setAnimation(0);
      dispatch({ type: actionTypes.SET_ANIMATION, payload: "NET-SCANNER" });
      playAnimation();

      return;
    }
    if (command === phase3.portScanner.cmd) {
      if (CheckPointKey.PortScannerNmap !== allowedAction) return;
      response = <PhaseLists lists={phase3.portScanner.output} />;
      setAllowedAction(undefined);
      setCompletedAction(CheckPointKey.PortScannerNmap);
      moveNextChat(false);

      dispatch({ type: actionTypes.SET_ANIMATION, payload: "PORT-SCANNER" });
      dispatch({ type: actionTypes.SET_MESSAGE, payload: "PORT-SCANNER" });
      setAnimation(1);
      playAnimation();

      handleOutput({ inputText, response, error: false });
      handleDefaultSetting([command, ...commandHistory]);
      // setMessages(postPortTerminalMessages);
      return;
    }
    if (command === phase3.passwordManager.cmd) {
      response = (
        <PhaseLists
          lists={phase3.passwordManager.output}
          flag={"{THM_03_FIRST_ASSIGNMENT}"}
        />
      );

      dispatch({
        type: actionTypes.SET_ANIMATION,
        payload: "PASSWORD-MANAGER",
      });
      // dispatch({
      //   type: actionTypes.SET_MESSAGE,
      //   payload: "PASSWORD-MANAGER",
      // });
      setAnimation(2);
      playAnimation();
      handleOutput({ inputText, response, error: false });
      handleDefaultSetting([command, ...commandHistory]);
      return;
    }
    if (command === phase3.help.cmd) {
      if (CheckPointKey.PasswordVictimCommand !== allowedAction) return;
      setAllowedAction(undefined);
      setCompletedAction(CheckPointKey.PasswordVictimCommand);
      moveNextChat(false);
      response = <PhaseLists lists={phase3.help.output} />;
      dispatch({ type: actionTypes.SET_MESSAGE, payload: "pinbrute --help" });
      handleOutput({ inputText, response, error: false });
      handleDefaultSetting([command, ...commandHistory]);
      return;
    }

    // this is for help cmd
    if (command == terminalCmds.help.command) {
      response = (
        <div className="text-blue">
          <p>Available commands :</p>
          <span className="flex items-center gap-8">
            <p>ls</p> <p>Lists directory contents of files and directories.</p>
          </span>
          <span className="flex items-center gap-8">
            <p>cd</p> <p>Change directory</p>
          </span>
          <span className="flex items-center gap-8">
            <p>cat</p>{" "}
            <p>It reads data from the file and gives its content as output.</p>
          </span>
          <span className="flex items-center gap-8">
            <p>pwd</p> <p>Print Working Directory.</p>
          </span>
        </div>
      );

      handleOutput({ inputText, response, error: false });
      handleDefaultSetting([command, ...commandHistory]);
      // setChat({
      //   message: "First, use the pwd command to print the current directory.",
      //   bot: true,
      // });
      return;
    }

    // this is for to show current directory => pwd
    if (command == terminalCmds.parentDirectory.command) {
      if (
        allowedAction &&
        ![
          CheckPointKey.CurrentDirPwd,
          CheckPointKey.HomePwd,
          CheckPointKey.HomePwd,
          CheckPointKey.BasePwd,
          CheckPointKey.RootPwd,
        ].includes(allowedAction)
      )
        return;
      response = (
        <div className="text-blue flex gap-4">
          <span>{currentDirectory ? currentDirectory : "/home"}</span>
        </div>
      );
      handleOutput({ inputText, response, error: false });
      handleDefaultSetting([command, ...commandHistory]);

      if (currentDirectory === initialDirectory) {
        if (CheckPointKey.CurrentDirPwd !== allowedAction) return;
        setAllowedAction(undefined);
        setCompletedAction(CheckPointKey.CurrentDirPwd);
        moveNextChat(false);
        return;
      }

      if (currentDirectory === homeDirectory) {
        if (CheckPointKey.HomePwd !== allowedAction) return;
        setAllowedAction(undefined);
        setCompletedAction(CheckPointKey.HomePwd);
        moveNextChat(false);
        return;
      }

      if (currentDirectory === baseDirectory) {
        if (CheckPointKey.BasePwd !== allowedAction) return;
        setAllowedAction(undefined);
        setCompletedAction(CheckPointKey.BasePwd);
        moveNextChat(false);
      }

      if (currentDirectory == rootDirectory) {
        if (CheckPointKey.RootPwd !== allowedAction) return;
        setAllowedAction(undefined);
        setCompletedAction(CheckPointKey.RootPwd);
        moveNextChat(false);
        return;
      }
      return;
    }

    // this is for go into directory => cd
    if (command == terminalCmds.backDirectory.command) {
      if (currentDirectory == initialDirectory) {
        if (CheckPointKey.CdHomeTom !== allowedAction) return;
        setCurrentDirectory("/home/");
        setTerminalOutput((prev) => {
          return [
            ...prev,
            <div className="flex">
              {host}/home$ ~{">"}
              <p className="text-white ml-1">{inputText}</p>
            </div>,
          ];
        });

        handleDefaultSetting([command, ...commandHistory]);
        setShowDefaultCMD(
          <span className="text-white">
            {host}/home$ ~{">"}
          </span>
        );

        setAllowedAction(undefined);
        setCompletedAction(CheckPointKey.CdHomeTom);
        moveNextChat(false);
        return;
      }

      if (currentDirectory == homeDirectory) {
        if (CheckPointKey.CdHome !== allowedAction) return;

        setCurrentDirectory(baseDirectory);

        setTerminalOutput((prev) => {
          return [
            ...prev,
            <div className="flex">
              {host}/$ ~{">"}
              <p className="text-white ml-1">{inputText}</p>
            </div>,
          ];
        });

        // handleOutput({ inputText, response, error: false });
        handleDefaultSetting([command, ...commandHistory]);
        setShowDefaultCMD(
          <span className="text-white">
            {host}/$ ~{">"}
          </span>
        );

        setAllowedAction(undefined);
        setCompletedAction(CheckPointKey.CdHome);
        moveNextChat(false);
        return;
      }
    }

    // this is for go into directory => cd
    if (command.split(" ")[0] == terminalCmds.exploreDirectory.command) {
      if (command == "cd root" && currentDirectory == baseDirectory) {
        if (CheckPointKey.CdRoot !== allowedAction) return;

        setCurrentDirectory(rootDirectory);
        setTerminalOutput((prev) => {
          return [
            ...prev,
            <div className="flex">
              {host}$ ~{">"}
              <p className="text-white ml-1">{inputText}</p>
            </div>,
          ];
        });

        handleDefaultSetting([command, ...commandHistory]);
        setShowDefaultCMD(
          <span className="text-white">
            {host}/root$ ~{">"}
          </span>
        );

        setAllowedAction(undefined);
        setCompletedAction(CheckPointKey.CdRoot);
        moveNextChat(false);
        return;
      }
    }

    handleOutput({ inputText, response, error: true });
    handleDefaultSetting([command, ...commandHistory]);
  };

  return (
    <>
      <ControlsTerminal
        commandHistory={commandHistory}
        commandIndex={commandIndex}
        inputText={inputText}
        setCommandIndex={setCommandIndex}
        setInputText={setInputText}
        showDefaultCMD={showDefaultCMD}
        terminalOutput={terminalOutput}
        isPassword={isPassword}
        handleInputSubmit={handleInputSubmit}
      />
    </>
  );
};

export default Index;
