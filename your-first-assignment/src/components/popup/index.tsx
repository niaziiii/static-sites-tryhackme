import { Dialog } from "primereact/dialog";
import { PopupType } from "../../utils/type";
import ThmButton from "../button/button";

export default function Popup(props: PopupType) {
  const { heading, message, visible, close, children, isRefresh } = props;

  const closePopup = () => {
    if (isRefresh) {
      window.location.reload();
    }
    setTimeout(() => {
      close();
    }, 1000);
  };

  return (
    <div className="card flex justify-content-center">
      <Dialog
        header={heading}
        visible={visible}
        style={{ width: "35rem" }}
        onHide={closePopup}
        draggable={false}
        pt={{
          closeButton: {
            className:
              "shadow-none focus:!shadow-none hover:!bg-transparent !text-white hover:!text-[#7d7575]",
          },
          header: {
            className:
              "!bg-thm-900 !py-4 !font-bold px-4 !text-white !flex !justify-between",
          },
          content: {
            className: "!bg-thm-900 !text-white border-t !pb-4 !px-4",
          },
          root: {
            className:
              "fixed top-[50%] left-[50%] !overflow-hidden !rounded-md",
            style: { transform: "translate(-50%, -50%)" },
          },
        }}
      >
        <div className="pt-5">
          {message && <p className="m-0">{message}</p>}
          {!!children && children ? children : ""}
        </div>
        <div className="mt-8">
          <ThmButton onClick={closePopup}>Let's proceed!</ThmButton>
        </div>
      </Dialog>
    </div>
  );
}
