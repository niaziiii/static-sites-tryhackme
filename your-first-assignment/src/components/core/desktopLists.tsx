import { CheckPointKey, desktopProcess } from "../../utils/utils";
import { ScreenType } from "../../utils/type";
import { useGameContext, actionTypes } from "../../context/context";

interface DesktopListsProp {
  moveNextChat: (verifyCheckpoint: boolean) => void;
}
const DesktopLists = ({ moveNextChat }: DesktopListsProp) => {
  const { state, dispatch, fn } = useGameContext();
  const { allowedAction } = state;
  const { setAllowedAction, setCompletedAction } = fn;

  /**
   * Check if action is allowed
   * true: empty the allowedAction, increment the chat, set the completedAction
   */
  const changeScreen = (
    arg1: ScreenType,
    checkPoint: CheckPointKey | undefined
  ) => {
    if (checkPoint !== allowedAction) return;

    setAllowedAction(undefined);
    setCompletedAction(checkPoint);
    moveNextChat(false);

    dispatch({
      type: actionTypes.SET_SCREEN,
      payload: arg1,
    });
  };

  return (
    <div className={` ${state.phase == 3 ? "w-full  blur-sm" : "w-full"}`}>
      <div className="p-2 py-5 ml-2 gap-4 w-fit relative flex flex-col text-thm">
        {desktopProcess?.map((pros) => (
          <div key={pros.title}>
            <div
              className={`flex flex-col items-center gap-2 w-auto cursor-pointer  py-2 px-2 rounded-xl hover:shadow shadow-gray ${
                allowedAction === pros.checkPoint ? "highlight" : ""
              }`}
              onClick={() =>
                state.phase !== 3 && changeScreen(pros.screen, pros.checkPoint)
              }
            >
              <img
                height={50}
                width={50}
                src={pros.icon}
                className="text-3xl"
                alt={pros.title}
              />
              <h2 className="text-sm tracking-tight whitespace-nowrap font-bold">
                {pros.title}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesktopLists;
