import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InstructionModalT } from "../utils/types";

const InstructionModal = ({ visible, updateVisibility }: InstructionModalT) => {
  const content = (
    <div className="flex flex-col items-start justify-between text-base font-medium">
      In security principle, choose options for safeguarding information. Ensure
      confidentiality, integrity, and system availability.
    </div>
  );

  const footerContent = (
    <div>
      <Button
        className="p-3 text-base bg-thm-900 text-thm-50 ring-0 hover:scale-105 hover:bg-thm-600"
        label="Proceed"
        onClick={updateVisibility}
      />
    </div>
  );
  return (
    <Dialog
      header="Instructions"
      visible={visible}
      draggable={false}
      style={{ width: "620px" }}
      onHide={updateVisibility}
      closable={false}
      footer={footerContent}
    >
      <div className="m-0 leading-6 text-thm-600">{content}</div>
    </Dialog>
  );
};

export default InstructionModal;
