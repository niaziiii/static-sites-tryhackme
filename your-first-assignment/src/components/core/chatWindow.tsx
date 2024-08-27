import { AiOutlineClose, AiOutlineUser } from "react-icons/ai";
import { FaUserSecret } from "react-icons/fa";
import { ChatType } from "../../utils/type";
import { useMemo } from "react";
interface ChatWindowProps {
  handleNextClick: () => void;
  toggleChatBox: () => void;
  script: ChatType[];
  currentIndex: number;
}

const Index = ({
  script,
  handleNextClick,
  toggleChatBox,
  currentIndex,
}: ChatWindowProps) => {
  const nextMove = () => {
    handleNextClick();
  };

  const { displayNext, chat } = useMemo(() => {
    const chat = script[currentIndex];
    let displayNext = currentIndex < script.length - 1;

    const previousIndex = currentIndex - 1;
    if (previousIndex >= 0) {
      const prevMessage = script[previousIndex];
      displayNext = displayNext && prevMessage.checkPoint === undefined;
    }

    return { displayNext, chat };
  }, [script, currentIndex]);

  return (
    <>
      <div className="absolute bottom-10 right-10 bg-[#151c2b] text-white max-w-[350px] z-30 p-4 rounded-md min-w-[15rem]">
        <div className=" flex flex-row w-full font-bold justify-between cursor-pointer mb-1">
          <div className="font-bold">
            {chat.bot ? (
              <span className="font-bold text-[#DEAD0A]">Bot</span>
            ) : (
              <span>You</span>
            )}
          </div>
          <div onClick={toggleChatBox}>
            <AiOutlineClose />
          </div>
        </div>

        {!!chat && (
          <div
            key={currentIndex}
            className="flex flex-col items-center justify-center"
          >
            <div dangerouslySetInnerHTML={{ __html: chat.message }}></div>
            {displayNext && (
              <button
                className="
              flex justify-center mt-3
              text-white bg-gray capitalize text-lg
              hover:bg-[#7c8390ab] focus:outline-none w-[50%] focus:ring-4 
              focus:ring-gray 
              font-medium rounded-full 
              text-center 
              mr-2 mb-2 dark:bg-gray-600 dark:hover:bg-gray
              dark:focus:ring-gray duration-200"
                onClick={nextMove}
              >
                Next
              </button>
            )}
          </div>
        )}
      </div>
      <div className="absolute bottom-0 text-[#151c2b] right-2 bg-green max-w-[350px] z-30 flex justify-center items-center rounded-full w-[3rem] h-[3rem] border border-white">
        {chat.bot ? <FaUserSecret size={27} /> : <AiOutlineUser size={27} />}
      </div>
    </>
  );
};

export default Index;
