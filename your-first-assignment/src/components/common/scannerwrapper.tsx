import { useGameContext, actionTypes } from "../../context/context";
import tryHackLogo from "../../assets/tryhackme_logo_white.svg"

const ScannerWrapper = ({
  children,
  heading,
  resetAnimation,
}: {
  children: JSX.Element;
  heading?: string | JSX.Element;
  resetAnimation?: () => void;
}) => {
  const { dispatch } = useGameContext();

  const homePage = () => {
    dispatch({ type: actionTypes.DEFAULT_SCREEN });
    dispatch({ type: actionTypes.DEFAULT_ANIMATION });
    resetAnimation?.();
  };
  const minimizePage = () => {
    dispatch({ type: actionTypes.DEFAULT_SCREEN });
  };

  return (
    <div className="rounded bg-[#223654]">
      {/* Top Header */}
      <div className="flex items-center justify-between py-2 px-3">
        <div className="flex items-center space-x-2 ml-3">
          <div
            className="w-4 cursor-pointer h-4 bg-red-600 rounded-full"
            onClick={homePage}
          ></div>
          <div
            onClick={minimizePage}
            className="w-4 h-4 bg-[#ecbb0a] cursor-pointer rounded-full"
          ></div>
          <div className="w-4 h-4 bg-[#3bc81e] rounded-full"></div>
        </div>
        <div>
          <img
            width={"36px"}
            src={tryHackLogo}
          />
        </div>
      </div>
      {/* Top header end */}
      <div className="flex items-center justify-center  bg-[#727c92] py-2 px-3">
        <div>
          <b className="text-lg">{heading ? heading : "Heading"}</b>
        </div>
        <div>
          
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
};
export default ScannerWrapper;
