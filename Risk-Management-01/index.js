const mainContainer = document.querySelector("#main-content");
const body = document.querySelector(".body");
const instructions =
  "You have five minutes to answer each question. Read carefully and select the correct answer. Good luck!";

const data = [
  {
    id: "1",
    asset: "Laptop",
    risk: "Theft from office",
    assestValue: 2000,
    valueEF: "100%",
    aro: "0.1",
    safeguard: "Laptop lock and security",
    costSafeguard: "50",
    efAfterSafeguard: "0%",
    answer: "Implement Safeguard",
    isCorrect: null,
    image: "laptop.svg",
  },
  {
    id: "2",
    asset: "Laptop",
    risk: "Theft outside office",
    assestValue: 2000,
    valueEF: "100%",
    aro: "0.5",
    safeguard: "Encryption",
    costSafeguard: "20",
    efAfterSafeguard: "50%",
    answer: "Implement Safeguard",
    isCorrect: null,
    image: "laptop.svg",
  },
  {
    id: "3",
    asset: "Laptop",
    risk: "Malware",
    assestValue: 2000,
    valueEF: "50%",
    aro: "2",
    safeguard: "Antivirus license",
    costSafeguard: "20",
    efAfterSafeguard: "10%",
    answer: "Implement Safeguard",
    isCorrect: null,
    image: "laptop.svg",
  },
  {
    id: "4",
    asset: "Smart Phone",
    risk: "Theft",
    assestValue: 1000,
    valueEF: "100%",
    aro: "0.5",
    safeguard: "Encryption",
    costSafeguard: "20",
    efAfterSafeguard: "1%",
    answer: "Implement Safeguard",
    isCorrect: null,
    image: "phone.svg",
  },
  {
    id: "5",
    asset: "Server",
    risk: "Disk failure",
    assestValue: 10000,
    valueEF: "25%",
    aro: "0.35",
    safeguard: "RAID",
    costSafeguard: "70",
    efAfterSafeguard: "0%",
    answer: "Implement Safeguard",
    isCorrect: null,
    image: "server.svg",
  },
  {
    id: "6",
    asset: "Server",
    risk: "Power supply failure",
    assestValue: 10000,
    valueEF: "25%",
    aro: "0.35",
    safeguard: "Hot Standby",
    costSafeguard: "400",
    efAfterSafeguard: "0%",
    answer: "Implement Safeguard",
    isCorrect: null,
    image: "server.svg",
  },
  {
    id: "7",
    asset: "Laptop",
    risk: "Fall",
    assestValue: 2000,
    valueEF: "50%",
    aro: "0.25",
    safeguard: "Rugged laptop",
    costSafeguard: "1500",
    efAfterSafeguard: "10%",
    answer: "Decline Safeguard",
    isCorrect: null,
    image: "laptop.svg",
  },
  {
    id: "8",
    asset: "Smart Phone",
    risk: "Malware",
    assestValue: 1000,
    valueEF: "5%",
    aro: "0.25",
    safeguard: "Antivirus license",
    costSafeguard: "50",
    efAfterSafeguard: "1%",
    answer: "Decline Safeguard",
    isCorrect: null,
    image: "phone.svg",
  },
  {
    id: "9",
    asset: "Server",
    risk: "Natural disaster",
    assestValue: 10000,
    valueEF: "100%",
    aro: "0.2",
    safeguard: "Standby server",
    costSafeguard: "3000",
    efAfterSafeguard: "0%",
    answer: "Decline Safeguard",
    isCorrect: null,
    image: "server.svg",
  },
];
let screen = 1;

const screenShow = num => {
  screen = num;
  modulesHandler();
};

const popupOfficalFlag = (heading, message, isCopyText, refresh, proceed) => {
  if (document.querySelector(".popup-offical")) {
    document.querySelector(".popup-offical").remove();
  }

  const html = `
  <div style="z-index:100" class="fixed top-0 left-0  w-full  min-h-screen z-100 flex justify-center items-center popup-offical overflow-hidden">
  <div class="w-[580px]  md:[666px] m-r-auto -mt-10  border rounded-lg popUp opacity-100 bg-[#151c2b] slide-bottom popup-offical-container">
  <div class="flex items-center justify-between py-3 px-5  border-b ">
  <h2 class="text-2xl font-bold ">${heading}</h2>
            <i class="fa-solid fa-xmark cursor-pointer text-2xl opacity-60 hover:opacity-100 popup-close" ></i>
            </div>
        <div class="py-3 px-5 flex items-center justify-between relative pt-4">
        ${
          isCopyText
            ? `<p class="copy-message">${atob(
                "VEhNe0V4Y2VsbGVudF9SaXNrX01hbmFnZW1lbnR9"
              )}</p>`
            : `<p class="whitespace-pre-line">${message}</p>`
        }
           ${
             isCopyText
               ? `
          <div class="copy-container">
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
                  refresh
                    ? `<div class="btn-container p-2"> <button class="p-2 popup-close">Restart</button> </div>`
                    : ""
                }
                ${
                  proceed
                    ? `<div class="btn-container p-2"> <button class="p-2 popup-close">Let's Proceed!</button> </div>`
                    : ""
                }
        </div>
</div>
  `;

  body.insertAdjacentHTML("afterbegin", html);
  mainContainer.style.filter = "blur(2px)";

  if (refresh) authTime = false;
  // copy text handler.
  const copyHandler = () => {
    const textToCopy = atob(
      "VEhNe0V4Y2VsbGVudF9SaXNrX01hbmFnZW1lbnR9"
    );
    tooltip.innerHTML = "Copied!";
    navigator.clipboard.writeText(textToCopy);

    setTimeout(() => {
      tooltip.tooltip.innerHTML = "copy ";
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
    if (proceed) authTime = true;

    document.querySelector(".popup-offical").remove();
    mainContainer.style.filter = "none";
    authQuiz = true;
    authClick = true;
    if (refresh || isCopyText) window.location.reload();
  };

  // listerner to both buttons for closing modal
  const closeBtn = document.querySelectorAll(".popup-close");
  closeBtn.forEach(btn => btn.addEventListener("click", () => closeButton()));
};

const quizTimerSectionTemplates = time => {
  return `
  <div class="w-full m-auto mt-8 flex items-center justify-center justify-between gap-20">
    <span class="flex items-center gap-3 tooltip" data-tooltip="Remaining time">
        <b>Time</b>
        <p class="timer">5 min</p>
    </span>
    <span class="flex items-center gap-3 tooltip" data-tooltip="Question">
      <b>Question</b>
      <p>${quizNo + 1}/3</p>
    </span>
  </div>
  `;
};

const quizOptionButtons = () => {
  return `
<div class="w-[610px] md:w-[690px] m-auto mt-8 flex items-center justify-between gap-20 quiz-btn">
  <button class="answer-btn implement">Implement Safeguard</button>
  <button class="answer-btn decline">Decline Safeguard</button>
</div>
  `;
};
// Second screen temp/handler
const secondScreenTemp = data => {
  const html = `
  <div class="w-[610px] md:w-[690px] m-auto h-full flex flex-col flex-1 pt-12 ">
      ${quizTimerSectionTemplates(time)}
      <div class="w-full m-auto mt-8 flex items-center justify-between">
        <div class="flex green-text flex-col gap-1">
        <span class="flex items-center gap-3">
            <b class="text-[text-[1.2rem]]">Asset:</b>
            <p>${data?.asset}</p>
          </span>
        <span class="flex items-center gap-3">
          <b class="text-[text-[1.2rem]]">Risk:</b>
          <p>${data?.risk}</p>
        </span>
        <span class="flex items-center gap-3">
          <b class="text-[text-[1.2rem]]">Asset value:</b>
          <p>${data?.assestValue}</p>
        </span>
        <span class="flex items-center gap-3">
          <b class="text-[text-[1.2rem]]">EF:</b>
          <p>${data?.valueEF}</p>
      </span>
      <span class="flex items-center gap-3">
          <b class="text-[text-[1.2rem]]">ARO:</b>
          <p>${data?.aro}</p>
      </span>
      </br>
      <span class="flex items-center gap-3">
        <b class="text-[text-[1.2rem]]">Safeguard:</b>
        <p>${data?.safeguard}</p>
      </span>
      <span class="flex items-center gap-3">
        <b class="text-[text-[1.2rem]]"> Cost of Safeguard:</b>
        <p>$${data?.costSafeguard}</p>
      </span>
      <span class="flex items-center gap-3">
        <b class="text-[text-[1.2rem]]"> EF after Safeguard:</b>
        <p>${data?.efAfterSafeguard}</p>
      </span>

        </div>
        <div class="">
          <img src="./assets/${
            data.image
          }" alt="question-image"  class="w-[250px] h-[250px] object-fit"/>
        </div>
      </div>
    ${quizOptionButtons()}
  </div>
      `;

  return html;
};

let quizNo = 0;
let time = 300;
let authTime = false;
let correct = 0;
let authQuiz = false;
let authClick = false;

function formatTime(timeInSeconds) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;

  if (minutes > 0) {
    if (seconds > 0) {
      return `${minutes} min ${seconds} sec`;
    } else {
      return `${minutes} min`;
    }
  } else {
    return `${seconds} sec`;
  }
}

const authTimer = () => {
  setInterval(() => {
    if (authTime == false) return;
    if (time == 1) {
      popupOfficalFlag(
        "Game over",
        "Time's up! Your session has expired. Feel free to restart the quiz and give it another try. Good luck!",
        false,
        true,
        false
      );
    }
    if (!authQuiz || time < 1) return;
    time = time - 1;
    const timeDoc = document.querySelector(".timer");
    timeDoc.innerHTML = "";
    timeDoc.innerHTML = `${formatTime(time)}`;
  }, 1000);
};
authTimer();

function getRandomValuesTwo(array) {
  const randomIndex1 = Math.floor(Math.random() * array.length);
  let randomIndex2 = Math.floor(Math.random() * array.length);

  while (randomIndex2 === randomIndex1) {
    randomIndex2 = Math.floor(Math.random() * array.length);
  }

  const randomValues = [array[randomIndex1], array[randomIndex2]];
  return randomValues;
}
function getRandomValuesOne(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}
function randomizeArray(array) {
  const newArray = [...array]; // Create a new array to avoid modifying the original array

  for (let i = newArray.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[randomIndex]] = [newArray[randomIndex], newArray[i]];
  }

  return newArray;
}

const firstTwoFromSix = getRandomValuesTwo(data.slice(0, 6));
const lastOneFromThree = getRandomValuesOne(data.slice(6, data.length));
const mainData = randomizeArray([...firstTwoFromSix, lastOneFromThree]);

const quizHandler = () => {
  const temp = secondScreenTemp(mainData[quizNo]);

  mainContainer.innerHTML = "";
  mainContainer.insertAdjacentHTML("afterbegin", temp);

  const answerBtns = document.querySelectorAll(".answer-btn");

  answerBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      if (!authClick) return;
      authClick = false;

      if (mainData[quizNo].answer == btn.innerHTML) {
        correct = correct + 1;
        mainData[quizNo].isCorrect = true;
      } else {
        mainData[quizNo].isCorrect = false;
      }

      quizNo = quizNo + 1;
      if (quizNo == mainData.length || quizNo > mainData.length) {
        const allCorrects = mainData.map(d => d.isCorrect);
        const eachCorrect = allCorrects.every(elemm => elemm == true);

        if (eachCorrect) {
          popupOfficalFlag("Flag", "message", true, true, false);
          return;
        } else {
          popupOfficalFlag(
            "Failed",
            "You didn't answer correctly. Please restart and try again.",
            false,
            true,
            false
          );
          return;
        }
      }
      setTimeout(() => {
        quizHandler();
        authClick = true;
      }, 300);

      time = 300;
    });
  });
};
const secondScreenHandler = () => {
  authQuiz = true;
  authClick = true;
  popupOfficalFlag("Welcome to the Quiz!", instructions, false, false, true);
  quizHandler();
};

// main handler for all modules
secondScreenHandler();
