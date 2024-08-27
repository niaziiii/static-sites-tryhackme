import Badge from "./badge";
import windowDesktop from "../../assets/window.jpg";
import WindowMenuBar from "../core/WindowMenuBar";

const DesktopWrapper = ({
  children,
  isMain = false,
}: {
  children: JSX.Element;
  isMain?: boolean;
}) => {
  return (
    <div
      className={`border border-gray min-h-[60vh] relative flex flex-col`}
      style={{
        backgroundImage: `url(${windowDesktop})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Badge title="Desktop" />
      <WindowMenuBar />
      {
        <div
          className={`${
            isMain ? "flex flex-col" : "flex items-center justify-center m-auto"
          }`}
        >
          {children}
        </div>
      }
    </div>
  );
};

export default DesktopWrapper;
