import ScannerWrapper from "../common/scannerwrapper";
import { useState, useEffect } from "react";
import {
  portScannerInit,
  portScannerInputs,
  CheckPointKey,
  // postPortScannerMessages,
} from "../../utils/utils";
import { NetScannerInitType } from "../../utils/type";
import { useGameContext, actionTypes } from "../../context/context";
// import { ChatType } from "../../utils/type";
// import { PortScannerMessages } from "../../utils/utils";
import { MdOutlineComputer } from "react-icons/md";
interface PortScannerProps {
  // setMessages: (messages: ChatType[]) => void;
  playAnimation: () => void;
  resetAnimation: () => void;
  moveNextChat: (verifyCheckpoint: boolean) => void;
}
const PortScanner = ({
  // setMessages,
  playAnimation,
  resetAnimation,
  moveNextChat,
}: PortScannerProps) => {
  // const { dispatch } = useGameContext();
  const [portIp, setPortIp] = useState("");
  const [scannerSetting, setScannerSetting] =
    useState<NetScannerInitType>(portScannerInit);
  const [specialMessages, setSpecialMessages] = useState<string[]>([]);

  const { state, dispatch, fn } = useGameContext();
  const { setAllowedAction, setCompletedAction } = fn;
  const { allowedAction } = state;

  useEffect(() => {
    dispatch({ type: actionTypes.SET_MESSAGE, payload: "PORT-SCANNER" });
    window.addEventListener("keydown", handleEscapeKeyPress);
    // setMessages(PortScannerMessages);

    return () => {
      window.removeEventListener("keydown", handleEscapeKeyPress);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const handleEscapeKeyPress = (event: { key: string }) => {
    if (event.key === "Escape") {
      dispatch({ type: actionTypes.DEFAULT_SCREEN });
      resetAnimation();
    }
  };

  const handleKeyUp = () => {
    if (portIp == portScannerInputs) {
      // When allowed action is netscannerip, then empty allowed action, mark completed, next chat
      if (CheckPointKey.PortScannerIP !== allowedAction) return;
      setAllowedAction(undefined);
      setCompletedAction(CheckPointKey.PortScannerIP);
      moveNextChat(false);
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setPortIp(event.target.value);
    setScannerSetting((prev) => ({
      ...prev,
      error: null,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (scannerSetting.disable) return;

    if (portIp == portScannerInputs) {
      const arr = [1, 5, 10, 15, 20, 21, 22, 30, 40, 50, 60, 70, 80];

      for (let i = 0; i < arr.length; i++) {
        setTimeout(() => {
          const port = arr[i];
          let postfix = "";
          if (port === 21) {
            postfix = "Port 21 open - vsftpd";
          } else if (port === 22) {
            postfix = "Port 22 open - vsftpd";
          } else if (port === 80) {
            postfix = "Port 80 open - vsftpd";
          }

          const output = `${portScannerInputs}:${arr[i]}...`;
          setScannerSetting((prev) => ({
            ...prev,
            output,
          }));

          if (postfix) setSpecialMessages((prev) => [...prev, postfix]);

          if (port === 80) {
            setTimeout(() => {
              setScannerSetting((prev) => ({
                ...prev,
                output: "",
              }));
            }, 1000);
          }
        }, 800 * (i + 1));
      }

      // setMessages(postPortScannerMessages);
      dispatch({ type: actionTypes.SET_ANIMATION, payload: "PORT-SCANNER" });
      playAnimation();
      if (CheckPointKey.PortScannerButton !== allowedAction) return;
      setTimeout(() => {
        setAllowedAction(undefined);
        setCompletedAction(CheckPointKey.PortScannerButton);
        moveNextChat(false);
      }, 8000);

      return;
    }

    setScannerSetting(() => {
      return {
        disable: false,
        error: "The IP is not valid.",
        output: null,
      };
    });
  };

  const homePage = () => {
    dispatch({ type: actionTypes.DEFAULT_SCREEN });
    dispatch({ type: actionTypes.DEFAULT_ANIMATION });
    resetAnimation();
  };

  return (
    <div>
      <ScannerWrapper heading="Port Scanner">
        <form onSubmit={handleSubmit}>
          <div className="p-4 flex flex-col rounded ">
            <div className="flex items-center gap-4">
              <p>IP address:</p>
              <input
                onKeyUp={handleKeyUp}
                name="startIp"
                className={`${inpStyle} ${
                  allowedAction === CheckPointKey.PortScannerIP
                    ? "highlight"
                    : ""
                }`}
                value={portIp}
                onChange={handleChange}
                disabled={false}
              />
            </div>
            {scannerSetting.error && (
              <small className="ml-24 text-red">{scannerSetting.error}</small>
            )}

            <div className="flex gap-4 mt-4">
              <p>
                Output:
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </p>
              <div className=" bg-[#d4d8df] text-thm border rounded flex flex-col justify-center gap-4 p-2 w-full">
                {specialMessages.map((message, index) => (
                  <div key={index} className="flex items-center gap-6 w-full">
                    <span className="text-[#223654] text-3xl">
                      <MdOutlineComputer />
                    </span>
                    <div className="flex">
                      <p>{message}</p>
                    </div>
                  </div>
                ))}
                <p>{scannerSetting.output}</p>
              </div>
            </div>
            {/* the buttons */}
            <div className="flex items-center gap-6 justify-center mt-4">
              <button
                // className="bg-green text-black py-0 px-3 rounded-md"
                className={`text-thm bg-green capitalize text-lg
            hover:bg-[#7c8390ab] focus:outline-none w-[30%] focus:ring-4 
            focus:ring-gray 
            font-medium rounded-full 
              px-5 pt-1 pb-1 text-center 
            mr-2 mb-2 hover:bg-green-100 duration-200 ${
              allowedAction === CheckPointKey.PortScannerButton
                ? "highlight"
                : ""
            }`}
                type="submit"
              >
                Scan
              </button>
              <button
                // className="bg-red text-white py-0 px-3 rounded-md"
                className="
                text-white bg-red capitalize text-lg
                hover:bg-[#7c8390ab] focus:outline-none w-[30%] focus:ring-4 
                focus:ring-gray 
                font-medium rounded-full 
                  px-5 pt-1 pb-1 text-center 
                mr-2 mb-2  hover:bg-red-700 duration-200"
                onClick={homePage}
              >
                Close
              </button>
            </div>
          </div>
        </form>
      </ScannerWrapper>
    </div>
  );
};

export default PortScanner;
const inpStyle =
  "px-2 py-1  bg-[#d4d8df] text-thm rounded outline-none border-none max-w-[10rem] overflow-hidden";
