const Header = ({ isVisible }: { isVisible: boolean }) => {
  const headerStyles = {
    opacity: isVisible ? 1 : 0,
    maxHeight: isVisible ? "auto" : "0px !important",
    overflow: "hidden",
    padding: isVisible ? "2rem 1rem !important" : "0",
    transition: "opacity 0.7s, max-height 0.7s, padding 0.7s",
  };

  return (
    <div
      className="flex flex-col gap-3 items-center justify-between bg-thm py-7 px-8 w-full"
      style={headerStyles}
    >
      {isVisible && (
        <h1 className="text-3xl text-center">
          Introduction to Incident Response and Management
        </h1>
      )}
    </div>
  );
};

export default Header;
