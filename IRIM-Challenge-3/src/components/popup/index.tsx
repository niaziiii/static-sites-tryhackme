import { Dialog } from "primereact/dialog";
import { PopupType } from "../../utils/types/type";

export default function Popup(props: PopupType) {
  const { heading, message, visible, close, children, isRefresh } = props;

  const closePopup = () => {
    if (isRefresh) {
      window.location.reload();
    }
    close();
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
            className: "!bg-thm-900 !py-4 px-6 !text-white",
          },
          content: {
            className: "!bg-thm-900 !pt-4 !text-white border-t !pb-4",
          },
        }}
      >
        <div className="pt-0">
          {message && <p className="m-0">{message}</p>}
          {!!children && children ? children : ""}
        </div>
      </Dialog>
    </div>
  );
}
