import { useState, useEffect } from "react";
import { BiCopy } from "react-icons/bi";

const CopyingFlag = ({ message }: { message: string }) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipText, setTooltipText] = useState("Copy");
  const [textToCopy, setTextToCopy] = useState("");

  const copyHandler = () => {
    setTooltipText("Copied!");
    void navigator.clipboard.writeText(textToCopy);

    setTimeout(() => {
      setTooltipText("Copy");
    }, 3000);
  };

  useEffect(() => {
    setTextToCopy(message);
  }, [message]);

  return (
    <div className="flex items-center gap-4 justify-center">
      <div>{textToCopy}</div>
      <div className="copy-container relative">
        <button
          id="copy-btn"
          className="cursor-pointer border-none outline-none"
          onClick={copyHandler}
          onMouseEnter={() => setTooltipVisible(true)}
          onMouseLeave={() => setTooltipVisible(false)}
        >
          <BiCopy />
        </button>
        {tooltipVisible && (
          <div
            id="tooltip"
            className="copy-tooltip absolute -top-[80%] -left-[150%]"
          >
            {tooltipText}
          </div>
        )}
      </div>
    </div>
  );
};

export default CopyingFlag;
