import { MdOutlineComputer } from "react-icons/md";
import ScannerWrapper from "../common/scannerwrapper";
import { useState, useEffect } from "react";
import {
  CheckPointKey,
  netScannerInit,
  netscannerInputs,
  // postNetScannerMsgs,
} from "../../utils/utils";
import { useGameContext, actionTypes } from "../../context/context";
import { NetScannerInitType } from "../../utils/type";
// import { NetScannerMessages } from "../../utils/utils";
// import { ChatType } from "../../utils/type";
interface NetScannerProps {
  // setMessages: (messages: ChatType[]) => void;
  playAnimation: () => void;
  resetAnimation: () => void;
  moveNextChat: (verifyCheckpoint: boolean) => void;
}
const Netscanner = ({
  // setMessages,
  playAnimation,
  resetAnimation,
  moveNextChat,
}: NetScannerProps) => {
  // const { dispatch } = useGameContext();
  const { state, dispatch, fn } = useGameContext();
  const { setAllowedAction, setCompletedAction } = fn;
  const { allowedAction } = state;
  const [formData, setFormData] = useState({ startIp: "", endIp: "" });
  const [scannerSetting, setScannerSetting] =
    useState<NetScannerInitType>(netScannerInit);

  useEffect(() => {
    dispatch({ type: actionTypes.SET_MESSAGE, payload: "NET-SCANNER" });
    window.addEventListener("keydown", handleEscapeKeyPress);

    // setMessages(NetScannerMessages);

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
    if (
      formData.startIp === netscannerInputs.startIp &&
      formData.endIp === netscannerInputs.endIp
    ) {
      // When allowed action is netscannerip, then empty allowed action, mark completed, next chat
      if (CheckPointKey.NetscannerIP !== allowedAction) return;
      setAllowedAction(undefined);
      setCompletedAction(CheckPointKey.NetscannerIP);
      moveNextChat(false);
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setFormData((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });

    setScannerSetting((prev) => ({
      ...prev,
      error: null,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (scannerSetting.disable) return;

    if (
      formData.startIp === netscannerInputs.startIp &&
      formData.endIp === netscannerInputs.endIp
    ) {
      setScannerSetting((prev) => ({
        ...prev,
        disable: true,
        error: null,
      }));

      for (let i = 1; i <= 15; i++) {
        const postfix = i === 15 ? " is up" : "...";
        const output = `10.10.10.${i}${postfix}`;
        setTimeout(() => {
          setScannerSetting((prev) => ({
            ...prev,
            output,
          }));
        }, 330 * i);
      }

      setTimeout(() => {
        setAllowedAction(undefined);
        setCompletedAction(CheckPointKey.NetscannerScanButton);
        moveNextChat(false);
      }, 6000);
      // 

      dispatch({ type: actionTypes.SET_ANIMATION, payload: "NET-SCANNER" });
      playAnimation();
      return;
    }

    setScannerSetting(() => {
      return {
        disable: false,
        error: "Incorrect IP range",
        output: null,
      };
    });
  };
  const homePage = () => {
    dispatch({ type: actionTypes.DEFAULT_ANIMATION });
    dispatch({ type: actionTypes.DEFAULT_SCREEN });
    resetAnimation();
  };
  return (
    <div>
      <ScannerWrapper heading="Network Scanner">
        <form onSubmit={handleSubmit} className="z-40">
          <div className=" p-4 flex flex-col rounded ">
            <div className={`flex items-center gap-4`}>
              <p>IP range:</p>
              <input
                name="startIp"
                className={`${inpStyle} ${allowedAction === CheckPointKey.NetscannerIP ? "highlight" : ""}`}
                value={formData.startIp}
                onChange={handleChange}
                onKeyUp={handleKeyUp}
                disabled={scannerSetting.disable}
              />
              <p>to</p>
              <input
                name="endIp"
                className={`${inpStyle} ${allowedAction === CheckPointKey.NetscannerIP ? "highlight" : ""}`}
                value={formData.endIp}
                onChange={handleChange}
                onKeyUp={handleKeyUp}
                disabled={scannerSetting.disable}
              />
            </div>
            {scannerSetting.error && (
              <small className="ml-20 text-red">{scannerSetting.error}</small>
            )}

            <div className="flex gap-4 mt-4 items-center">
              <p>Output:&nbsp;&nbsp;</p>
              <div className=" bg-[#d4d8df] rounded text-thm flex items-center gap-6 p-2 w-full">
                <span className="text-[#223654] text-3xl">
                  <MdOutlineComputer />
                </span>
                <p>{scannerSetting.output && scannerSetting.output}</p>
              </div>
            </div>

            {/* the buttons */}
            <div className="flex items-center gap-6 justify-center mt-4">
              <button
                // className="bg-green text-black py-0 px-3 rounded-md"
                className=
            {`text-thm bg-green capitalize text-lg
            hover:bg-[#7c8390ab] focus:outline-none w-[30%] focus:ring-4 
            focus:ring-gray 
            font-medium rounded-full 
              px-5 pt-1 pb-1 text-center 
            mr-2 mb-2 hover:bg-green-500 hover:text-white duration-200 ${allowedAction === CheckPointKey.NetscannerScanButton ? "highlight" : ""}`}
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
                mr-2 mb-2  hover:bg-red-400 duration-200"
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

export default Netscanner;
const inpStyle =
  "px-2 py-1  bg-[#d4d8df] text-thm rounded outline-none border-none max-w-[10rem] overflow-hidden ";
