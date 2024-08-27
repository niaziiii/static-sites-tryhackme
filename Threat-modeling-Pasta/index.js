const mainContainer = document.querySelector("#main-content");
const mainHeading = document.querySelector(".heading-main");
const body = document.querySelector(".body");
const instructions =
   "The site shows an email client showing the inbox of a security engineer. The inbox has several unread emails. Each unread email will be one of the tasks that the security engineer has to perform.";

// Global variables
let screen = 1;
let timerStarted = false;
let currentHours = 11;
let currentTime = currentHours * 3600;
let intervalId;
let isHoursOutOfRange = false;
let slideIndex = 1;
let clickPrevent = false;
let flowOrder = [];
let outSideTimeOut = false;

const coordinate = {
   introduction: [{ x: [236, 419], y: [163, 313] }],
   roomGate: [{ x: [58, 172], y: [162, 395] }],
};

//App data
const data = [
   {
      id: "room-bussines-stakeholder",
      isRoomOpen: true,
      isRoomVisited: false,
      title: "Business Stakeholder Team Room",
      speaker: "Business Analyst",
      image: "room-strategic-planning.png",
      currentVisits: 0,
      requiredVisits: 2,
      isRoomShowBadge: false,
      guide: "I need to work with someone who can define the objectives of our threat modelling exercise to identify the critical assets that need to be protected.",

      dialogue: [
         {
            title: "User",
            message:
               "Hey, I’m currently working on a Threat Modelling plan and I would like to ask for your expertise.",
         },
         {
            title: "Business Analyst",
            message: "Sure, let me hear it.",
         },
         {
            title: "User",
            message:
               "What are the critical assets and processes in our online banking platform that we need to protect?",
         },
         {
            title: "Business Analyst",
            message:
               "Our top priorities are to protect our customer's personal and financial data, secure our transactions processing systems, and ensure the availability and integrity of our online banking services.",
         },
         {
            title: "User",
            message: "Got it, thanks for this!",
         },
      ],
   },
   {
      id: "room-architecture",
      isRoomOpen: true,
      isRoomVisited: false,
      title: "System Architecture Team Room",
      speaker: "System Architect",
      image: "room-system-architecture.png",
      currentVisits: 0,
      requiredVisits: 1,
      isRoomShowBadge: false,
      guide: "I don’t know about our infrastructure. I need someone who can define the architecture of our online banking application.",
      dialogue: [
         {
            title: "User",
            message:
               "Hello, can you provide an overview of the application's architecture?",
         },
         {
            title: "System Architect",
            message:
               "Certainly. Our online banking platform leverages several AWS services to support its functionality. We utilize Amazon EC2 (Elastic Compute Cloud), RDS (Relational Database Service), and Amazon S3.",
            lists: [
               "Amazon EC2 (Elastic Compute Cloud)",
               "RDS (Relational Database Service)",
               "Amazon S3",
            ],
         },
         {
            title: "System Architect",
            message:
               "We also plan to use Elastic Load Balancer to handle traffic distribution, but that’s still in the works.",
         },
         {
            title: "User",
            message: "How about the data flows, can you expound further?",
         },
         {
            title: "System Architect",
            message:
               "We utilize Amazon S3 for storing static assets and files, such as customer profile pictures and document uploads, EC2 for hosting microservices via Virtual Machines, and RDS for storing customer data.",
         },
         {
            title: "User",
            message: "Awesome, thanks for taking the time to assist me.",
         },
      ],
   },
   {
      id: "room-development",
      isRoomOpen: true,
      isRoomVisited: false,
      speaker: "Lead Developer",
      title: "Development Team Room",
      image: "room-software-development.png",
      currentVisits: 0,
      requiredVisits: 1,
      isRoomShowBadge: false,
      guide: "Next, I need to understand how our online banking application works.",
      dialogue: [
         {
            title: "User",
            message:
               "Hey there! Can you provide an overview of the application's main features?",
         },
         {
            title: "Lead Developer",
            message:
               "Sure thing! The main features of our platform include secure user registration and authentication, account management, fund transfers, bill payments, and account statements. We also offer a mobile app for convenient access to our services.",
         },
         {
            title: "User",
            message: "Cool, I’ll take note of all those features. Thanks! ",
         },
      ],
   },
   {
      id: "room-security",
      isRoomOpen: true,
      isRoomVisited: false,
      title: "Security Team Room",
      speaker: "Security Engineer",
      title: "Security Team Room",
      image: "room-Information-security.png",
      currentVisits: 0,
      requiredVisits: 1,
      isRoomShowBadge: false,
      guide: "Now that I already know how our systems and applications work, I need to align with someone who can point out the potential threats and vulnerabilities that may affect our infrastructure.",
      dialogue: [
         {
            title: "User",
            message:
               "Hi! Can you help me identify potential threats and vulnerabilities to our online banking system?",
         },
         {
            title: "Security Engineer",
            message:
               "Absolutely, there are a number of threats we should consider. First, external attackers can try to break into our system via different methods such as brute-force attacks, SQL injection, cross-site scripting, or distributed denial of service (DDoS). In addition, insecure AWS configurations, such as exposed public buckets and RDS endpoints, may incur potential risks.",
         },
         {
            title: "User",
            message:
               "I see. Now, based on these potential attacks and threats, what can we do to mitigate them?",
         },
         {
            title: "Security Engineer",
            message:
               "We can implement account lockouts after several failed attempts for brute-force attacks. SQL injections can be mitigated by using secure coding practices. For cross-site scripting, we need to ensure data output is correctly encoded. And to counter DDoS attacks, we can use services that automatically protect against such threats and plan for scaling to handle the increased load. For cloud security, we need to harden all AWS services and limit the accessibility of each one only to the intended data flows.",
         },
      ],
   },

   {
      id: "room-network",
      isRoomOpen: false,
      isRoomVisited: true,
      title: "Network Infrastructure Team Room",
      speaker: "Network Engineer",
      image: "room-network.png",
      currentVisits: 0,
      requiredVisits: 1,
      message: "No one is here.",
      isRoomShowBadge: false,
      dialogue: [
         {
            title: "User",
            message:
               "Can you provide some information regarding our internal network infrastructure, including the servers you maintain and workstations used by employees?",
         },
         {
            title: "Network Engineer",
            message: "Sure, we maintain servers such as",
            lists: [
               "database servers",
               "firewalls",
               "mail servers",
               "file servers",
            ],
         },
         {
            title: "Network Engineer",
            message:
               "Although we are still working with the logging functionality of these servers. In addition, most of the workstations the employees use are Windows 10, and we are pushing to have an automated way of pushing security updates to these assets.",
         },
         {
            title: "User",
            message: "I’ll take note of all these items. Thanks!",
         },
      ],
   },
   {
      id: "room-ceo",
      isRoomOpen: false,
      isRoomVisited: true,
      title: "CEO Room",
      speaker: "CEO",
      isRoomShowBadge: false,
      message:
         "You are not allowed to enter this room. Get out! </br><small class='text-red-500'>An hour has been added.</small>",
      currentVisits: 0,
      requiredVisits: 1,
   },
   {
      id: "cafe-room",
      isRoomOpen: false,
      isRoomVisited: true,
      title: "Pantry",
      speaker: "Cafe",
      isRoomShowBadge: false,
      message:
         "It’s good to take a break. But remember, you need to finish your work before 5 PM",
      currentVisits: 0,
      requiredVisits: 1,
   },
];
const questionData = [
   {
      id: 0,
      isCorrect: false,
      title: "What should be the top priority for the online banking platform, as mentioned by the Business Analyst?",
      answer: [
         "Protecting customers’ personal and financial data, securing transactions, and ensuring service availability.",
      ],
      options: [
         "Maximizing profits",
         "Protecting customers’ personal and financial data, securing transactions, and ensuring service availability.",
         "Improving the online banking platform's user interface",
      ],
      scenario:
         "A data breach incident has occurred, compromising customers' personal and financial data. Immediate actions are being taken to secure transactions and ensure service availability. Stay vigilant and report any suspicious activities.",
   },
   {
      id: 1,

      isCorrect: false,
      title: "According to the System Architect, what are the primary technical assets of the online banking system?",
      answer: ["Amazon EC2, RDS, and S3 services"],
      options: [
         "The office's computer hardware",
         "Amazon EC2, RDS, and S3 services",
         "A collection of desktop banking applications",
      ],
      scenario:
         "We have detected a security breach involving our AWS EC2, RDS, and S3 services. Immediate actions are being taken to secure transactions and ensure service availability.",
   },
   {
      id: 2,

      isCorrect: false,
      title: "What components of the application did the Lead Developer highlight during the 'Decompose the Application' phase?",
      answer: [
         "User registration, account management, fund transfers, bill payments, and account statements",
      ],
      options: [
         "User registration, account management, fund transfers, bill payments, and account statements",
         "Backend services and frontend interface",
         "Testing and debugging tools",
      ],

      scenario:
         "Our online banking features, such as user registration, account management, fund transfers, bill payments, and account statements, are being misused by unauthorized entities. Immediate actions are being taken to secure transactions and ensure service availability",
   },
   {
      id: 3,

      isCorrect: false,
      title: "According to the Security Engineer, which type of threat is NOT considered for the online banking platform?",
      answer: ["Social engineering attacks"],
      options: [
         "Brute-Forcing attacks",
         "Social engineering attacks",
         "SQL injection attacks",
      ],
      scenario:
         "We have detected brute-forcing activity, including a mass attempt for SQL injection attacks, on our online banking platform, which resulted in a successful compromise of our database server. Immediate actions are being taken to secure transactions and ensure service availability.",
   },
   {
      id: 4,

      isCorrect: false,
      title: "Which vulnerability was mentioned by the Security Engineer as a potential issue for the online banking platform?",
      answer: ["Cloud Infrastructure Misconfigurations"],
      options: [
         "Cloud Infrastructure Misconfigurations",
         "Unpatched systems",
         "Lack of multi-factor authentication",
      ],
      scenario:
         "We have detected a client data breach due to a misconfiguration on our AWS S3 buckets. Immediate actions are being taken to secure transactions and ensure service availability.",
   },
   {
      id: 5,

      isCorrect: false,
      title: "According to the Security Engineer, which mitigation strategy does match the identified threats?",
      answer: ["Account lockouts"],
      options: [
         "Account lockouts",
         "Spam email filtering",
         "Implementing CSRF tokens",
      ],
      scenario:
         "We have detected a successful attempt to brute-forcing activity, compromising many customer accounts. Upon investigating, it was observed that our platform lacks account lockout mechanisms, which enabled the threat actors to attempt many authentication attempts to access a valid customer account.",
   },
   {
      id: 6,
      isCorrect: false,
      title: 'In the "Risk and Impact Analysis" phase, what potential consequence of a successful attack was mentioned by the Business Analyst?',
      answer: ["Financial loss and significant reputational damage"],
      options: [
         "Unexpected system upgrades",
         "A slight decrease in stock prices",
         "Financial loss and significant reputational damage",
      ],
      scenario:
         "An unfortunate incident has led to unauthorized access to our system, potentially resulting in financial loss and significant reputational damage. We are implementing our incident response plan and will provide updates as we know more. Please maintain confidentiality and adhere to protocol.",
   },
];
const roomImagesSlider = [
   {
      link: "strategic-planning-6",
      alt: "strategic planning room",
      id: "room-bussines-stakeholder",
      isRoomVisited: false,
      isRoomShowBadge: false,
      currentVisits: 0,
      requiredVisits: 2,
   },
   {
      link: "system-architecture-7",
      alt: "system architecture room",
      id: "room-architecture",
      isRoomVisited: false,
      isRoomShowBadge: false,
      currentVisits: 0,
      requiredVisits: 1,
   },
   {
      link: "software-development-5",
      alt: "software development room",
      id: "room-development",
      isRoomVisited: false,
      isRoomShowBadge: false,
      currentVisits: 0,
      requiredVisits: 1,
   },
   {
      link: "Information-security-3",
      alt: "Information security room",
      id: "room-security",
      isRoomVisited: false,
      isRoomShowBadge: false,
      currentVisits: 0,
      requiredVisits: 1,
   },
   {
      link: "network-infrastructure-4",
      alt: "network infrastructure room",
      id: "room-network",
      isRoomVisited: false,
      isRoomShowBadge: false,
      currentVisits: 0,
      requiredVisits: 1,
   },
   {
      link: "ceo-2",
      alt: "ceo room image",
      id: "room-ceo",
      isRoomVisited: false,
      isRoomShowBadge: false,
      currentVisits: 0,
      requiredVisits: 1,
   },

   {
      link: "cafe-1",
      alt: "cafe room image",
      id: "cafe-room",
      isRoomVisited: false,
      isRoomShowBadge: false,
   },
];
const secondConversations = [
   {
      title: "User",
      message:
         "From the business perspective, what do you think would be the impact of the identified threat?",
   },
   {
      title: "Business Analyst",
      message:
         "Well, these attacks could have severe consequences. A successful attack could lead to financial loss for our customers and our bank, regulatory penalties, and significant reputational damage.",
   },
   {
      title: "User",
      message:
         "Thanks for the feedback. I think I got all I need to complete my Threat Modelling Plan.",
   },
];

// Hooks
const screenShow = (num) => {
   screen = num;
   modulesHandler();
};
const instructionHook = () => {
   let hookTemplate = `
  <div class="pt-5 pb-2 px-4">
      <div class="continue flex flex-col gap-1 items-end">
          <ul class="text-lg list-disc px-6 flex flex-col gap-2">
            <li>You're already late, it's <b class="time-theme">11:00 am</b>.</li>
            <li>You must finish meetings with different teams (for collaboration) before submitting the threat modelling plan at <b class="time-theme">5:00 pm. </b></li>
            <li>You will find appropriate employees between <b class="time-theme">11:00 am</b> to <b class="time-theme">4:00 pm</b> (4:00 pm is the time you need to work on your presentation.)</li>
            <li>Keep an eye on the timer, as you have to create your presentation at 4:00 pm and submit it at <b class="time-theme">5:00 pm</b>.</li>
          </ul>
          <div>
            <b class="text-[#eb0037] text-xl mt-2"> Caution </b>
            <p class="px-2">
                In case you go to the wrong room (Cafe or CEO Room), an hour will be added in your time resulting in late submission.
            </p>
          </div>
      </div>
      <div class="btn-container-2 mt-3 continue-btn"> 
          <button class="py-[.3rem] continue-btn"> Continue </button> 
      </div>
  </div>  
  `;

   let hookHandler = (close) => {
      document.querySelector(".continue-btn").addEventListener("click", close);
   };
   return [hookTemplate, hookHandler, "continue"];
};

const isCopyingHook = () => {
   let hookTemplate = `
  <div class="flex items-center justify-between">
    ${atob("VEhNe2MwMGsxbmdfdGhyMzR0c193X1A0U1Q0fQ==")}
    <div class="copy-container relative">
        <button id="copy-btn" class="cursor-pointer border-none outline-none">
          <i class="fa-solid fa-copy"></i>
        </button>
        <div id="tooltip" class="copy-tooltip">Copy</div>
    </div>
  </div>
  `;

   const copyHandler = () => {
      const textToCopy = atob("VEhNe2MwMGsxbmdfdGhyMzR0c193X1A0U1Q0fQ==");
      tooltip.innerHTML = "Copied!";
      navigator.clipboard.writeText(textToCopy);

      setTimeout(() => {
         tooltip.innerHTML = "Copy ";
      }, 3000);
   };
   // copy text

   const hookHandler = (close) => {
      const copyBtn = document.getElementById("copy-btn");
      copyBtn.addEventListener("click", copyHandler);
   };
   refreshWindow = "refresh";
   return [hookTemplate, hookHandler, refreshWindow];
};
const usePresentationHook = () => {
   const hookTemplate = `
  <div class="">
    <h2>Oops, it’s already 4:00 PM. I need to finish the plan.</h2>
    <div class="btn-container-2 mt-4 ">
      <button class="create-presentation cursor-pointer py-[.2rem] border-none outline-none">
        Creating presentation...
      </button>
    </div>
</div>
  `;
   const hookHandler = (close) => {
      document
         .querySelector(".create-presentation")
         .addEventListener("click", () => {
            close();
         });
   };

   let isPresenting = "presentation";
   return [hookTemplate, hookHandler, isPresenting];
};
const useRestartHook = (message) => {
   const hookTemplate = `
  <div class="">
    <h2>${message}</h2>
    <div class="btn-container-2 mt-4 ">
      <button class="create-presentation cursor-pointer py-[.2rem] border-none outline-none">
        Please Restart!
      </button>
    </div>
  </div>
  `;
   const hookHandler = (close) => {
      document
         .querySelector(".create-presentation")
         .addEventListener("click", () => {
            close();
         });
   };

   let refresh = "refresh";
   return [hookTemplate, hookHandler, refresh];
};
const useGuideHook = (message) => {
   const hookTemplate = `
  <div>
    <h2>${message}</h2>
    <div class="btn-container-2 mt-4 ">
      <button class="got-it cursor-pointer py-[.2rem] border-none outline-none">
        Got it.
      </button>
    </div>
</div>
  `;

   const hookHandler = (close) => {
      document.querySelector(".got-it").addEventListener("click", () => {
         close();
      });
   };

   return [hookTemplate, hookHandler];
};
const useRestartHook2 = (message) => {
   const hookTemplate = `
  <div class="">
    <h2>${message}</h2>
    <div class="btn-container-2 mt-4 ">
      <button class="create-presentation cursor-pointer py-[.2rem] border-none outline-none">
        Continue
      </button>
    </div>
  </div>
  `;
   const hookHandler = (close) => {
      document
         .querySelector(".create-presentation")
         .addEventListener("click", () => {
            close();
            openEmailChecks();
         });
   };

   return [hookTemplate, hookHandler];
};

const openEmailChecks = () => {
   setTimeout(() => {
      popupOffical("Oops", false, () => useGoToQuestionPhaseHook("d"));
   }, 1000);
};
const useGoToQuestionPhaseHook = () => {
   const hookTemplate = `
<div>
    <p>
       There is something wrong with the Threat Modelling Plan. You need to review and apply the necessary changes.
    </p>
    <div class="mt-4 pb-2 flex items-center gap-4">
      <div class="btn-container-2 w-full nextBtn ml-auto mr-auto">
        <button class="restartIt py-1 px-4 text-sm" style='width:100%; min-height:3rem;'>Restart the day</button>
      </div>
      <div class="btn-container-2 w-full nextBtn ml-auto mr-auto">
        <button class="goTOQuestionPhase py-1 px-4 text-sm" style='width:100%; min-height:3rem;'>Restart the Threat Modelling Plan</button>
      </div>
    </div>
</div>

  `;

   const hookHandler = (close) => {
      const goTo = document.querySelector(".goTOQuestionPhase");
      const restart = document.querySelector(".restartIt");

      restart.addEventListener("click", () => window.location.reload());
      goTo.addEventListener("click", () => {
         mainContainer.style.filter = "none";
         close();
         screenShow(3);
         quizNo = 0;
      });
   };

   return [hookTemplate, hookHandler];
};

// offical popup
const popupOffical = (heading, message, hook) => {
   if (document.querySelector(".popup-offical")) {
      document.querySelector(".popup-offical").remove();
   }
   const [hookTemplate, hookHandler, action] = hook ? hook() : [];

   const html = `
    <div style="z-index:100" class="fixed top-0 left-0  w-full  min-h-screen z-100 flex justify-center items-center popup-offical overflow-hidden">
      <div class="w-[580px]  md:[666px] m-r-auto rounded-lg popUp opacity-100 bg-[#151c2b] slide-bottom popup-offical-container">
          <div class="flex items-center justify-between py-3 px-5  border-b">
            <h2 class="text-2xl font-bold">${heading}</h2>
            <i class="fa-solid fa-xmark cursor-pointer text-2xl opacity-60 hover:opacity-100 popup-close" ></i>
            </div>
            <div class="py-3 px-5 relative pt-4">
              ${!!hookTemplate && hookTemplate ? hookTemplate : ""}
              ${message ? message : ""}
          </div>
        </div>
    </div>
  `;

   body.insertAdjacentHTML("afterbegin", html);
   mainContainer.style.filter = "blur(2px)";

   const closeButton = () => {
      document.querySelector(".popup-offical").remove();
      mainContainer.style.filter = "none";

      if (currentHours >= 16 && outSideTimeOut) {
         const message =
            "Oops! It seems you are late to submit. Please restart the quiz and try again within the time limit. Good luck!";
         popupOffical("Late Submission", false, () => useRestartHook(message));
      }

      if (action && action == "refresh") {
         window.location.reload();
      } else if (action && action == "presentation") {
         screenShow(3);
      } else if (action == "continue") {
         authenticatedRoomOpened = true;
         popupOffical("Guide", false, () =>
            useGuideHook(data[openedRoom - 1].guide)
         );
         toastMessage(data[openedRoom - 1].guide);
      }
   };

   if (hookHandler) hookHandler(closeButton);

   // listerner to both buttons for closing modal
   const closeBtn = document.querySelectorAll(".popup-close");
   closeBtn.forEach((btn) =>
      btn.addEventListener("click", () => closeButton())
   );
};

// formating time
const formatHours = (hours) => {
   if (hours === 0) {
      return "12";
   } else if (hours > 12) {
      return (hours - 12).toString();
   } else {
      return hours.toString();
   }
};

const padZero = (value) => {
   return value.toString().padStart(2, "0");
};
const formatTime = (time) => {
   const hours = Math.floor(time / 3600) % 24;
   const minutes = Math.floor((time % 3600) / 60);
   const seconds = time % 60;

   const period = hours >= 12 ? "pm" : "am";
   const formattedHours = formatHours(hours);
   const formattedMinutes = padZero(minutes);
   const formattedSeconds = padZero(seconds);

   return `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${period}`;
};
const authLiveTimer = (time) => {
   if (document.querySelector(".live-timer")) {
      const formattedTime = formatTime(time);
      document.querySelector(".live-timer").innerHTML = formattedTime;
      return;
   }
   if (document.querySelector(".live-timer-2")) {
      const formattedTime = formatTime(time);

      document.querySelectorAll(".live-timer-2").forEach((el) => {
         el.innerHTML = formattedTime;
      });
   }
};

// constrains
function shuffleArray(array) {
   const shuffledArray = array.slice(); // Create a copy to avoid modifying the original
   shuffledArray.sort(() => Math.random() - 0.5);
   return shuffledArray;
}
function getRandomNumber() {
   return Math.floor(Math.random() * 7);
}

const toastMessage = (message) => {
   const messageParent = document.querySelector(".toast-wrapper");
   const messageContaienr = document.querySelector(".toast-message");
   const glowingBlub = document.querySelector(".glowing-blub");
   glowingBlub.classList.remove(["hidden"]);
   messageContaienr.innerHTML = message;
   messageParent.classList.add("toast-added");
};

function compareArrays(staticArr, dynamicArr) {
   if (staticArr.length !== dynamicArr.length) {
      return false;
   }

   for (let i = 0; i < staticArr.length; i++) {
      if (staticArr[i] !== dynamicArr[i]) {
         return false;
      }
   }
   return true;
}
function findIndexOfId(array, targetId) {
   for (let i = 0; i < array.length; i++) {
      if (array[i].id === targetId) {
         return i;
      }
   }
}
const incHour = (warn) => {
   currentHours += 1;

   if (warn) {
      document.querySelectorAll(".showingHourSlider").forEach((elem) => {
         elem.style.color = "#eb0037";
      });
      isHoursOutOfRange = true;
      outSideTimeOut = true;
   }
   if (document.querySelector(".showingHourSlider")) {
      const docTime = document.querySelectorAll(".showingHourSlider");
      docTime.forEach((time) => {
         time.innerHTML = formatTime(currentTime);
      });
   }
};
const startTimer = () => {
   if (!timerStarted) {
      intervalId = setInterval(() => {
         currentTime++;
         authLiveTimer(currentTime);
      }, 1000);

      timerStarted = true;
   }
};

const stopTimer = () => {
   clearInterval(intervalId);
   timerStarted = true;
};
const toggleZIndex = (elem, value = false) => {
   let zIndex = "-1";
   if (value) {
      zIndex = "100";
   }
   if (elem.style.zIndex !== zIndex) {
      elem.style.zIndex = zIndex;
   }
};
const perimeterMouseoverIntro = (event) => {
   const { offsetX, offsetY } = event;
   const base = { offsetX, offsetY };
   const introSection = document.querySelector(".introduction-container");

   if (isWithin(base, coordinate.introduction)) {
      introSection.style.cursor = "pointer";
      introSection.addEventListener("click", () => {
         stopTimer();
         screenShow(2);
         popupOffical("Introduction", false, instructionHook);
      });
      return;
   } else {
      introSection.style.cursor = "auto";
      introSection.addEventListener("click", () => {
         return;
      });
   }

   return;
};
const isWithin = (event, coords) => {
   const { offsetX, offsetY } = event;
   if (typeof coords[0] === "number") {
      // [x1, x2, y1, y2]
      return (
         offsetX >= coords[0] &&
         offsetX <= coords[1] &&
         offsetY >= coords[2] &&
         offsetY <= coords[3]
      );
   }

   let within = false;
   for (let coord of coords) {
      const x = coord.x;
      const y = coord.y;
      if (
         offsetX >= x[0] &&
         offsetX <= x[1] &&
         offsetY >= y[0] &&
         offsetY <= y[1]
      ) {
         within = true;
         break;
      }
   }

   return within;
};

const perimeterMouseover = (event) => {
   const doorImage = document.querySelector(".door-image");
   const allRoomsImages = document.querySelectorAll(".rooms-images");
   const { offsetX, offsetY } = event;
   const base = { offsetX, offsetY };

   if (isWithin(base, coordinate.roomGate)) {
      toggleZIndex(doorImage, true);
      doorImage.addEventListener("click", () => {
         if (clickPrevent) return;
         clickPrevent = true;
         const activeElement = allRoomsImages[slideIndex - 1];
         roomInAuth(activeElement.id);
      });
   } else {
      toggleZIndex(doorImage, false);
   }
   clickPrevent = false;
};

// slide for screen 2
function showSlides(n) {
   let i;
   let slides = document.getElementsByClassName("mySlides");
   if (slides.length < roomImagesSlider.length) return;

   let dots = document.getElementsByClassName("dot");
   if (n > slides.length) {
      slideIndex = 1;
   }
   if (n < 1) {
      slideIndex = slides.length;
   }
   for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
   }
   for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
   }
   slides[slideIndex - 1].style.display = "block";
   dots[slideIndex - 1].className += " active";
}
function plusSlides(n) {
   showSlides((slideIndex += n));
}
function currentSlide(n) {
   showSlides((slideIndex = n));
}

function handleKeyDown(event) {
   if (event.key === "ArrowLeft") {
      slideIndex = slideIndex - 1;
   } else if (event.key === "ArrowRight") {
      slideIndex = slideIndex + 1;
   }
   showSlides(slideIndex);
}
// Attach event listener for key presses
window.addEventListener("keydown", handleKeyDown);

//////////////////////////////////////////////////////
///////// APPLICATION STARTING //////////////////////
//////////////////////////////////////////////////////

const firstScreenTemplates = () => {
   return `
  <div class="w-full m-auto h-full flex flex-col flex-1 pt-20">
      <div class="relative rounded-lg overflow-hidden introduction-container w-[640px] md:w-[666px] h-full m-auto"  onmousemove="perimeterMouseoverIntro(event)">
        <span class="absolute top-3 right-3 text-xl"> <b class="time-theme live-timer">11:00:00 am</b> </span>
        <img src="./assests/home-intro.png" class="w-full cover-image" alt=""></img>
    </div>
  </div>
    `;
};

const firstScreenHandler = () => {
   mainContainer.innerHTML = "";
   mainContainer.insertAdjacentHTML("afterbegin", firstScreenTemplates());
};

const secondScreenTemplates = () => {
   const html = `
  <div class="rounded-lg overflow-hidden slideshow-container mt-20 w-[720px] relative" onmousemove="perimeterMouseover(event)" > 
    <div class="cursor-pointer door-image absolute top-0 left-0" style="z-index:-1">
      <img class="" src="./assests/open-door.png" alt="" />
    </div> 

  ${[...shuffleArray(roomImagesSlider)]
     .map((image, i) => {
        return `
      <div class="mySlides fade">
        <div class="numbertext">${i + 1} / 7</div>
        ${
           image.isRoomShowBadge
              ? `<div class="absolute top-2 left-12 bg-[#a3ea2a] w-16 text-center rounded-lg font-bold text-black">Visited</div>`
              : ""
        }
        <div class="font-bold text-xl numbertext right-0 currentHours"> <b class="time-theme showingHourSlider live-timer-2 ${
           isHoursOutOfRange ? "text-red-500" : ""
        }"> ${formatTime(currentTime)}  </b> </div>
        <img id="${image.id}" src="./assests/${
           image.link
        }.png" style="width:100%" class="rooms-images">
    </div>
      `;
     })
     .join("")}
  

    <a class="prev" onclick="plusSlides(-1)">❮</a>
    <a class="next" onclick="plusSlides(1)">❯</a>
  
  </div>
  <br>
  
  <div style="text-align:center" class="-mt-4">
    ${roomImagesSlider
       .map(
          (image, i) =>
             `  <span class="dot" onclick="currentSlide(${i + 1})"></span>`
       )
       .join(" ")} 
  </div>
      `;

   return html;
};

const secondScreenHandler = () => {
   mainContainer.innerHTML = "";
   mainContainer.insertAdjacentHTML("afterbegin", secondScreenTemplates());
   stopTimer();
   timerStarted = false;
   startTimer();
   const allVisited = data.every((obj) => obj.isRoomVisited === true);

   const result = compareArrays([0, 1, 2, 3, 0], flowOrder);

   // if the current hours are 16 and all room visited with ordered
   if (currentHours == 16 && allVisited == true && result == true) {
      popupOffical("It's presentation time", false, usePresentationHook);
      slideIndex = 1;
      showSlides(slideIndex);
      return;
   }

   // if the current hours are 16 and all room visited and order is not followed
   if (result == false && currentHours <= 16 && allVisited == true) {
      showSlides(slideIndex);
      const lostMessage =
         "You were not able to coordinate with the appropriate teams and failed to submit your threat modelling plan.";
      popupOffical("Game Over", false, () => useRestartHook(lostMessage));
      return;
   }

   // if the current hours above 16 and ordered not followed
   if (currentHours >= 16) {
      const message =
         "Oops! It seems you are late to submit. Please restart the quiz and try again within the time limit. Good luck!";
      popupOffical("Late Submission", false, () => useRestartHook(message));
   }
   showSlides(slideIndex);

   if (
      data[openedRoom - 1].currentVisits == 1 &&
      data[openedRoom - 1].id == "room-bussines-stakeholder" &&
      authenticatedRoomOpened
   ) {
      let secondGuideBussiness =
         "Almost done with the work. The last thing I need is someone who can provide the potential impact of the identified risks to our organization.";
      popupOffical("Guide", false, () => useGuideHook(secondGuideBussiness));
      toastMessage(secondGuideBussiness);
   } else {
      if (!authenticatedRoomOpened) return;
      popupOffical("Guide", false, () =>
         useGuideHook(data[openedRoom - 1].guide)
      );
      toastMessage(data[openedRoom - 1].guide);
   }
};

//checking which room is clicked and needs to open.
let openedRoom = 1;
let authenticatedRoomOpened = false;
const roomInAuth = (roomId) => {
   data.forEach((room, i) => {
      if (room.id === roomId) {
         if (
            room.isRoomOpen &&
            room.isRoomVisited == false &&
            i + 1 == openedRoom
         ) {
            openRoomDetails(roomId);
         } else if (room.isRoomOpen == false) {
            popupOffical(room.speaker, room.message);
            currentTime = currentTime + 3600;
            incHour(true);
            return;
         } else if (room.isRoomShowBadge && i + 1 != openedRoom) {
            popupOffical(
               "Warning",
               "You already went to this room. Try to coordinate with another team."
            );
            return;
         } else if (room.isRoomVisited == false) {
            popupOffical(
               "Warning",
               "You went to the wrong resource.  </br><small class='text-red-500'>An hour has been added.</small>"
            );
            currentTime = currentTime + 3600;
            incHour(true);
            return;
         }
      }
   });
};

/*
///////////////////////////////////////////////////
////// open room templates and handler////////////
//////////////////////////////////////////////////
*/

const dailougeListsTemplates = (lists, id) => {
   return `
  <ul class="lists">
    ${lists
       .map((list) => `<li class="message" id="list-${id}">${list}</li>`)
       .join(" ")}
  </ul>
    `;
};

const roomProfile = (profile) => {
   return `
  <span class="dailouge-icon">
  ${
     profile?.title == "User"
        ? "<i class='fa-solid fa-user text-2xl'></i>"
        : "<i class='fas fa-user-secret' aria-hidden='true'></i>"
  }
  </span>
  `;
};

const openRoomDailougeTemplates = (room, id) => {
   let html = `
  <div class="dailouge mt-3">
    <div class="dailouge__container" id="dailouge__container">
      ${roomProfile(room)} 
      <div class="dailouge__para ">
        <h4 class="dailouge-heading">${room.title}</h4>
        <p id="conv-${id}" class="message ml-0 max-w-[560px]">${
      room?.message
   }</p>
        ${room?.lists ? dailougeListsTemplates(room.lists, id) : ""}
     </div>
    </div>
  </div>
  `;
   return html;
};

// showing rooms details which rooms are open
let isClickHandled = false;
const setGuardMessage = (id, isLists) => {
   if (isLists) {
      const guardMessages = document.querySelectorAll(`#${id}`);

      guardMessages.forEach((guardMessage) => {
         const width = document.querySelector(".lists").offsetWidth;
         guardMessage.style.width = `${width - 5}px`;
         setTimeout(() => (guardMessage.style.overflow = "visible"), 2000);
      });
   } else {
      const guardMessage = document.getElementById(id);
      const width = guardMessage.closest(".dailouge__container").offsetWidth;
      guardMessage.style.width = `${width - 50}px`;

      setTimeout(() => {
         guardMessage.style.whiteSpace = "break-spaces";
      }, 2000);
   }
};

const showingBtn = (text, callBack, proceed, id, roomData) => {
   return `<div  class='btn-container conversation-btn mt-0 p-0 flex-1'> <button id='${
      id ? `btn-${id}` : ""
   }' style='width:100%; padding:.3rem 0;' onclick='handleButtonClickOnce(this, ${callBack}, ${proceed}, ${id})' class='button ${
      proceed ? "true" : "false"
   }'> ${text} </button> </div>`;
};

let roomData;
let showDialog = 0;
let nextBtn;

const openRoomDetails = async (roomId) => {
   isClickHandled = false;
   roomData = data.find((room) => room.id == roomId);

   if (
      roomData.currentVisits == 1 &&
      roomData.id == "room-bussines-stakeholder"
   ) {
      roomData.dialogue = secondConversations;
   }

   showDialog = 0;
   const html = `
    <div class="dailouge-box rounded-lg overflow-hidden">
      <div class="relative">
        <div class="m-auto w-full">
          <img src="./assests/room-images/${roomData.image}"></img>
        </div> 
        <div class="dailouge-container absolute top-0 left-0 w-full h-full bg-transparent p-4  w-full">
          <h1 class="text-center bg-[#000000a6] m-auto w-fit px-3 rounded-lg text-2xl capitalize mb-3 font-bold">${roomData.title}</h1>
          
          <div class="absolute bottom-2 left-0 w-full flex items-center justify-center">
            <div class="dailouge-container-showing w-[95%] bg-[#000000a6] p-2 rounded-lg w-full">
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
   mainContainer.innerHTML = "";
   mainContainer.insertAdjacentHTML("afterbegin", html);

   flowOrder.push(findIndexOfId(data, roomId));

   nextBtn = `
    <div class=' mt-0 p-0 flex-1 m-auto flex w-full'> 
      <button class="ml-auto" style='padding:.1rem;' id="nextButton">
        <i class="fa-solid fa-caret-down text-[#a3ea2a] hover:text-[#a3ea2a]/50" style='font-size:2rem'></i>
      </button> 
    </div>
  `;

   // Show the first dialogue initially
   renderDialogue(roomId);
   const messageParent = document.querySelector(".toast-wrapper");
   const messageContaienr = document.querySelector(".toast-message");
   const glowingBlub = document.querySelector(".glowing-blub");

   glowingBlub.classList.add(["hidden"]);
   messageContaienr.innerHTML = "";
   messageParent.classList.remove("toast-added");
};

const renderDialogue = (roomId) => {
   const dialogueContainer = document.querySelector(
      ".dailouge-container-showing"
   );
   dialogueContainer.innerHTML = "";

   dialogueContainer.insertAdjacentHTML(
      "afterbegin",
      openRoomDailougeTemplates(roomData.dialogue[showDialog], showDialog)
   );

   setGuardMessage(`conv-${showDialog}`);
   if (document.getElementById(`list-${showDialog}`)) {
      setGuardMessage(`list-${showDialog}`, true);
   }

   // Check if there are more dialogues to show, and add the Next button if necessary
   if (showDialog < roomData.dialogue.length - 1) {
      if (!dialogueContainer.querySelector("#nextButton")) {
         dialogueContainer.insertAdjacentHTML("beforeend", nextBtn);

         // Handle Next button click
         const nextButton = document.getElementById("nextButton");
         nextButton.addEventListener("click", () => {
            showDialog++;
            renderDialogue();
         });
      }
   } else {
      dialogueContainer.insertAdjacentHTML("beforeend", nextBtn);
      const nextButton = document.getElementById("nextButton");
      nextButton.style.marginRight = "auto !important";
      nextButton.classList.remove("ml-auto");
      nextButton.classList.add("mr-auto");
      nextButton.classList.add("ml-14");
      nextButton.classList.add("btn-3");
      nextButton.classList.add("nextButton-effect");

      nextButton.innerHTML = "Thank you for your insights!";

      const clickHandler = () => {
         data.forEach((item) => {
            if (item.id === roomData.id) {
               item.currentVisits = item.currentVisits + 1;
               item.isRoomShowBadge = true;

               if (item.currentVisits == item.requiredVisits) {
                  item.isRoomVisited = true;
               }
            }
         });

         roomImagesSlider.forEach((item) => {
            if (item.id === roomData.id) {
               item.currentVisits = item.currentVisits + 1;

               if (item.currentVisits == item.requiredVisits) {
                  item.isRoomShowBadge = true;
                  item.isRoomVisited = true;
               }
            }
         });

         incHour();
         currentTime = currentTime + 3600;
         slideIndex = getRandomNumber();

         openedRoom = openedRoom + 1;
         if (openedRoom == 5) openedRoom = 1;
         screenShow(2);
      };
      nextButton.addEventListener("click", clickHandler);
   }
};

const stopThread = (sec) => {
   return new Promise((resolve, reject) => {
      setTimeout(() => {
         resolve();
      }, sec);
   });
};

// Pre-pairing presentation screen handler/templates
let quizNo = 0;
let isQuizBtnClicked = false;
const submitOptionsHandler = async (e) => {
   if (isQuizBtnClicked) return;
   isQuizBtnClicked = true;
   quizNo += 1;

   if (questionData[e.target.id].answer == e.target.innerHTML) {
      e.target.style.background = "#a3ea2a";
      questionData[e.target.id].isCorrect = true;
   } else {
      e.target.style.background = "#eb0037";
      questionData[e.target.id].isCorrect = false;
   }

   await stopThread(800);

   if (quizNo == questionData.length) {
      let wrong = questionData.filter((quest) => quest.isCorrect === false);
      if (wrong.length > 1) {
         wrong = [wrong[0]];
      } else {
         wrong = undefined;
      }

      screenShow(4);
   } else {
      questionTemplateInDailougeTemplates(questionData[quizNo]);
   }

   setTimeout(() => {
      isQuizBtnClicked = false;
   }, 300);
};

const questionTemplateInDailougeTemplates = (question) => {
   const html = `
  <div class="relative">
  <h3 class="text-3xl">Let's finalize the plan based on the discussions.</h3>
  <h3 class="text-xl mt-3">Please pick the correct answer.</h3>

    <span class="absolute -top-4 -right-2">${quizNo + 1}/7</span>

    <h3 class="text-xl mt-12">${question.title}</h3>
    <ul class="grid grid-cols-1 gap-6 mt-6 mb-8 px-2">
      ${question.options
         .map(
            (opt, i) => `
        <div class="btn-container-2">
          <button class="text-start pl-4 question-btn" id='${question.id}'>${opt}</button>
        </div>
        `
         )
         .join("")}
    </ul>
  </div>
  `;

   const questionContainer = document.querySelector(".question-container");
   questionContainer.innerHTML = "";
   questionContainer.insertAdjacentHTML("afterbegin", html);

   const allOptionsBtns = document.querySelectorAll(".question-btn");
   allOptionsBtns.forEach((btn) => {
      btn.addEventListener("click", submitOptionsHandler);
   });
};
const preparingPresentationTemplate = () => {
   const html = `
  <div class='bg-[#151c2b] w-[640px] md:w-[666px] m-auto mt-10 px-4 py-6 rounded-lg'> 
      <div class='question-container'>  </div>
  </div>
  `;
   return html;
};

const preparingPresentation = () => {
   const html = preparingPresentationTemplate();
   mainContainer.innerHTML = "";
   mainContainer.insertAdjacentHTML("afterbegin", html);
   questionTemplateInDailougeTemplates(questionData[0]);
};

// nextDayScreen screen handler and templates
const reload = () => window.location.reload();
const showWrongScenario = (scenario) => {
   return `
<div class="flex flex-col gap-0">
  <div class="nextDay__header flex gap-2 ">
      <i class="fa-solid fa-user text-[2.5rem] text-white"></i>
      <span class="flex flex-col">
        <small> ${getCurrentTime()} </small>
      
        <a class="underline font-bold" href="mailto:securityanalyst@tryhackme.com">securityanalyst@tryhackme.com </a>
      </span>
  </div>
  <span class="flex gap-1 mt-2 mb-4"> 
    <b>Subject :</b>
    <p class="font-light"> Security Breach Incident Notification </p>
  </span>

  <div class="ml-auto flex justify-end flex-col">
    <div class="mt-2 flex flex-col gap-0">
      <h3> ${scenario} </h3>
    </div>
    <div class="mt-8 flex flex-col gap-0 self-end">
        <span class="font-light"> Security Team </span>
        <span class="font-light flex gap-1 items-center">
          <b class="font-bold">E:</b>
          <a class="underline" href="mailto:security@swiftspendfinancial.thm">security@swiftspendfinancial.thm</a>
        </span>
        <span class="font-light flex gap-1 items-center">
          <b class="font-bold">W:</b>
          <a class="underline" href="www.swiftspendfinancial.thm" target='_blank'>www.swiftspendfinancial.thm</a>
        </span> 
    </div>
  </div>
</div>  
  `;
};

function getCurrentTime() {
   const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
   ];

   const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

   const date = new Date();
   const day = days[date.getDay()];
   const month = months[date.getMonth()];
   const year = date.getFullYear();
   let hours = date.getHours();
   const minutes = date.getMinutes();
   const period = hours >= 12 ? "pm" : "am";

   // Convert to 12-hour format
   hours = hours % 12 || 12;

   const formattedTime = `${date.getDate()}-${month}-${year} ${hours}:${minutes
      .toString()
      .padStart(2, "0")}${period}`;
   return formattedTime;
}

const nextDayScreenTemplate = () => {
   const nextBtn = `
  <div class="btn-container-2 w-auto nextBtn mt-auto ">
    <button class="py-1 px-2 text-sm" > Open </button>
  </div>
  `;

   const html = `
  <div class="nextDay overflow-auto bg-black absolute top-0 left-0 h-full w-full flex items-center justify-center"> 
    <div class="relative min-w-[720px] w-[720px]">    
      <img class="relative" src="./assests/emailclient.png" > </img>
      <div class="z-20 w-[425px] shadow m-auto nextDayBox absolute top-[0%] left-[50%]" style='transform:translate(-50%,14%)'>
        <div class="w-full text-black bg-white rounded-xl p-2 h-[16rem] flex flex-col">
        <h2 class='text-center font-bold text-xl'>Inbox</h2>  
        <div class="nextDay__body overflow-auto pt-0 text-sm flex relative items-center justify-center mt-4">
                <i class="fa-solid fa-star mr-1 text-[#a3ea2a]"></i>
                <h2 class='text-lg mr-4 subject-message'>Security Breach Incident Notification</h2>
               
                ${nextBtn}
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
   return html;
};

const nextDayScreenHandler = () => {
   mainContainer.innerHTML = "";
   mainContainer.insertAdjacentHTML("afterbegin", nextDayScreenTemplate());

   popupOffical(
      "Next Day",
      "Just another day at work. Let me check my emails first before doing my other tasks."
   );

   let wrong = questionData.filter((quest) => quest.isCorrect === false);

   // CHECKING HERE : there 4 questions and only showing scenario of first wrong question
   if (wrong.length > 1 || wrong.length == 1) {
      wrong = [wrong[0]];
   } else {
      wrong = undefined;
   }

   // showing flag based on the first wrong question/win result
   const nextBtn = document.querySelector(".nextBtn");
   let message = document.querySelector(".subject-message");
   if (!wrong) message.innerHTML = "Success: Here's the flag.";

   nextBtn.addEventListener("click", () => {
      if (wrong) {
         popupOffical("Security Breach Incident Notification", false, () =>
            useRestartHook2(showWrongScenario(wrong[0].scenario))
         );
      } else {
         popupOffical("Flag", false, isCopyingHook);
      }
   });
};

// main handler for all modules
function modulesHandler() {
   if (screen === 1) firstScreenHandler();
   if (screen === 2) secondScreenHandler();
   else if (screen === 3) preparingPresentation();
   else if (screen === 4) nextDayScreenHandler();
   else return;
}

modulesHandler();
