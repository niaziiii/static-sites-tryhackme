import { useEffect, useState } from "react";

const StateCounter = ({ title, damage }: { title: string; damage: number }) => {
  const [showMessage, setShowMessage] = useState(false);
  const [width, setWidth] = useState(155);

  useEffect(() => {
    if (title == "Estate Damage") {
      setWidth(160);
    } else {
      setWidth(200);
    }
  }, [title]);

  return (
    <div
      style={{
        cursor: "pointer",
        zIndex: "1000",
      }}
      onMouseEnter={() => setShowMessage(true)}
      onMouseLeave={() => setShowMessage(false)}
    >
      <span
        className="flex gap-4 items-center bg-gray dark:bg-gray shrink-0"
        style={{
          background: "#1C2538",
          borderRadius: "6px",
          borderTopRightRadius: "30px",
          borderBottomRightRadius: "30px",
          padding: "6px 10px 6px 6px",
          overflow: "hidden",
          whiteSpace: "nowrap",
          transition: "0.3s ease-in-out",
          width: showMessage ? `${width}px` : `42px`,
          boxShadow: "rgba(120, 255, 1, 0.3) 0px 4px 27px 0px",
        }}
      >
        <p>{damage}%</p>
        <b
          style={{
            fontWeight: "800",
            fontSize: "14px",
          }}
        >
          {title}
        </b>
      </span>
    </div>
  );
};

export default StateCounter;
