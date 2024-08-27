import playerWalking from "./asset/playerWalking.json";
import playerJump from "./asset/playerJump.json";
import playerSpawning from "./asset/playerSpawning.json";
import playerJumpRelease from "./asset/playerJumpRelease.json";
import playerBending from "./asset/playerBending.json";
import playerBendingRelease from "./asset/playerBendingRelease.json";

import { BlockerType } from "../utils/types/type";
import { checkEvenOrOdd, getRandomBlockerStage } from "./callbacks";

export const animations = {
  playerSpawning,
  walking: playerWalking,
  jump: playerJump,
  jumpRelease: playerJumpRelease,
  bending: playerBending,
  bendingRelease: playerBendingRelease,
};

export const playerStates = {
  WALKING: "WALKING",
  JUMPING: "JUMPING",
  BENDING: "BENDING",
  SPAWING: "SPAWING",
};

export const heightLevels = {
  H1: "H1",
  H2: "H2",
  H3: "H3",
};

const heightLevelsKeys = Object.keys(heightLevels);
type HeightLevelType = keyof typeof heightLevels;
export type OptionBlockType = {
  id: number;
  title: string;
  isGift: boolean;
  height: HeightLevelType;
};

const randomHeightLevel = () => {
  const index = ((heightLevelsKeys.length - 2) * Math.random()) << 0;
  const key: HeightLevelType = heightLevelsKeys[index] as HeightLevelType;
  return heightLevels[key];
};

const goodOptions = ["Training the SOC", "Prioritise actions", "Update plans"];
const badOptions = ["No Hardening", "Logs were not kept", "Alert not created"];

export const options: OptionBlockType[] = [];

goodOptions.forEach((opt, i) => {
  const item = {
    id: i * 2,
    title: opt,
    isGift: true,
    height: randomHeightLevel() as HeightLevelType,
  };
  options.push(item);
  if (badOptions[i]) {
    const badItem = {
      id: i * 2 + 1,
      title: badOptions[i],
      isGift: false,
      height: randomHeightLevel() as HeightLevelType,
    };
    options.push(badItem);
  }
});


export const blockerData: BlockerType[] = [
  {
    id: 1,
    title: "No Hardening",
    position: 600,
    value: 500,
    isAlreadyColided: false,
    isAlreadyDamage: false,
    isGift: false,
    height: "H2",
    isActive: true,
  },
  {
    id: 2,
    title: "Training the SOC",
    position: 1100,
    value: 100,
    isAlreadyColided: false,
    isAlreadyDamage: false,
    isGift: true,
    height: "H1",
    isActive: true,
  },
  {
    id: 3,
    title: "Logs were not kept",
    position: 1800,
    value: 500,
    isAlreadyColided: false,
    isAlreadyDamage: false,
    isGift: false,
    height: "H3",
    isActive: true,
  },
  {
    id: 4,
    title: "Threat Hunting",
    position: 2300,
    value: 100,
    isAlreadyColided: false,
    isAlreadyDamage: false,
    isGift: true,
    height: "H2",
    isActive: true,
  },
  {
    id: 5,
    title: "Alert not created",
    position: 2850,
    value: 500,
    isAlreadyColided: false,
    isAlreadyDamage: false,
    isGift: false,
    height: "H2",
    isActive: true,
  },
  {
    id: 6,
    title: "Determine Scope",
    position: 3250,
    value: 100,
    isAlreadyColided: false,
    isAlreadyDamage: false,
    isGift: true,
    height: "H3",
    isActive: true,
  },
  {
    id: 7,
    title: "Scope misunderstood",
    position: 3600,
    value: 500,
    isAlreadyColided: false,
    isAlreadyDamage: false,
    isGift: false,
    height: "H2",
    isActive: true,
  },
  {
    id: 8,
    title: "Respond to Alerts",
    position: 4000,
    value: 100,
    isAlreadyColided: false,
    isAlreadyDamage: false,
    isGift: true,
    height: "H1",
    isActive: true,
  },
  {
    id: 9,
    title: "Refine Logging",
    position: 4400,
    value: 100,
    isAlreadyColided: false,
    isAlreadyDamage: false,
    isGift: true,
    height: "H1",
    isActive: true,
  },
  {
    id: 10,
    title: "Document later",
    position: 5000,
    value: 500,
    isAlreadyColided: false,
    isAlreadyDamage: false,
    isGift: false,
    height: "H2",
    isActive: true,
  },
  {
    id: 11,
    title: "No backups",
    position: 5500,
    value: 500,
    isAlreadyColided: false,
    isAlreadyDamage: false,
    isGift: false,
    height: "H3",
    isActive: true,
  },
  {
    id: 12,
    title: "Prioritise actions",
    position: 6100,
    value: 100,
    isAlreadyColided: false,
    isAlreadyDamage: false,
    isGift: true,
    height: "H2",
    isActive: true,
  },
  {
    id: 13,
    title: "Wait for incidents",
    position: 6600,
    value: 500,
    isAlreadyColided: false,
    isAlreadyDamage: false,
    isGift: false,
    height: "H2",
    isActive: true,
  },
  {
    id: 15,
    title: "Action everything",
    position: 7600,
    value: 500,
    isAlreadyColided: false,
    isAlreadyDamage: false,
    isGift: false,
    height: "H3",
    isActive: true,
  },
  {
    id: 16,
    title: "Update plans",
    position: 8100,
    value: 100,
    isAlreadyColided: false,
    isAlreadyDamage: false,
    isGift: true,
    height: "H1",
    isActive: true,
  },
  {
    id: 17,
    title: "Log everything",
    position: 8600,
    value: 500,
    isAlreadyColided: false,
    isAlreadyDamage: false,
    isGift: false,
    height: "H2",
    isActive: true,
  },

  {
    id: 18,
    title: "Run tabletops",
    position: 9600,
    value: 100,
    isAlreadyColided: false,
    isAlreadyDamage: false,
    isGift: true,
    height: "H3",
    isActive: true,
  },
  {
    id: 19,
    title: "Document actively",
    position: 10100,
    value: 100,
    isAlreadyColided: false,
    isAlreadyDamage: false,
    isGift: true,
    height: "H2",
    isActive: true,
  },
  {
    id: 20,
    title: "Log what is required",
    position: 10500,
    value: 100,
    isAlreadyColided: false,
    isAlreadyDamage: false,
    isGift: true,
    height: "H3",
    isActive: true,
  },
];

for (let i = 1; i < 21; i++) {
  blockerData.push({
    id: i,
    position: 11000 + 500 * i,
    value: checkEvenOrOdd(i) ? 100 : 500,
    isAlreadyColided: false,
    isAlreadyDamage: false,
    isGift: checkEvenOrOdd(i) ? true : false,
    height: checkEvenOrOdd(i)
      ? getRandomBlockerStage(true)
      : getRandomBlockerStage(false),
    isActive: true,
  });
}
