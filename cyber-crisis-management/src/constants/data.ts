/* in this file we have 
   - The Narrative questions
   - The Narrative Locked_Action
   - The Action for Narrative 
   - The all Narrative
*/

import {
  LockedActionType,
  questionModel,
  NarrativeModel,
  ActionOptionType,
  CommunicationOptions,
} from "./../utils/types/type";

// locked actions
export const LOCKED_ACTIONS: LockedActionType = {
  REMOVE_EMAIL: {
    key: "REMOVE_EMAIL",
    name: "Remove Email",
  },
  FORMAT_COMPUTERS: {
    key: "FORMAT_COMPUTERS",
    name: "Format Computers",
  },
  RESET_THE_ACCOUNT: {
    key: "RESET_THE_ACCOUNT",
    name: "Reset the Account",
  },
  SURGICAL_STRIKE: {
    key: "SURGICAL_STRIKE",
    name: "Surgical Strike",
  },
  IOC_ERADICATION: {
    key: "IOC_ERADICATION",
    name: "IOC Eradication",
  },
  COMMOND_AND_CONTROL: {
    key: "COMMOND_AND_CONTROL",
    name: "Command and Control destructions",
  },
  LIMIT_THE_BLEED: {
    key: "LIMIT_THE_BLEED",
    name: "Limit the Bleed",
  },
  NETWORK_GUARD: {
    key: "NETWORK_GUARD",
    name: "Network Guard",
  },
  THE_GREAT_WALL: {
    key: "THE_GREAT_WALL",
    name: "The Great Wall",
  },
  DOMAIN_TAKEBACK: {
    key: "DOMAIN_TAKEBACK",
    name: "Domain Takeback",
  },
  GPO_ISOLATION: {
    key: "GPO_ISOLATION",
    name: "GPO Isolation",
  },
  AV_Blocking: {
    key: "AV_Blocking",
    name: "AV Blocking",
  },
  IAM_EXPERT: {
    key: "IAM_EXPERT",
    name: "IAM EXPERT",
  },
  ORIGIN_STORY: {
    key: "ORIGIN_STORY",
    name: "Origin Story",
  },
  MALWARE_EXPERT: {
    key: "MALWARE_EXPERT",
    name: "Malware Expert",
  },
  THE_HARVESTER: {
    key: "THE_HARVESTER",
    name: "The Harvester",
  },
  GUARDIAN_OF_SERVERS: {
    key: "GUARDIAN_OF_SERVERS",
    name: "Guardian of Servers",
  },
};

// questions for narrative
const QUESTION_SET_ONE: questionModel[] = [
  {
    title: "How many users received the email?",
    answer: "20 users received the email.",
    alphabet: "",
    children: [
      {
        title: "Can we investigate which divisions these users work for?",
        answer: "Most of the users are from the R&D division.",
        unlock: LOCKED_ACTIONS.SURGICAL_STRIKE.key,
        unlockName: LOCKED_ACTIONS.SURGICAL_STRIKE.name,
        alphabet: "a",
      },
      {
        title:
          "Can we investigate which users actually interacted with the email?",
        answer: "10 of the users interacted with the email.",
        unlock: LOCKED_ACTIONS.SURGICAL_STRIKE.key,
        unlockName: LOCKED_ACTIONS.SURGICAL_STRIKE.name,
        alphabet: "b",
      },
    ],
  },
  {
    title: "What was in the email?",
    answer:
      "The mail contains an attachment asking users to please download and install for a software update!",
    alphabet: "",
    children: [
      {
        title: "Can we investigate the attachment in the email?",
        answer: "It deploys a RAT to the workstation.",
        unlock: LOCKED_ACTIONS.IOC_ERADICATION.key,
        unlockName: LOCKED_ACTIONS.IOC_ERADICATION.name,
        alphabet: "a",
      },
      {
        title: "Can we investigate the origin of the email?",
        answer:
          "We are able to find the origin where the emails are coming from!",
        unlock: LOCKED_ACTIONS.COMMOND_AND_CONTROL.key,
        unlockName: LOCKED_ACTIONS.COMMOND_AND_CONTROL.name,
        alphabet: "b",
      },
    ],
  },
  {
    title: "What does the malware do?",
    answer: "The RAT captures keystrokes of employees!",
    alphabet: "",
    children: [
      {
        title: "Where does the RAT send the communication to?",
        answer:
          "We are able to find the command and control server of the RAT!",
        unlock: LOCKED_ACTIONS.COMMOND_AND_CONTROL.key,
        unlockName: LOCKED_ACTIONS.COMMOND_AND_CONTROL.name,
        alphabet: "a",
      },
      {
        title: "How does the RAT spread across the network?",
        answer:
          "We have determined that the RAT harvests credentials to spread!",
        unlock: LOCKED_ACTIONS.LIMIT_THE_BLEED.key,
        unlockName: LOCKED_ACTIONS.LIMIT_THE_BLEED.name,
        alphabet: "b",
      },
    ],
  },
];

const QUESTION_SET_TWO: questionModel[] = [
  {
    title: "Can we investigate the Command & Control channel?",
    answer:
      "We are able to discover a DNS entry that is being used for the C2 channel.",
    alphabet: "",
    children: [
      {
        title: "Can we analyse the domain to see what is being hosted there?",
        answer:
          "Analysis of the domain allows us to determine the type of control server being used and thus the actual malware strand of the RAT!",
        unlock: LOCKED_ACTIONS.MALWARE_EXPERT.key,
        unlockName: LOCKED_ACTIONS.MALWARE_EXPERT.name,
        alphabet: "a",
      },
      {
        title:
          "Can we analyse what happens when the malware cannot connect to the C2 channel?",
        answer:
          "Analysis of the malware shows that it has several other DNS options that it tries if it cannot connect to the first one!",
        unlock: LOCKED_ACTIONS.THE_GREAT_WALL.key,
        unlockName: LOCKED_ACTIONS.THE_GREAT_WALL.name,
        alphabet: "b",
      },
    ],
  },
  {
    title: "Can we investigate what information the RAT enumerated locally?",
    answer: "The RAT seems to interface with the SAM hive to dump credentials.",
    alphabet: "",
    children: [
      {
        title: "Can we find out which credentials were found on the hosts?",
        answer:
          "We were able to see that several service accounts that were stored on the hosts were found!",
        unlock: LOCKED_ACTIONS.THE_HARVESTER.key,
        unlockName: LOCKED_ACTIONS.THE_HARVESTER.name,
        alphabet: "a",
      },
      {
        title:
          "Can we find out what privileges are assigned to the credentials that were harvested?",
        answer:
          "Several of the credentials that were compromised have access to both workstations and servers!",
        unlock: LOCKED_ACTIONS.IAM_EXPERT.key,
        unlockName: LOCKED_ACTIONS.IAM_EXPERT.name,
        alphabet: "b",
      },
    ],
  },
  {
    title:
      "Can we investigate what information the RAT enumerated from the environment?",
    answer:
      "The RAT seems to enumerate information about the Server range and Active Directory.",
    alphabet: "",
    children: [
      {
        title: "Can we find out what servers were enumerated by the malware?",
        answer:
          "Enumeration focused on jump host servers that were being used to administrate privileged systems such as our domain controllers!",
        unlock: LOCKED_ACTIONS.GUARDIAN_OF_SERVERS.key,
        unlockName: LOCKED_ACTIONS.GUARDIAN_OF_SERVERS.name,
        alphabet: "a",
      },
      {
        title: "Can we find out what AD information was enumerated?",
        answer:
          "The enumeration was mainly focused on service accounts that had a significant amount of privileges in the environment!",
        unlock: LOCKED_ACTIONS.IAM_EXPERT.key,
        unlockName: LOCKED_ACTIONS.IAM_EXPERT.name,
        alphabet: "b",
      },
    ],
  },
];
const QUESTION_SET_THREE: questionModel[] = [
  {
    title: "From where is the connection made to our domain controller?",
    answer:
      "The attacker is using their RAT to pivot through the environment, effectively bypassing our jump host.",
    alphabet: "",
    children: [
      {
        title: "What lateral movement technique was used?",
        answer:
          "The RAT makes use of an SMB pipe to proxy traffic to other RATs that have the ability to talk out of the network.",
        unlock: LOCKED_ACTIONS.NETWORK_GUARD.key,
        unlockName: LOCKED_ACTIONS.NETWORK_GUARD.name,
        alphabet: "a",
      },
      {
        title: "Can we find the C2 channel used on the perimeter?",
        answer:
          "We are able to find the original C2 that is currently being used to control the RAT.",
        unlock: LOCKED_ACTIONS.ORIGIN_STORY.key,
        unlockName: LOCKED_ACTIONS.ORIGIN_STORY.name,
        alphabet: "b",
      },
    ],
  },
  {
    title: "What did the attackers do on the domain controller?",
    answer:
      "The threat actors have performed a DC SYNC, dumping the credentials of all users.",
    alphabet: "",
    children: [
      {
        title: "To where has the DC Sync data been exfiltrated to?",
        answer:
          "The credentials have been exfiltrated out of our environment. The attacks have all of our credentials!",
        unlock: LOCKED_ACTIONS.DOMAIN_TAKEBACK.key,
        unlockName: LOCKED_ACTIONS.DOMAIN_TAKEBACK.name,
        alphabet: "a",
      },
      {
        title:
          "Can we see any other new connections being made from the domain controller?",
        answer:
          "The threat actor seems to use the DC connection to compromise other domain controllers as well!",
        unlock: LOCKED_ACTIONS.DOMAIN_TAKEBACK.key,
        unlockName: LOCKED_ACTIONS.DOMAIN_TAKEBACK.name,
        alphabet: "b",
      },
    ],
  },
  {
    title: "How is the ransomware being deployed?",
    answer:
      "The ransomware is originating from the domain controller that was compromised.",
    alphabet: "",
    children: [
      {
        title: "How is the ransomware spreading?",
        answer:
          "The threat actors are making use of a Group Policy Object to deploy the ransomware to all Windows hosts in the network.",
        unlock: LOCKED_ACTIONS.GPO_ISOLATION.key,
        unlockName: LOCKED_ACTIONS.GPO_ISOLATION.name,
        alphabet: "a",
      },
      {
        title: "Can we analyse the ransomware?",
        answer:
          "We are able to create IoCs and signatures of the ransomware strain.",
        unlock: LOCKED_ACTIONS.AV_Blocking.key,
        unlockName: LOCKED_ACTIONS.AV_Blocking.name,
        alphabet: "b",
      },
    ],
  },
];

// the narratives action lists
export const actionOptionsListsOne: ActionOptionType[] = [
  {
    title: "Remove email from user’s mailbox that have received the email",
    action: false,
    type: "disabled",
    damage: 2,
  },
  {
    title: "Format the computers of all employees that received the email",
    action: false,
    type: "disabled",
    damage: 2,
  },
  {
    title: "Reset the accounts of all employees that received the email",
    action: false,
    type: "disabled",
    damage: 2,
  },
  {
    title:
      "Perform additional monitoring and investigation in the R&D division",
    action: LOCKED_ACTIONS.SURGICAL_STRIKE.key,
    type: "disabled",
    damage: 5,
  },
  {
    title: "Create an IoC for the RAT and scan the network",
    action: LOCKED_ACTIONS.IOC_ERADICATION.key,
    type: "disabled",
    damage: 5,
  },
  {
    title: "Block the C2 channel on the perimeter",
    action: LOCKED_ACTIONS.COMMOND_AND_CONTROL.key,
    type: "disabled",
    damage: 8,
  },
  {
    title:
      "Reset the accounts of employees that have the RAT on their workstation",
    action: LOCKED_ACTIONS.LIMIT_THE_BLEED.key,
    type: "disabled",
    damage: 10,
  },
];

export const actionOptionsListsTwo: ActionOptionType[] = [
  {
    title: "Remove RAT from affected workstations",
    action: false,
    type: "disabled",
    damage: 2,
  },
  {
    title: "Block the C2 channel on our perimeter firewall",
    action: false,
    type: "disabled",
    damage: 2,
  },
  {
    title: "Format the computers of all employees that have the RAT installed",
    action: false,
    type: "disabled",
    damage: 2,
  },
  {
    title: "Reset the accounts of all employees that has the RAT installed",
    action: false,
    type: "disabled",
    damage: 5,
  },
  {
    title:
      "Create specialised IoCs for the RAT and scan our environment for infections",
    action: LOCKED_ACTIONS.MALWARE_EXPERT.key,
    type: "disabled",
    damage: 5,
  },
  {
    title:
      "Block the original and additional C2 channels on our perimeter firewall",
    action: LOCKED_ACTIONS.THE_GREAT_WALL.key,
    type: "disabled",
    damage: 6,
  },
  {
    title: "Rotate the passwords of all service accounts that were harvested",
    action: LOCKED_ACTIONS.IAM_EXPERT.key,
    type: "disabled",
    damage: 6,
  },
  {
    title: "Isolate all jump hosts until the threat has been neutralised",
    action: LOCKED_ACTIONS.GUARDIAN_OF_SERVERS.key,
    type: "disabled",
    damage: 5,
  },
  {
    title:
      "Rotate the passwords of all accounts that were extracted from the SAM hive",
    action: LOCKED_ACTIONS.THE_HARVESTER.key,
    type: "disabled",
    damage: 6,
  },
];

export const actionOptionsListsThree: ActionOptionType[] = [
  {
    title: "Remove the RAT from affected hosts",
    action: false,
    type: "disabled",
    damage: 2,
  },
  {
    title: "Rotate the credentials of all domain admins",
    action: false,
    type: "disabled",
    damage: 2,
  },
  {
    title: "Rebuild workstations affected by the ransomware",
    action: false,
    type: "disabled",
    damage: 2,
  },
  {
    title: "Disable SMB and RPC services until the threat is resolved",
    action: LOCKED_ACTIONS.NETWORK_GUARD.key,
    type: "disabled",
    damage: 5,
  },
  {
    title: "Block the C2 channel on the perimeter",
    action: LOCKED_ACTIONS.ORIGIN_STORY.key,
    type: "disabled",
    damage: 4,
  },
  {
    title: "Perform a domain takeback",
    action: LOCKED_ACTIONS.DOMAIN_TAKEBACK.key,
    type: "disabled",
    damage: 6,
  },
  {
    title: "Revoke the ransomware deploying GPO",
    action: LOCKED_ACTIONS.GPO_ISOLATION.key,
    type: "disabled",
    damage: 6,
  },
  {
    title: "Block execution of the ransomware through an AV signature",
    action: LOCKED_ACTIONS.AV_Blocking.key,
    type: "disabled",
    damage: 6,
  },
];

const communications = {
  NO_COMM: "No communication",
  BUSY_INVESTIGATING: "We are busy investigating",
  INCIDENT_DEALING: "There is an incident and we are dealing with it!",
  AWARE_INVESTIGATE:
    "We are aware that our systems have become slow and are investigating, please stand by",
  INVESTIGATE_PUBLIC:
    "We are busy investigating an incident and will let the public know when we have more details",
};

const communicationOptionsOne: CommunicationOptions = {
  internal: [
    {
      title: communications.NO_COMM,
      damage: 10,
      type: "disabled",
      action: "internal",
      hint: false,
      color: "#A3EA2A",
    },
    {
      title: communications.BUSY_INVESTIGATING,
      damage: 15,
      type: "disabled",
      action: "internal",
      hint: true,
      color: "#A3EA2A",
    },
    {
      title: communications.INCIDENT_DEALING,
      damage: 5,
      type: "disabled",
      action: "internal",
      hint: true,
      color: "#EB0037",
    },
  ],

  external: [
    {
      title: communications.NO_COMM,
      damage: 10,
      type: "disabled",
      action: "external",
      hint: false,
      color: "#A3EA2A",
    },
    {
      title: communications.AWARE_INVESTIGATE,
      damage: 10,
      type: "disabled",
      action: "external",
      hint: true,
      color: "#A3EA2A",
    },
    {
      title: communications.INVESTIGATE_PUBLIC,
      damage: 5,
      type: "disabled",
      action: "external",
      hint: true,
      color: "#EB0037",
    },
  ],
};

const communicationOptionsTwo: CommunicationOptions = {
  internal: [
    {
      title: communications.NO_COMM,
      damage: 5,
      type: "disabled",
      action: "internal",
      hint: true,
      color: "#EB0037",
    },
    {
      title: communications.BUSY_INVESTIGATING,
      damage: 10,
      type: "disabled",
      action: "internal",
      hint: false,
      color: "#A3EA2A",
    },
    {
      title: communications.INCIDENT_DEALING,
      damage: 10,
      type: "disabled",
      action: "internal",
      hint: true,
      color: "#A3EA2A",
    },
  ],

  external: [
    {
      title: communications.NO_COMM,
      damage: 5,
      type: "disabled",
      action: "external",
      hint: true,
      color: "#EB0037",
    },
    {
      title: communications.AWARE_INVESTIGATE,
      damage: 10,
      type: "disabled",
      action: "external",
      hint: true,
      color: "#A3EA2A",
    },
    {
      title: communications.INVESTIGATE_PUBLIC,
      damage: 10,
      type: "disabled",
      action: "external",
      hint: false,
      color: "#A3EA2A",
    },
  ],
};

const communicationOptionsThree: CommunicationOptions = {
  internal: [
    {
      title: communications.NO_COMM,
      damage: 0,
      type: "disabled",
      action: "internal",
      hint: true,
      color: "#EB0037",
    },
    {
      title: communications.BUSY_INVESTIGATING,
      damage: 5,
      type: "disabled",
      action: "internal",
      hint: false,
      color: "#A3EA2A",
    },
    {
      title: communications.INCIDENT_DEALING,
      damage: 10,
      type: "disabled",
      action: "internal",
      hint: true,
      color: "#A3EA2A",
    },
  ],

  external: [
    {
      title: communications.NO_COMM,
      damage: 0,
      type: "disabled",
      action: "external",
      hint: true,
      color: "#EB0037",
    },
    {
      title: communications.AWARE_INVESTIGATE,
      damage: 0,
      type: "disabled",
      action: "external",
      hint: false,
      color: "#A3EA2A",
    },
    {
      title: communications.INVESTIGATE_PUBLIC,
      damage: 5,
      type: "disabled",
      action: "external",
      hint: true,
      color: "#A3EA2A",
    },
  ],
};

const initialStory = [
  "The SOC has just received multiple alerts of users reporting the same phishing email. The CSIRT discovered that the phishing email was used to deploy malware to  workstations. You need to take action!",
  "After detailed analysis, the SOC determined that a phishing email delivered a remote access trojan to workstations. These trojans connected to a command and control channel, granting threat actors control over the malware, allowing them to gather data from compromised workstations and the environment. Prevent their spread now!",
  "RATs were used to spread the threat in our environment. A domain controller has been compromised according to SOC analysis. Users can't access files, with encrypted desktop messages. Urgent action is needed before more of our environment is affected.",
];

export const phasesInstructions = [
  "Your questions hold the key to unlocking actions to ensure positive outcomes.",
  "Explore powerups for the upcoming phase for success.",
  "This phase accrues a 25% estate damage boost. Your actions can curtail this impact to minimize the effect.",
  "Your decision on communication matters. Expect 25% reputation damage in this phase. Your actions can mitigate it.",
];

// the all narrative
export const ALL_NARRATIVES: NarrativeModel[] = [
  {
    actionCredits: 2,
    questionCredits: 4,
    questions: QUESTION_SET_ONE,
    unlockedActions: [],
    powerUp: null,
    actionLists: actionOptionsListsOne,
    communicationList: communicationOptionsOne,
    initialStory: initialStory[0],
  },
  {
    actionCredits: 2,
    questionCredits: 4,
    questions: QUESTION_SET_TWO,
    unlockedActions: [],
    powerUp: null,
    actionLists: actionOptionsListsTwo,
    communicationList: communicationOptionsTwo,
    initialStory: initialStory[1],
  },
  {
    actionCredits: 2,
    questionCredits: 4,
    questions: QUESTION_SET_THREE,
    unlockedActions: [],
    powerUp: null,
    actionLists: actionOptionsListsThree,
    communicationList: communicationOptionsThree,
    initialStory: initialStory[2],
  },
];
