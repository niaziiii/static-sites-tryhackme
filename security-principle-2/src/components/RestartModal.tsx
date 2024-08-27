import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { RestartT } from "../utils/types";

const RestartModal = ({ restartGame, updateVisibility, visible }: RestartT) => {
  const content = <>You have failed, restart the game.</>;
  const footerContent = (
    <div>
      <Button
        className="p-3 text-base bg-thm-900 text-thm-50 ring-0 hover:scale-105 hover:bg-thm-600"
        label="Restart"
        onClick={() => {
          restartGame();
          updateVisibility();
        }}
      />
    </div>
  );

  return (
    <Dialog
      header="Oops"
      visible={visible}
      style={{ width: "620px" }}
      onHide={updateVisibility}
      draggable={false}
      footer={footerContent}
      closable={false}
    >
      <div className="m-0 text-base leading-6 text-thm-600">{content}</div>
    </Dialog>
  );
};

export default RestartModal;
