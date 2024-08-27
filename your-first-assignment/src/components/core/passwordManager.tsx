import { useState, useEffect } from "react";
import ScannerWrapper from "../common/scannerwrapper";
import SearchBar from "../common/searchbar";
import { useGameContext, actionTypes } from "../../context/context";
import bruteForceIcon from "../../assets/Icons/BruteForceAttack.svg";
import { CheckPointKey } from "../../utils/utils";
import { Tooltip } from "primereact/tooltip";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css";

interface PasswordManagerProps {
  playAnimation: () => void;
  resetAnimation: () => void;
  moveNextChat: (verifyCheckpoint: boolean) => void;
}
const PasswordManager = ({
  // setMessages,
  // setChat,
  moveNextChat,
  playAnimation,
  resetAnimation,
}: PasswordManagerProps) => {
  const [pin, setPin] = useState({ pin1: "", pin2: "", pin3: "" });
  const [newWeb, setNewWeb] = useState(false);

  const { state, dispatch, fn } = useGameContext();
  const { setAllowedAction, setCompletedAction } = fn;
  const { allowedAction } = state;

  const handleAttack = () => {
    if (CheckPointKey.PasswordManagerButton !== allowedAction) return;
    const pins = [
      { pin1: "2", pin2: "3", pin3: "0" },
      { pin1: "3", pin2: "4", pin3: "3" },
      { pin1: "0", pin2: "3", pin3: "12" },
      { pin1: "4", pin2: "5", pin3: "6" },
    ];
    for (let i = 0; i < pins.length; i++) {
      setTimeout(() => {
        setPin(pins[i]);
      }, (i + 1) * 800);
    }

    setAllowedAction(undefined);
    setCompletedAction(CheckPointKey.PasswordManagerButton);

    setTimeout(() => {
      moveNextChat(false);
    }, 3000);

    // start network map animation
    dispatch({ type: actionTypes.SET_ANIMATION, payload: "PASSWORD-MANAGER" });
    playAnimation();
    return;
  };

  useEffect(() => {
    if (pin.pin1 === "4" && pin.pin2 === "5" && pin.pin3 === "6") {
      setTimeout(() => {
        setNewWeb(true);
      }, 1500);
    }
  }, [pin.pin1, pin.pin2, pin.pin3]);

  const homePage = () => {
    dispatch({ type: actionTypes.DEFAULT_SCREEN });
    dispatch({ type: actionTypes.DEFAULT_ANIMATION });
    resetAnimation();
  };
  const [bruteBox, setBruteBox] = useState(false);
  const handleEnter = (inputValue: unknown) => {
    if (
      inputValue == "http:10.10.10.15" ||
      inputValue == "http://10.10.10.15"
    ) {
      if (CheckPointKey.PasswordManagerUrl !== allowedAction) return;
      setBruteBox(true);
      setAllowedAction(undefined);
      setCompletedAction(CheckPointKey.PasswordManagerUrl);
      moveNextChat(false);
    }
    return;
  };
  return (
    <div>
      <ScannerWrapper heading={<SearchBar onEnter={handleEnter} />}>
        <>
          {newWeb ? (
            <div className="p-4 pb-6 flex flex-row rounded text-start">
              <div>
                <h1>Password Vault</h1>
                <ul>
                  <li>- SSH User: tom</li>
                  <li>- SSH Pass: thm2023</li>
                </ul>
              </div>
              <div>
                <span className="flex gap-2 ml-20">
                  <p className="w-[3rem] rounded py-1 bg-gray"></p>
                  <p className="w-[3rem] rounded py-1 bg-gray"></p>
                </span>
                <span className="flex gap-2 mt-7 ml-24">
                  <p className="w-[3rem] rounded py-1 bg-gray"></p>
                  <p className="w-[3rem] rounded py-1 bg-gray"></p>
                </span>
                <span className="flex gap-2 mt-7 ml-28">
                  <p className="w-[3rem] rounded py-1 bg-gray"></p>
                  <p className="w-[3rem] rounded py-1 bg-gray"></p>
                </span>
              </div>
            </div>
          ) : //

          bruteBox ? (
            <div className="relative">
              <div className="p-4 rounded text-center">
                <h3 className=" font-bold">Password Manager</h3>
                <h5>Enter your PIN code to unblock:</h5>
                <div className="flex gap-4 justify-center w-full mt-2">
                  <input
                    type="text"
                    disabled
                    value={pin.pin1}
                    className={`w-12 ${inpStyle}`}
                  />
                  <input
                    type="text"
                    value={pin.pin2}
                    disabled
                    className={`w-12 ${inpStyle}`}
                  />
                  <input
                    type="text"
                    value={pin.pin3}
                    disabled
                    className={`w-12 ${inpStyle}`}
                  />
                </div>
                <button
                  // className="bg-red text-white py-0 px-3 rounded-md "
                  className="
                text-white bg-red capitalize text-lg mt-4
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
              <div
                className={`p-3 rounded text-center absolute top-0 right-0 `}
              >
                <div className="flex flex-row items-center justify-end w-auto">
                  <Tooltip target=".brute-force" position="right">
                    <div className="custom-tooltip ">
                      <p className="tooltip-content">Brute Force</p>
                    </div>
                  </Tooltip>
                  <img
                    height={40}
                    width={40}
                    src={bruteForceIcon}
                    className="brute-force text-3xl cursor-pointer"
                    alt={bruteForceIcon}
                    onClick={handleAttack}
                    style={{
                      boxShadow: "0px 0px 20px 0px #3BC81E",
                      borderRadius: "6px",
                      outline: "1px solid #3BC81E",
                    }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 pb-6 rounded text-center">
              <div className="grid grid-cols-2 gap-5">
                {/* <!-- First Step --> */}
                <div className="col-span-1">
                  <span className="flex gap-2">
                    <p className="w-[3rem] rounded py-1 bg-gray"></p>
                    <p className="w-[3rem] rounded py-1 bg-gray"></p>
                  </span>
                </div>

                {/* <!-- Second Step --> */}
                <div>
                  <span className="flex gap-2 ml-4">
                    <p className="w-[3rem] rounded py-1 bg-gray"></p>
                    <p className="w-[3rem] rounded py-1 bg-gray"></p>
                  </span>
                </div>

                {/* <!-- Third Step --> */}
                <div>
                  <span className="flex gap-2 ml-8">
                    <p className="w-[3rem] rounded py-1 bg-gray"></p>
                    <p className="w-[3rem] rounded py-1 bg-gray"></p>
                  </span>
                </div>

                {/* <!-- Fourth Step --> */}
                <div>
                  <span className="flex gap-2 ml-12">
                    <p className="w-[3rem] rounded py-1 bg-gray"></p>
                    <p className="w-[3rem] rounded py-1 bg-gray"></p>
                  </span>
                </div>
                <div>
                  <span className="flex gap-2 ml-16">
                    <p className="w-[3rem] rounded py-1 bg-gray"></p>
                    <p className="w-[3rem] rounded py-1 bg-gray"></p>
                  </span>
                </div>
                <div>
                  <span className="flex gap-2 ml-20">
                    <p className="w-[3rem] rounded py-1 bg-gray"></p>
                    <p className="w-[3rem] rounded py-1 bg-gray"></p>
                  </span>
                </div>
              </div>
            </div>
          )}
        </>
      </ScannerWrapper>
    </div>
  );
};
export default PasswordManager;

const inpStyle = "bg-gray rounded outline-none border-none text-center";
