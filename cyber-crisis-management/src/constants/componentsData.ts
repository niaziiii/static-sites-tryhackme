import { appAsset } from ".";
import { TriageOptionType } from "./../utils/types/type";

export const POWER_UPS = {
  CSIRT: { key: "CSIRT", value: "CSIRT" },
  ACTION: { key: "ACTION", value: "Action PowerUp" },
  COMMUNICATION: { key: "COMMUNICATION", value: "Communication PowerUp" },
};

export const triagePhaseOptionsLists: TriageOptionType[] = [
  {
    key: POWER_UPS.CSIRT.key,
    title: "CSIRT PowerUp",
    description:
      "Team is placed into high alert! Next phase you can ask double the amount of questions!",
    type: "disabled",
    icon: appAsset.triage.iconsMain[0],
    greyIcon: appAsset.triage.iconGrey[0],
  },
  {
    key: POWER_UPS.ACTION.key,
    title: "Action PowerUp",
    description:
      "You deploy your first responders! Next phase you can take double the amount of actions!",
    type: "disabled",
    icon: appAsset.triage.iconsMain[1],
    greyIcon: appAsset.triage.iconGrey[1],
    isPowerUp: true,
  },
  {
    key: POWER_UPS.COMMUNICATION.key,
    title: "Communication PowerUp",
    description:
      "You deploy your PR team! You will receive assistance into making the best statements possible to contain panic!",
    type: "disabled",
    icon: appAsset.triage.iconsMain[2],
    greyIcon: appAsset.triage.iconGrey[2],
  },
];
