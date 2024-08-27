import { useState, useEffect } from "react";
import { TriageOptionType } from "../../utils/types/type";
import { POWER_UPS } from "../../constants/componentsData";

const ActionBadge = ({ selected }: { selected: TriageOptionType }) => {
  const { key, title, icon } = selected;
  const [showMessage, setShowMessage] = useState(false);
  const [width, setWidth] = useState(100);

  useEffect(() => {
    if (key === POWER_UPS.COMMUNICATION.key) {
      setWidth(220);
    } else if (key === POWER_UPS.ACTION.key) {
      setWidth(180);
    } else {
      setWidth(150);
    }
  }, [key]);

  return (
    <div
      style={{
        position: "absolute",
        left: "5%",
        top: "50px",
        cursor: "pointer",
        zIndex: "1000",
      }}
      onMouseEnter={() => setShowMessage(true)}
      onMouseLeave={() => setShowMessage(false)}
    >
      <span
        className="flex items-center bg-gray dark:bg-gray shrink-0"
        style={{
          background: "#1C2538",
          borderRadius: "6px",
          borderTopRightRadius: "30px",
          borderBottomRightRadius: "30px",
          padding: "6px 10px 6px 6px",
          overflow: "hidden",
          whiteSpace: "nowrap",
          transition: "0.3s ease-in-out",
          width: showMessage ? `${width}px` : "50px",
          boxShadow: "rgba(120, 255, 1, 0.3) 0px 4px 27px 0px",
        }}
      >
        <img
          src={icon}
          alt="stepper-icon"
          className=""
          style={{
            width: "34px",
            marginRight: "10px",
          }}
        />
        <p
          style={{
            fontWeight: "bold",
            fontSize: "14px",
          }}
        >
          {title}
        </p>
      </span>
    </div>
  );
};

export default ActionBadge;
