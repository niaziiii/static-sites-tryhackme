import { MenuItem } from "primereact/menuitem";
import { appAsset } from "../../constants";
import { useGameContext } from "../../context/context";
import { ALL_NARRATIVES } from "../../constants/data";

export default function Stepper({ activePhase = 0 }: { activePhase: number }) {
  const { state } = useGameContext();
  const items: MenuItem[] = [
    {
      label: "Question Phase",
      icon: appAsset.question.main,
    },
    {
      label: "Triage Phase",
      icon: appAsset.triage.main,
    },
    {
      label: "Action Phase",
      icon: appAsset.action.main,
    },
    {
      label: "Communication Phase",
      icon: appAsset.communication.main,
    },
  ];

  const displayStepper = (index: number) => {
    if (index === 1 && state.activeNarativeIndex === ALL_NARRATIVES.length - 1)
      return false;
    return true;
  };

  return (
    <ol className="flex items-center w-full mb-12">
      {items.map((item, index) => {
        if (!displayStepper(index)) return null;

        return (
          <li
            key={index}
            className={`flex w-full items-center ${
              index < items.length - 1
                ? `after:content-[''] after:w-full after:h-1 after:border-b transition-all duration-1000 after:border-${
                    activePhase > index ? "[#151c2b]" : "gray"
                  } after:border-4 after:inline-block dark:after:border-blue-800`
                : "!w-auto"
            }`}
          >
            <div className="flex flex-col relative">
              <span
                className={` flex items-center justify-center w-14 h-14 text-2xl bg-${
                  index < activePhase ? "thm !text-green" : "gray"
                } rounded-full dark:bg-${
                  index < activePhase ? "white" : "gray"
                } shrink-0`}
              >
                <img
                  src={item?.icon as string}
                  alt="stepper-icon"
                  className="w-10 h-10"
                />
              </span>
              <p
                className={`absolute bottom-[-80%] text-center ${
                  activePhase > index ? "text-green" : "text-white"
                } text-sm w-auto  ${
                  index < items.length - 1
                    ? "left-[-0%]"
                    : "left-[-100%] md:left-[-70%] lg:left-[-50%]"
                }`}
              >
                {item.label}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
