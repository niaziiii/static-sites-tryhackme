const mainContainer = document.querySelector("#main-content");
const body = document.querySelector(".body");

let screen = 1;
let currentHours = 11;

const introduction =
  "As a security analyst, you are tasked to conduct Threat Modelling process to reduce the risk in the organization.";

const screenShow = (num) => {
  screen = num;
  modulesHandler();
};

// offical popup
const refresh = () => window.location.reload();
let isFiredPresentation = true;

const popupOffical = (
  heading,
  message,
  presentation,
  nextDay,
  restart,
  proceed,
  continueForward,
  K
) => {
  if (document.querySelector(".popup-offical")) {
    document.querySelector(".popup-offical").remove();
  }

  const html = `
  <div class="fixed top-0 left-0  w-full  min-h-screen flex justify-center items-center  popup-offical overflow-hidden" style="z-index:100">
    <div class="w-[580px] bg-[#151c2b]  md:[666px] m-r-auto -mt-10  border rounded-lg popUp opacity-100 slide-bottom popup-offical-container">
        <div class="flex items-center justify-between py-3 px-5  border-b">
            <h2 class="text-2xl font-bold">${heading}</h2>
            <i class="fa-solid fa-xmark cursor-pointer text-2xl opacity-60 hover:opacity-100 popup-close" ></i>
        </div>
        ${
          presentation
            ? `
            <div class="pt-5 pb-2 px-4">
              <div class="presentation flex gap-1 items-end">
                <p class="text-lg">${message}</p>
                <span> 
                  <b class="presentation_one">.</b>
                  <b class="presentation_two">.</b>
                  <b class="presentation_three">.</b>
                </span>
                </div>
              <div class="btn-container-2 mt-3 hidden presentation-btn"> 
                <button class="py-[.3rem]">Prepare presentation.</button> 
              </div>
            </div>
               `
            : nextDay
            ? `
            <div class="pt-5 pb-2 px-4">
              <div class="checkingEmails flex gap-1 items-end">
                <p class="text-lg">${message}</p>
                </div>
              <div class="btn-container-2 mt-3 checkingEmails-btn"> 
                <button class="py-[.3rem]">Check emails</button> 
              </div>
            </div>
            `
            : restart
            ? `            
            <div class="pt-5 pb-2 px-4">
              <div class="restart flex gap-1 items-end">
                <p class="text-lg">${message}</p>
              </div>
              <div class="btn-container-2 mt-3 restart-btn"> 
                <button class="py-[.3rem]" onClick="refresh()">Restart</button> 
              </div>
           </div>`
            : proceed
            ? `            
            <div class="pt-5 pb-2 px-4">
              <div class="proceed flex gap-1 items-end">
                <p class="text-lg">${message}</p>
              </div>
              <div class="btn-container-2 mt-3 proceed-btn"> 
                <button class="py-[.3rem]"> Continue </button> 
              </div>
           </div>`
            : continueForward
            ? `            
            <div class="pt-5 pb-2 px-4">
              <div class="continue flex flex-col gap-1 items-end">
                <ul class="text-lg list-disc px-6 flex flex-col gap-2">
                  <li>You're already late, it's <b class="time-theme">11:00 am</b>.</li>
                  <li>You must finish meetings with different teams (for collaboration) before submitting the threat modelling plan at <b class="time-theme">5:00 pm. </b></li>
                  <li>You will find appropriate employees between <b class="time-theme">11:00 am</b> to <b class="time-theme">4:00 pm</b> (4:00 pm is the time you need to work on your presentation.)</li>
                  <li>Keep an eye on the timer, as you have to create your presentation at 4:00 pm and submit it at <b class="time-theme">5:00 pm</b>.</li>
                  <li>Navigate around the office by clicking the left and right arrows.</li>
                </ul>
                <div>
                <b class="text-[#eb0037] text-xl mt-2"> Caution </b>
                <p class="px-2">
                    In case you go to the wrong room (Cafe or CEO Room), an hour will be added to your time, resulting in a late submission.
                </p>
                </div>
              </div>
              <div class="btn-container-2 mt-3 continue-btn"> 
                <button class="py-[.3rem]"> Continue </button> 
              </div>
           </div>`
            : `<div class="py-5 px-5">${message}</div>`
        }
       
    </div>
</div>
  `;

  body.insertAdjacentHTML("afterbegin", html);

  mainContainer.style.filter = "blur(2px)";

  const removePopupCallback = () => {
    document.querySelector(".popup-offical").remove();
    mainContainer.style.filter = "none";
    // checking if current time is 4pm and all rooms are not visited then restart the game
    const allVisited = data.every((obj) => obj.isRoomVisited === true);

    if (currentHours == 16 && allVisited == false) {
      setTimeout(() => {
        popupOffical(
          "Late Submission",
          "Oops! It seems you are late to submit. Please restart the quiz and try again within the time limit. Good luck!",
          false,
          false,
          true,
          false,
          false
        );
      }, 500);
    }
  };

  document.querySelector(".popup-close").addEventListener("click", () => {
    if (presentation) return;
    removePopupCallback();
  });

  if (document.querySelector(".popup-remove")) {
    document.querySelector(".popup-remove").addEventListener("click", () => {
      if (presentation) return;
      removePopupCallback();
    });
  }

  if (presentation) {
    const presentationBtn = document.querySelector(".presentation-btn");
    setTimeout(() => {
      presentationBtn.style.display = "block";
      presentationBtn.addEventListener("click", () => {
        removePopupCallback();
        screenShow(3);
      });
    }, 3000);
  }

  if (nextDay) {
    const checkingEmails = document.querySelector(".checkingEmails-btn");
    checkingEmails.addEventListener("click", removePopupCallback);
  }

  if (proceed) {
    document
      .querySelector(".proceed-btn")
      .addEventListener("click", removePopupCallback);
  }
  if (continueForward) {
    document
      .querySelector(".continue-btn")
      .addEventListener("click", removePopupCallback);
  }
};

const popupOfficalFlag = (
  heading,
  message,
  isCopyText,
  refresh,
  isEmailEnding = false
) => {
  if (document.querySelector(".popup-offical")) {
    document.querySelector(".popup-offical").remove();
  }

  const html = `
  <div style="z-index:100" class="fixed top-0 left-0  w-full  min-h-screen z-100 flex justify-center items-center popup-offical overflow-hidden">
    <div class="w-[580px]  md:[666px] m-r-auto -mt-10  border rounded-lg popUp opacity-100 bg-[#151c2b] slide-bottom popup-offical-container">
      <div class="flex items-center justify-between py-3 px-5  border-b">
            <h2 class="text-2xl font-bold">${heading}</h2>
            <i class="fa-solid fa-xmark cursor-pointer text-2xl opacity-60 hover:opacity-100 popup-close" ></i>
            </div>
        <div class="py-3 px-5 flex items-center justify-between relative pt-4">
            <p>${message}</p>
         
           ${
             isCopyText
               ? `
          <div class="copy-container relative">
          <button id="copy-btn" class="cursor-pointer border-none outline-none">
               <i class="fa-solid fa-copy"></i>
               </button>
            <div id="tooltip" class="copy-tooltip">Copy</div>
            </div>
           `
               : ""
           }
              </div>
              ${
                isEmailEnding
                  ? `
                <div class="pl-4 pr-4 pb-2 flex items-center gap-4">
                  <div class="btn-container-2 w-full nextBtn ml-auto mr-auto">
                    <button onclick='refresh()' class="py-1 px-4 text-sm" style='width:100%; min-height:3rem;'>Restart the day</button>
                  </div>
                  <div class="btn-container-2 w-full nextBtn ml-auto mr-auto">
                    <button onclick='goToQuestionPhase()' class="py-1 px-4 text-sm" style='width:100%; min-height:3rem;'>Restart the Threat Modelling Plan</button>
                  </div>
                 </div>`
                  : ""
              }
        </div>
</div>
  `;

  body.insertAdjacentHTML("afterbegin", html);
  mainContainer.style.filter = "blur(2px)";

  // copy text handler.
  const copyHandler = () => {
    const textToCopy = atob("VEhNe20wZDNsbDFuZ193MXRoX1NUUjFEM30="); // Replace with the text you want to copy
    tooltip.innerHTML = "Copied!";
    navigator.clipboard.writeText(textToCopy);

    setTimeout(() => {
      tooltip.innerHTML = "Copy ";
    }, 3000);
  };
  // copy text
  if (isCopyText) {
    const copyBtn = document.getElementById("copy-btn");
    copyBtn.addEventListener("click", copyHandler);
  }

  // copy text end
  isTimer = false;
  const closeButton = () => {
    document.querySelector(".popup-offical").remove();
    mainContainer.style.filter = "none";
    if (refresh || isCopyText) window.location.reload();
  };

  // listerner to both buttons for closing modal
  const closeBtn = document.querySelectorAll(".popup-close");
  closeBtn.forEach((btn) => btn.addEventListener("click", () => closeButton()));
};

// data for both rooms details and questions for room.
const data = [
  {
    id: "room-development",
    isRoomOpen: true,
    isRoomVisited: false,
    speaker: "Lead Developer",
    title: "Development Team Room",
    image: "room-software-development.png",
    dialogue: [
      {
        title: "User",
        message:
          "Hello, can you provide an overview of the application's architecture?",
      },
      {
        title: "Lead Developer",
        message: "Sure, we have the following features:",
        lists: [
          "Registration and Authentication",
          "User Dashboard",
          "Search Functionality",
          "Payment",
        ],
      },
      {
        title: "User",
        message:
          "Got it. I’ll coordinate with the other teams to understand  more about its backend infrastructure.",
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
    dialogue: [
      {
        title: "User",
        message:
          "Hello, can you provide an overview of the e-commerce application’s cloud architecture? ",
      },
      {
        title: "System Architect",
        message:
          "Certainly. Our online banking platform leverages several AWS services to support its functionality. We utilize:",
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
        message: "Awesome, thanks for taking the time to assist me.",
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

    dialogue: [
      {
        title: "User",
        message:
          "Hi! Can you help me identify potential threats and vulnerabilities to our organization, including all of its infrastructure and our internal infrastructure?",
      },
      {
        title: "Security Engineer",
        message:
          "Our web application and its infrastructure can be targeted by threat actors with typical external attacks such as: ",
        lists: [
          "DDoS",
          "SQL injection attacks",
          "Brute-forcing of credentials",
          "Enumeration of exposed assets",
        ],
      },
      {
        title: "Security Engineer",
        message:
          "In addition, our internal network can be infiltrated with phishing attacks, containing malicious payloads that may infect our employees' workstations, and obtain our internal sensitive data.",
      },
      {
        title: "User",
        message: "Got it!",
      },
    ],
  },
  {
    id: "room-bussines-stakeholder",
    isRoomOpen: true,
    isRoomVisited: false,
    title: "Business Stakeholder Team Room",
    speaker: "Business Analyst",
    image: "room-strategic-planning.png",

    dialogue: [
      {
        title: "User",
        message:
          "What are the critical assets and processes in our e-commerce platform that we need to protect?",
      },
      {
        title: "Business Analyst",
        message: " Our top priorities are to protect our customer's",
        lists: [
          "Personal and financial data",
          "Secure our transactions processing systems",
          "Ensure the availability and integrity of our platform",
        ],
      },
      {
        title: "User",
        message: "Got it, thanks for this!",
      },
    ],
  },
  {
    id: "room-network",
    isRoomOpen: true,
    isRoomVisited: false,
    title: "Network Infrastructure Team Room",
    speaker: "Network Engineer",
    image: "room-network.png",
    dialogue: [
      {
        title: "User",
        message:
          "Can you provide some information regarding our internal network infrastructure, including the servers you maintain and workstations used by our employees?",
      },
      {
        title: "Network Engineer",
        message: "Sure, we maintain servers such as:",
        lists: [
          "Database servers",
          "Firewalls",
          "Mail servers",
          "File servers",
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
    message:
      "You are not allowed to enter this room. Get out! </br><small class='text-red-500'>An hour has been added.</small>",
  },
  {
    id: "cafe-room",
    isRoomOpen: false,
    isRoomVisited: true,
    title: "Pantry",
    speaker: "Cafe",
    message:
      "It’s good to take a break. But remember, you need to finish your work before 5 PM",
  },
];

const questionData = [
  {
    isCorrect: false,
    id: "room-development",
    title:
      "Insecure web application search functionality leading to SQL injection.",
    answer: ["Tampering", "Information Disclosure"],
    scenario:
      "A data breach incident has occurred, compromising customers' data from the e-commerce application. Immediate actions are being taken to secure transactions and ensure service availability.",
  },
  {
    isCorrect: false,
    id: "room-architecture",
    title: "Insecure AWS Infrastructure (EC2, S3, RDS) without load balancers.",
    answer: ["Information Disclosure", "Denial of Service"],
    scenario:
      "We have detected a security breach involving our AWS EC2, RDS, and S3 services. In addition, the ecommerce platform’s accessibility to the public is affected due to the denial of service attack on our cloud infrastructure. Immediate actions are being taken to secure transactions and ensure service availability.",
  },
  {
    isCorrect: false,
    id: "room-security",
    title: "Mail server with no logging enabled.",
    answer: ["Spoofing", "Repudiation"],
    scenario:
      "An ongoing phishing campaign has targeted our employees, and attackers were able to obtain internal data. Immediate actions are being taken to remediate the incident.",
  },
  {
    isCorrect: false,
    id: "room-bussines-stakeholder",
    title: "Unpatched employee workstations.",
    answer: ["Tampering", "Elevation of Privileges"],
    scenario:
      "Multiple employee workstations were compromised. Deployment of security patches is being implemented by the security team to remediate the issue.",
  },
];

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

let intervalId;
let timerStarted = false;
let currentTime = currentHours * 3600;

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

// instruction screen temp/handler
const coordinate = {
  introduction: [{ x: [236, 419], y: [163, 313] }],
  roomGate: [{ x: [58, 172], y: [162, 395] }],
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
const toggleZIndex = (elem, value = false) => {
  let zIndex = "-1";
  let display = "none";

  if (value) {
    zIndex = "100";
    // display = "block";
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
      popupOffical("Instructions", "lorem", false, false, false, false, true);
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

const InstructionsTemplates = () => {
  const html = `
  <div class="w-full m-auto h-full flex flex-col flex-1 pt-20">
      <div class="relative rounded-lg overflow-hidden introduction-container w-[640px] md:w-[666px] h-full m-auto"  onmousemove="perimeterMouseoverIntro(event)">
        <span class="absolute top-3 right-3 text-xl"> <b class="time-theme live-timer">11:00:00 am</b> </span>
        <img src="./assests/home-intro.png" class="w-full cover-image" alt=""></img>
    </div>
  </div>
    `;

  return html;
};
startTimer();
const instrcutionHandler = () => {
  const temp = InstructionsTemplates();
  mainContainer.innerHTML = "";
  mainContainer.insertAdjacentHTML("afterbegin", temp);
};

// Second screen temp/handler
let clickPrevent = false;
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

function shuffleArray(array) {
  const shuffledArray = array.slice();
  shuffledArray.sort(() => Math.random() - 0.5);
  return shuffledArray;
}

const roomImagesSlider = [
  {
    link: "software-development-5",
    alt: "software development room",
    id: "room-development",
    isRoomVisited: false,
  },
  {
    link: "system-architecture-7",
    alt: "system architecture room",
    id: "room-architecture",
    isRoomVisited: false,
  },
  {
    link: "Information-security-3",
    alt: "Information security room",
    id: "room-security",
    isRoomVisited: false,
  },

  {
    link: "strategic-planning-6",
    alt: "strategic planning room",
    id: "room-bussines-stakeholder",
    isRoomVisited: false,
  },
  {
    link: "network-infrastructure-4",
    alt: "network infrastructure room",
    id: "room-network",
    isRoomVisited: false,
  },
  {
    link: "ceo-2",
    alt: "ceo room image",
    id: "room-ceo",
    isRoomVisited: false,
  },

  {
    link: "cafe-1",
    alt: "cafe room image",
    id: "cafe-room",
    isRoomVisited: false,
  },
];

const incHour = (warn) => {
  currentHours += 1;

  if (warn) {
    document.querySelectorAll(".showingHourSlider").forEach((elem) => {
      elem.style.color = "#eb0037";
    });
    isHoursOutOfRange = true;
  }
  if (document.querySelector(".showingHourSlider")) {
    const docTime = document.querySelectorAll(".showingHourSlider");
    docTime.forEach((time) => {
      time.innerHTML = formatTime(currentTime);
    });
  }
};

function get12HourFormat(hour) {
  if (hour >= 1 && hour <= 12) {
    return hour + ":00:00 am";
  } else if (hour > 12 && hour <= 23) {
    return hour - 12 + ":00:00 pm";
  } else {
    return "Invalid hour";
  }
}

let isHoursOutOfRange = false;
const roomsSliderTemplates = () => {
  const html = `
  <div class="rounded-lg overflow-hidden slideshow-container mt-20 w-[720px] relative" onmousemove="perimeterMouseover(event)" > 
    <div class="cursor-pointer door-image absolute top-0 left-0" style="z-index:-1">
      <img class="" src="./assests/open-door.png" alt="" />
    </div> 

  ${roomImagesSlider
    .map((image, i) => {
      return `
      <div class="mySlides fade">
        <div class="numbertext">${i + 1} / 7</div>
        ${
          image.isRoomVisited
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

let slideIndex = 1;

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
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

const roomScreenHandler = () => {
  const temp = roomsSliderTemplates();
  mainContainer.innerHTML = "";
  mainContainer.insertAdjacentHTML("afterbegin", temp);
  stopTimer();
  timerStarted = false;
  startTimer();
  const allVisited = data.every((obj) => obj.isRoomVisited === true);

  if (currentHours == 16 && allVisited == true) {
    popupOffical(
      "It's presentation time!",
      "Oops, it’s already 4:00 PM. I need to finish the plan",
      true
    );
    slideIndex = 1;
  }

  if (currentHours >= 16 && allVisited == false) {
    popupOffical(
      "Late Submission",
      "Oops! It seems you are late to submit. Please restart the quiz and try again within the time limit. Good luck!",
      false,
      false,
      true,
      false,
      false
    );
  }
  showSlides(slideIndex);
};

//checking which room is clicked and needs to open.
const roomInAuth = (roomId) => {
  data.forEach((room) => {
    if (room.id === roomId) {
      if (room.isRoomOpen && room.isRoomVisited == false) {
        openRoomDetails(roomId);
      } else if (room.isRoomOpen == false) {
        popupOffical(room.speaker, room.message);
        currentTime = currentTime + 3600;
        incHour(true);
        return;
      } else {
        popupOffical(
          "Warning",
          "You already went to this room. Try to coordinate with another team."
        );
      }
    }
  });
};

/*
///////////////////////////////////////////////////
////// open room templates and handler////////////
//////////////////////////////////////////////////
*/

const options = [
  "Spoofing",
  "Tampering",
  "Repudiation",
  "Information Disclosure",
  "Denial of Service",
  "Elevation of Privileges",
];

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
        <p id="conv-${id}" class="message ml-0">${room?.message}</p>
        ${room?.lists ? dailougeListsTemplates(room.lists, id) : ""}
     </div>
    </div>
  </div>
  `;
  return html;
};

// showing rooms details which rooms are open
let isClickHandled = false;

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

  nextBtn = `
    <div class=' mt-0 p-0 flex-1 m-auto flex w-full'> 
      <button class="ml-auto" style='padding:.1rem;' id="nextButton">
        <i class="fa-solid fa-caret-down text-[#a3ea2a] hover:text-[#a3ea2a]/50" style='font-size:2rem'></i>
      </button> 
    </div>
  `;

  // Show the first dialogue initially
  renderDialogue();
};

const renderDialogue = () => {
  const dialogueContainer = document.querySelector(
    ".dailouge-container-showing"
  );
  dialogueContainer.innerHTML = "";

  dialogueContainer.insertAdjacentHTML(
    "afterbegin",
    openRoomDailougeTemplates(roomData.dialogue[showDialog], showDialog)
  );

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

    nextButton.innerHTML = "Thank you for your insights!";
    const clickHandler = () => {
      data.forEach((item) => {
        if (item.id === roomData.id) {
          item.isRoomVisited = true;
        }
      });

      roomImagesSlider.forEach((item) => {
        if (item.id === roomData.id) {
          item.isRoomVisited = true;
        }
      });

      incHour();
      currentTime = currentTime + 3600;
      slideIndex = slideIndex + 1;
      screenShow(2);
    };
    nextButton.addEventListener("click", clickHandler);
  }
};

// Assuming openRoomDailougeTemplates function is defined elsewhere

// Pre-pairing presentation screen handler/templates
let quizNo = 0;
let isQuizBtnClicked = false;
const goToQuestionPhase = () => {
  if (document.querySelector(".popup-offical")) {
    document.querySelector(".popup-offical").remove();
  }
  mainContainer.style.filter = "none";
  quizNo = 0;

  screenShow(3);
};
const questionTemplateInDailougeTemplates = (question) => {
  const html = `
  <div class="relative">
  <h3 class="text-3xl">Mark all applicable STRIDE components for each use case.</h3>
    <span class="absolute -top-4 -right-2">${quizNo + 1}/4</span>

    <h3 class="text-xl mt-12">${question.title}</h3>
    <ul class="grid grid-cols-3 gap-2 mt-6 mb-12 px-2">
      ${options
        .map(
          (opt, i) => `
        <li class="flex items-center gap-3">
        <input type="checkbox" class="opt-checkbox" id="${opt}" name="${opt}" >
        <label for="${opt}"> ${opt} </label>
        </li>
        `
        )
        .join("")}
    </ul>

    <div class="btn-container-2 w-1/2 m-auto mt-3">
      <button type="button" class="py-1 submit-btn">Submit</button>
    </div>
  </div>
  `;

  const questionContainer = document.querySelector(".question-container");
  questionContainer.innerHTML = "";
  questionContainer.insertAdjacentHTML("afterbegin", html);

  const submitButton = document.querySelector(".submit-btn");
  submitButton.addEventListener("click", () => {
    if (isQuizBtnClicked) return;
    isQuizBtnClicked = true;
    quizNo += 1;

    const allCheckboxes = document.querySelectorAll(".opt-checkbox");
    const selectedCheckboxes = Array.from(allCheckboxes).filter(
      (checkbox) => checkbox.checked
    );

    const selectedCheckboxValues = selectedCheckboxes.map(
      (checkbox) => checkbox.id
    );

    // const isAllCorrect = question.answer.every((answer) =>
    //   selectedCheckboxValues.includes(answer)
    // );
    const isAllCorrect =
      question.answer.length === selectedCheckboxValues.length &&
      question.answer.every((answer) =>
        selectedCheckboxValues.includes(answer)
      );

    questionData.forEach((q) => {
      if (q.id == question.id) {
        question.isCorrect = isAllCorrect;
      } else {
        return;
      }
    });

    // screenShow(2);
    if (quizNo == questionData.length) {
      let wrong = questionData.filter((quest) => quest.isCorrect === false);

      if (wrong.length > 1) {
        wrong = [wrong[0]];
      }

      screenShow(4);
    } else {
      questionTemplateInDailougeTemplates(questionData[quizNo]);
    }

    setTimeout(() => {
      isQuizBtnClicked = false;
    }, 300);
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
const showEndOfEmail = () => {
  popupOfficalFlag(
    "Oops",
    "There is something wrong with the Threat Modelling Plan. You need to review and apply the necessary changes.",
    false,
    false,
    true
  );
};

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
          <a class="underline" href="mailto:security@onestopshop.thm">security@onestopshop.thm</a>
        </span>
        <span class="font-light flex gap-1 items-center">
          <b class="font-bold">W:</b>
          <a class="underline" href="www.onestopshop.thm" target='_blank'>www.onestopshop.thm</a>
        </span> 
    </div>
  </div>
  <div class="btn-container-2 w-full nextBtn ml-auto mt-6 mr-auto">
    <button onclick='showEndOfEmail()' class="py-1 px-4 text-sm" style='width:50%;'>Continue</button>
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
    "Just another day at work. Let me check my emails first before doing my other tasks.",
    false,
    true
  );

  let wrong = questionData.filter((quest) => quest.isCorrect === false);
  // CHECKING HERE : there 4 questions and only showing scenario of first wrong question
  if (wrong.length > 0) {
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
      popupOfficalFlag(
        "Security Breach Incident Notification",
        showWrongScenario(wrong[0].scenario),
        false,
        true
      );
    } else {
      popupOfficalFlag(
        "Flag",
        atob("VEhNe20wZDNsbDFuZ193MXRoX1NUUjFEM30="),
        true,
        true
      );
    }
  });
};

// main handler for all modules
function modulesHandler() {
  if (screen === 1) instrcutionHandler();
  else if (screen === 2) roomScreenHandler();
  else if (screen === 3) preparingPresentation();
  else if (screen === 4) nextDayScreenHandler();
  else return;
}

modulesHandler();
