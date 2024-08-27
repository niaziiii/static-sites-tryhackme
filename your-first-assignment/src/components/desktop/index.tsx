import Netscanner from "../core/netscanner";
import PortScanner from "../core/portscanner";
import PasswordManager from "../core/passwordManager";
import DesktopWrapper from "../common/desktopwrapper";
import DesktopLists from "../core/desktopLists";
import { useGameContext } from "../../context/context";
import { useEffect } from "react";

interface DesktopProps {
  moveNextChat: (verifyCheckpoint: boolean) => void;
  setAnimation: (index: number | null) => void;
  playAnimation: () => void;
  resetAnimation: () => void;
}
const Index = ({
  moveNextChat,
  setAnimation,
  playAnimation,
  resetAnimation,
}: DesktopProps) => {
  const { state } = useGameContext();

  useEffect(() => {
    if (state.screen == "NET-SCANNER") {
      setAnimation(0);
      return;
    }
    if (state.screen == "PORT-SCANNER") {
      setAnimation(1);
      return;
    }
    if (state.screen == "PASSWORD-MANAGER") {
      setAnimation(2);
      return;
    }
    setAnimation(null);
  }, [state.screen]);

  const render = () => {
    if (state.screen == "NET-SCANNER") {
      return (
        <Netscanner
          moveNextChat={moveNextChat}
          // setMessages={setMessages}
          playAnimation={playAnimation}
          resetAnimation={resetAnimation}
        />
      );
    }
    if (state.screen == "PORT-SCANNER") {
      return (
        <PortScanner
        moveNextChat={moveNextChat}
          // setMessages={setMessages}
          playAnimation={playAnimation}
          resetAnimation={resetAnimation}
        />
      );
    }
    if (state.screen == "PASSWORD-MANAGER") {
      return (
        <PasswordManager
          // setMessages={setMessages}
          // setChat={setChat}
          moveNextChat={moveNextChat}
          playAnimation={playAnimation}
          resetAnimation={resetAnimation}
        />
      );
    }

    return null;
  };

  return (
    <DesktopWrapper isMain={true}>
      <>
        <DesktopLists moveNextChat={moveNextChat} />
        {state.screen && (
          <div className="absolute top-[0%] z-10 left-[0%] w-full h-full flex items-center justify-center">
            <div className=" min-w-[425px]">{render()}</div>
          </div>
        )}
      </>
    </DesktopWrapper>
  );
};

export default Index;
