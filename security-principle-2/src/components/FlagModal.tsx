import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import { Tooltip } from "primereact/tooltip";

import { CgCopy } from "react-icons/cg";
import { FlagModalT } from "../utils/types";
import { FINAL_FLAG } from "../utils/consts";

const FlagModal = ({ restartGame, visible, updateVisibility }: FlagModalT) => {
  const [tooltipContent, setTooltipContent] = useState("Click to copy.");

  const handleCopyClick = () => {
    navigator.clipboard.writeText(`${FINAL_FLAG}`);
    setTooltipContent("Copied.");
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setTooltipContent("Click to copy.");
    }, 3000);

    return () => clearInterval(interval);
  }, [tooltipContent]);
  const content = (
    <>
      <div className="flex flex-col items-center justify-between mt-0 text-sm font-medium">
        <p className="w-full text-base text-left">
          You have won, here is your flag.
        </p>

        <div className="w-full mx-auto overflow-x-auto overflow-y-auto rounded-md custom-scroll text-thm max-h-96">
          <div className="flex items-center justify-between p-4 my-4 font-bold rounded-lg bg-green text-thm">
            {FINAL_FLAG}
            <Tooltip target={`.copy-icon`} position="top">
              <p className="p-2 text-white rounded-lg">{tooltipContent}</p>
            </Tooltip>
            <CgCopy
              onClick={handleCopyClick}
              className="pi pi-copy copy-icon"
              style={{ fontSize: "1rem", cursor: "pointer" }}
            />
          </div>
        </div>
      </div>
    </>
  );

  return (
    <Dialog
      header="Congratulations"
      visible={visible}
      style={{ width: "620px" }}
      draggable={false}
      focusOnShow={false}
      onHide={() => {
        updateVisibility();
        restartGame();
      }}
      closable={true}
    >
      <div className="m-0 text-sm leading-6 text-thm-600">{content}</div>
    </Dialog>
  );
};

export default FlagModal;
