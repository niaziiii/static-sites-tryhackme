import { useGameContext } from "../../context/context";
import { NarrativeHeader } from "../NarrativeHeader/NarrativeHeader";

const Header = ({ isVisible }: { isVisible: boolean }) => {
  const { state } = useGameContext();

  const headerStyles = {
    opacity: isVisible ? 1 : 0,
    maxHeight: isVisible ? "15vh" : "0px !important",
    overflow: "hidden",
    padding: isVisible ? "2rem 1rem !important" : "0",
    transition: "opacity 0.7s, max-height 0.7s, padding 0.7s",
  };

  return (
    <div
      className="flex flex-col gap-3 items-center justify-between bg-thm py-7 px-8 w-full"
      style={headerStyles}
    >
      {isVisible && <h1 className="text-3xl">Cyber Crisis Management</h1>}
      {state.isGameStarted && <NarrativeHeader phase={0} />}
    </div>
  );
};

export default Header;
