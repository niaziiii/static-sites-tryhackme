import { Tooltip } from "primereact/tooltip";
import { HeaderT } from "../utils/types";
import { BiStopwatch } from "react-icons/bi";

const Header = ({ correct, seconds }: HeaderT) => {
  return (
    <div className="flex items-center justify-between py-4 font-semibold">
      <Tooltip target={`.strikes`} position="left">
        <p className="text-white rounded-lg ">
          {`${seconds} of 30 seconds remaining`}
        </p>
      </Tooltip>
      <h3 className="flex items-center text-xl text-yellow strikes">
        <BiStopwatch className="text-3xl" />{" "}
        <span>00:{seconds?.toString().padStart(2, "0")} </span>
      </h3>
      <h1 className="text-2xl font-bold">Security Principles 2</h1>
      <Tooltip target={`.correct`} position="left">
        <p className="text-white rounded-lg ">
          {`${correct} of 4 correct answers`}
        </p>
      </Tooltip>
      <h3 className=" text-green correct">
        Correct: <span>{correct}/4</span>
      </h3>
    </div>
  );
};

export default Header;
