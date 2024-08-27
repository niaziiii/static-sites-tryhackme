// action phase asset
import actionIcon from "./asset/Action icon.svg";

// triage phase asset
import csirtIcon from "./asset/triage-phase/CSIRT power up small icon.svg";
import triagePowerUpIcon from "./asset/triage-phase/Action power up small icon.svg";
import triageCommunicationPower from "./asset/triage-phase/Communication power up small icon.svg";
import triageIcon from "./asset/Triage icon.svg";
import triageCsirtIconGrey from "./asset/triage-phase/grey/CSIRT power up small grey icon.svg";
import triageCommunicationPowerGrey from "./asset/triage-phase/grey/Communication power up small grey icon.svg";
import triagePowerupIconGrey from "./asset/triage-phase/grey/Action power up small grey icon.svg";

// communication phase asset
import comunicationIcon from "./asset/Communication icon.svg";

// question phase asset
import questionIcon from "./asset/Question icon.png";

// animation
import narrative01 from "./asset/animations/narrative-1.json";
import narrative02 from "./asset/animations/narrative-2.json";
import narrative03 from "./asset/animations/narrative-3.json";

const triage = {
  main: triageIcon,
  iconsMain: [csirtIcon, triagePowerUpIcon, triageCommunicationPower],
  iconGrey: [
    triageCsirtIconGrey,
    triagePowerupIconGrey,
    triageCommunicationPowerGrey,
  ],
};

const communication = {
  main: comunicationIcon,
};

const question = {
  main: questionIcon,
};

const action = {
  main: actionIcon,
};
export const appAsset = {
  triage,
  communication,
  question,
  intro: [narrative01, narrative02, narrative03],
  action,
};
