import Desktop from "../desktop";
import Terminal from "../terminal";
import NetworkMap from "../network-map";
import ChatWindow from "../core/chatWindow";
import { allAnimations, script } from "../../utils/utils";
import { ChatType } from "../../utils/type";
import { useState } from "react";
import { FaUserSecret } from "react-icons/fa";
import { useGameContext } from "../../context/context";

const Index = ({ isOpen = true }: { isOpen?: boolean }) => {
  const { state, fn } = useGameContext();

  const { allowedAction } = state;
  const { setAllowedAction } = fn;

  const [showMessage, setShowMessage] = useState<boolean>(isOpen);
  const [messages, setMessages] = useState<ChatType[]>(script);
  const [messageIndex, setMessageIndex] = useState<number>(0);
  const [chat, setChat] = useState<ChatType>(messages[0]);
  const [animation, setAnimation] = useState<null | string>(null);
  const [animationPlay, setAnimationPlay] = useState<boolean>(false);

  const handlerPlayAnimation = () => {
    // Check if animation is currently playing
    if (animationPlay) {
      // If it is playing, set it to null to stop it
      setAnimationPlay(false);
      // Use a short delay (e.g., 100ms) to ensure the animation stops before starting a new one
      setTimeout(() => {
        setAnimationPlay(true);
      }, 100);
    } else {
      // If no animation is playing, start the new animation
      setAnimationPlay(true);
    }
  };

  const handlerSetActiveAnimation = (ind: number | null) => {
    if (ind == null) return setAnimation(null);
    setAnimationPlay(false);
    setAnimation(allAnimations[ind].animation as unknown as string);
  };

  const handlerResetAnimation = () => {
    setAnimationPlay(false);
    setAnimation(null);
  };

  const toggleChatBox = () => {
    if (!chat?.message) {
      return;
    }
    setShowMessage(!showMessage);
  };

  const updateMessages = (msgs: ChatType[]) => {
    setMessages(msgs);
    setMessageIndex(0);

    setChat(msgs[0]);
  };

  /**
   * Check if allowedAction is empty
   * true:  move to next conversation
   * false: stay on this conversation / display a toast that you can't move forward
   */

  const handleNextClick = (verifyCheckpoint = true) => {
    if (!messages.length) return;

    const message = messages[messageIndex];

    const { checkPoint } = message;

    if (verifyCheckpoint) {
      // if allowedAction exists, do not move forward - stay on the conversation
      if (allowedAction !== undefined) return;
    }

    if (checkPoint !== undefined) {
      setAllowedAction(checkPoint);
    }

    const index = messageIndex + 1;
    if (index >= messages.length) return;

    setMessageIndex(index);
  };

  const chatIcon = () => {
    if (!showMessage || !chat?.message) {
      return (
        <div
          className="bg-green rounded-md shadow-md shadow-gray text-[#151c2b] p-2 absolute bottom-3 right-4 text-3xl cursor-pointer transition-all hover:scale-105"
          onClick={toggleChatBox}
        >
          <FaUserSecret size={27} />
        </div>
      );
    }

    return (
      <ChatWindow
        toggleChatBox={toggleChatBox}
        handleNextClick={handleNextClick}
        currentIndex={messageIndex}
        script={messages}
      />
    );
  };

  return (
    <div className="min-w-[600px]  w-[100%] m-auto overflow-hidden">
      <div className="grid grid-cols-[2fr,1fr]">
        <Desktop
          setAnimation={handlerSetActiveAnimation}
          playAnimation={handlerPlayAnimation}
          resetAnimation={handlerResetAnimation}
          moveNextChat={handleNextClick}
        />
        <NetworkMap animation={animation} animationPlay={animationPlay} />
      </div>
      <div className="relative min-h-[40vh] bg-green-500">
        <Terminal
          setMessages={updateMessages}
          setChat={setChat}
          setAnimation={handlerSetActiveAnimation}
          playAnimation={handlerPlayAnimation}
          resetAnimation={handlerResetAnimation}
          moveNextChat={handleNextClick}
        />
        {chatIcon()}
      </div>
    </div>
  );
};
export default Index;
