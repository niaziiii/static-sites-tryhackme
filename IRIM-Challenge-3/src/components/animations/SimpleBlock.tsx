import { BlockerType } from "../../utils/types/type";

const SimpleBlock = ({ blocker }: { blocker: BlockerType }) => {


  return (
    <div className="w-full !overflow-hidden z-10 absolute bottom-0 left-0 p-20 min-h-[60vh]">
      <div
        className={`absolute z-20`}
        style={{
          left: `${blocker.position}px`,
          bottom: `${blocker.height == "H1"
            ? "270px"
            : blocker.height == "H2"
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
          {/* {title ? (
            title
          ) : blocker.isGift ? (
            <p className="text-3xl">
              <AiOutlinePlus />
            </p>
          ) : (
            <p className="text-3xl">
              <AiOutlineMinus />
            </p>
          )} */}
          {blocker.title}
        </p>
      </div>
    </div>
  );
};

export default SimpleBlock;
