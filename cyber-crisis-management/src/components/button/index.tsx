type ThmButtonType = {
  children?: JSX.Element | string;
  onClick: () => void;
};

const ThmButton = ({ onClick, children }: ThmButtonType) => {
  return (
    <div className="w-full flex items-center justify-centern">
      <button
        type="button"
        onClick={onClick}
        className="
        text-white bg-gray capitalize text-lg
         hover:bg-[#7c8390ab] hover:scale-105 focus:outline-none w-full focus:ring-4 
         focus:ring-gray 
         font-medium rounded-full 
          px-5 py-1 md:py-2 text-center 
         mr-2 mb-2 dark:bg-gray-600 dark:hover:bg-gray
         dark:focus:ring-gray duration-200"
      >
        {children}
      </button>
    </div>
  );
};

export default ThmButton;
