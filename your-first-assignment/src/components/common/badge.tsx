const Badge = ({
  title,
  childeren,
}: {
  title?: string;
  childeren?: JSX.Element;
}) => {
  return (
    <div
      className={`bg-[#3e4552] text-white text-xs font-medium  shadow-lg ${title ? `px-4 py-2` : ""
        }`}
    >
      {title ? title : childeren}
    </div>
  );
};

export default Badge;
