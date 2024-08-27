import { OptionBlockType, heightLevels } from "../../constants/data";

interface OptionBlockProps {
  option: OptionBlockType;
  left: number;
}
const OptionBlock = ({ option, left = 580 }: OptionBlockProps) => {
  const containerCls =
    left === 0 ? "transition-all ease-linear duration-[3000ms]" : "";

  return (
    <div className="w-full !overflow-hidden z-10 absolute bottom-0 left-0 p-20 min-h-[60vh]">
      <div
        className={`absolute z-20 ${containerCls}`}
        style={{
          left: `${left}px`,
          bottom: `${
            option.height == heightLevels.H1
              ? "270px"
              : option.height == heightLevels.H2
              ? "180px"
              : "30px"
          } `,
        }}
      >
        <p
          style={{
            boxShadow: "0 0 4px 2px #719CF9",
            background: "#212c42",
            border: "4px solid #40527A",
            padding: "10px",
            outline: "2px solid white",
            outlineOffset: "2px",
          }}
          className={`
             font-bold w-[100px] max-w-[150px] min-w-[100px]
             min-h-[50px] p-2 rounded-lg flex items-center justify-center
            text-center leading-4 ring-offset-2 ring-8
                        `}
        >
          {option.title}
        </p>
      </div>
    </div>
  );
};

export default OptionBlock;
