// stepper
const Driver = window.driver.js.driver;

const counter = (num) =>
  `<b class='counting text-[#212c42] absolute top-[3%] right-[9%]'>(${num}/4)</b>`;

const steps = [
  {
    element: "#blank-container",
    popover: {
      title: "Select a blank",
      description: `Please select a blank to view its corresponding options. ${counter(
        1
      )}`,
      position: "bottom",
      showPrevButton: false,
    },
  },
  {
    element: "#option-container",
    popover: {
      title: "Options",
      description: `As soon as a blank is selected, you can choose an option here. ${counter(
        2
      )}`,
      position: "bottom",
      showPrevButton: false,
    },
  },

  {
    element: "#run-btn",
    popover: {
      title: "Run the workflow",
      description: `Once the blanks are filled, you should run the workflow to see it working. ${counter(
        3
      )}`,
      position: "top",
    },
  },
  {
    element: "#packet-section",
    popover: {
      title: "Packet Tracing",
      description: `See a visualization of packet flowing in this diagram. ${counter(
        4
      )}`,
      position: "bottom",
    },
  },
];

const driver = new Driver({
  steps,
  closeBtnText: "Skip",
  nextBtnText: "Next",
  doneBtnText: "Next",
  allowClose: false,
  onNextClick: () => {
    driver.moveNext();
    if (driver.getState().activeIndex == undefined) {
      isGameRunning = true;
      playAnimation();
    }
  },
  onCloseClick: () => {
    driver.destroy();
    isGameRunning = true;
  },
});

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // Use smooth scrolling
  });
}

let runSteps = () => {
  driver.drive();
};
let closeSteps = () => {
  driver.reset();
};
// appllication
const mainContainer = document.querySelector("#main-content");
const mainHeading = document.querySelector(".heading-main");
const body = document.querySelector(".body");

let screen = 1;

const screenShow = (num) => {
  screen = num;
  modulesHandler();
};

const colors = ["#719cf9", "#9f00ff", "#525a6a", "#8ea6bf", "#1153e4"];

const options = [
  { id: 0, title: "DMZ", color: colors[0] },
  { id: 1, title: "LAN", color: colors[0] },
  { id: 2, title: "WAN", color: colors[0] },
  { id: 3, title: "drop", color: colors[1] },
  { id: 4, title: "accept", color: colors[1] },
  { id: 5, title: "Eth0.10", color: colors[2] },
  { id: 6, title: "Eth0.20", color: colors[2] },
  { id: 7, title: "Eth0.30", color: colors[2] },
  { id: 8, title: "dmz-lan", color: colors[3] },
  { id: 9, title: "dmz-wan", color: colors[3] },
  { id: 10, title: "lan-dmz", color: colors[3] },
  { id: 11, title: "lan-wan", color: colors[3] },
  { id: 12, title: "wan-dmz", color: colors[3] },
  { id: 13, title: "wan-lan", color: colors[3] },
  { id: 14, title: "http", color: colors[4] },
  { id: 15, title: "icmp", color: colors[4] },
  { id: 16, title: "tcp", color: colors[4] },
];

const blanks = [
  {
    title: "set zone-policy zone",
    options: [0, 1, 2],
    correct: 0,
    color: colors[0],
  },
  {
    title: "default-action",
    options: [3, 4],
    correct: 3,
    color: colors[1],
  },
  {
    title: "set zone-policy zone",
    options: [0, 1, 2],
    correct: 0,
    color: colors[0],
  },
  {
    title: "interface",
    options: [5, 6, 7],
    correct: 5,
    color: colors[2],
  },
  {
    title: "set zone-policy zone",
    options: [0, 1, 2],
    correct: 1,
    color: colors[0],
  },
  {
    title: "default-action",
    color: colors[1],
    options: [3, 4],
    correct: 3,
  },
  {
    title: "set zone-policy zone",
    id: "01",
    color: colors[0],
    options: [0, 1, 2],
    correct: 1,
  },
  {
    title: "interface",
    color: colors[2],
    options: [5, 6, 7],
    correct: 6,
  },
  {
    title: "set firewall name",
    color: colors[3],
    options: [8, 9, 10, 11, 12, 13],
    correct: 8,
  },
  {
    title: "description",
    color: colors[3],
    options: [8, 9, 10, 11, 12, 13],
    correct: 8,
  },
  {
    title: "set firewall name",
    color: colors[3],
    options: [8, 9, 10, 11, 12, 13],
    correct: 8,
  },
  {
    title: "default-action",
    color: colors[1],
    options: [3, 4],
    correct: 3,
  },
  {
    title: "set firewall name",
    color: colors[3],
    options: [8, 9, 10, 11, 12, 13],
    correct: 8,
  },
  {
    title: "rule 100 action",
    color: colors[1],
    options: [3, 4],
    correct: 4,
  },
  {
    title: "set firewall name",
    color: colors[3],
    options: [8, 9, 10, 11, 12, 13],
    correct: 8,
  },
  {
    title: "rule 100 protocol",
    color: colors[4],
    options: [14, 15, 16],
    correct: 14,
  },
];

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const showingBtn = (option) => {
  const { title, color, id } = option;
  return `
  <div class='btn-container '> 
    <button 
      style='width:100%; padding:0; background-color:${color}' 
      class='button-drag'
      data-id='${id}'
      onclick='transferContent("${id}", "${title}")'
      > 
         ${title} 
      </button>
  </div>`;
};

const showingBlanks = (option, index) => {
  const { title, color, correct } = option;

  return `
  <div class='w-full flex items-end gap-0'> 
    <p> ${title} </p>
    <p id='${index}' data-selected='${correct}' class='w-[50%] h-full ml-auto border-b border-[${color}] button-drop  flex items-center justify-center mb-0'> </p>
  </div>`;
};

const popupOfficalFlag = (heading, message, isCopyText, refresh, proceed) => {
  if (document.querySelector(".popup-offical")) {
    document.querySelector(".popup-offical").remove();
  }

  const instructionsHtml = `
<div>
  <p class="mt-2"> Reproduce the configuration as per the visualized packet flow. It will help you setup the correct configuration to get the flag. </p>
  <div class="flex flex-end justify-end gap-4 mt-6">
    <div class="btn-container" style="width:auto">
      <button class="proceed-btn" style="width:8rem; padding:.3rem .5rem">Continue</button>
    </div>
    <div class="btn-container " style="width:auto">
      <button class="tutorial-btn" style="width:8rem; padding:.3rem .5rem">Check tutorial</button>
    </div>
  </div>
</div>
`;

  const html = `
  <div style="z-index:100" class="fixed top-0 left-0  w-full  min-h-screen z-100 flex justify-center items-center popup-offical overflow-hidden">
  <div class="w-[580px]  md:[666px] m-r-auto -mt-10  border rounded-lg popUp opacity-100 bg-[#151c2b] slide-bottom popup-offical-container">
  <div class="flex items-center justify-between py-3 px-3  border-b">
  <h2 class="text-2xl font-bold">${heading}</h2>
            <i class="fa-solid fa-xmark cursor-pointer text-2xl opacity-60 hover:opacity-100 popup-close" ></i>
            </div>
        <div class="py-3 px-3 flex items-center justify-between relative">
        ${proceed ? instructionsHtml : ""}
        ${
          isCopyText
            ? `<p class="copy-message">${atob("VEhNe00wNXRseV81M2N1cmV9")}</p>`
            : `<p class="whitespace-pre-line">${message}</p>`
        }
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
                  refresh
                    ? `<div class="btn-container-2 p-2"> <button class="p-2 popup-close">Restart</button> </div>`
                    : ""
                }
        </div>
</div>
  `;

  body.insertAdjacentHTML("afterbegin", html);
  mainContainer.style.filter = "blur(2px)";

  // copy text handler.
  const copyHandler = () => {
    const textToCopy = atob("VEhNe00wNXRseV81M2N1cmV9"); // Replace with the text you want to copy
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
  const closeButton = (e) => {
    isGameRunning = true;
    document.querySelector(".popup-offical").remove();
    mainContainer.style.filter = "none";
    if (refresh || isCopyText) window.location.reload();
  };

  if (proceed) {
    const proceedBtn = document.querySelector(".proceed-btn");
    const tutorialBtn = document.querySelector(".tutorial-btn");
    proceedBtn.addEventListener("click", () => {
      closeButton();
      playAnimation();
    });
    tutorialBtn.addEventListener("click", () => {
      closeButton();
      isGameRunning = false;
      runSteps();
    });
  }

  // listerner to both buttons for closing modal
  const closeBtn = document.querySelectorAll(".popup-close");
  closeBtn.forEach((btn) =>
    btn.addEventListener("click", () => {
      if (proceed) playAnimation();
      closeButton();
    })
  );
};

// image flickering handler
function toggleImage() {
  const image = document.getElementById("flickeringImage");
  image.style.visibility =
    image.style.visibility === "hidden" ? "visible" : "hidden";
}

function startFlickering() {
  const interval = 200;
  let flickerCount = 0;
  const maxFlickerCount = 4;

  function handleFlickerIteration() {
    if (flickerCount < maxFlickerCount) {
      toggleImage();
      flickerCount++;
      setTimeout(handleFlickerIteration, interval);
    }
  }
  handleFlickerIteration();
}

let time = 150;
let attemp = 0;
let isGameRunning = false;

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedTime = `${minutes}min ${remainingSeconds}sec`;
  return formattedTime;
}

const authTimer = () => {
  setInterval(() => {
    if (document.querySelector(".timer") && isGameRunning) {
      const timer = document.querySelector(".timer");
      time = time - 1;
      timer.innerHTML = formatTime(time);
      if (time == 0) {
        isGameRunning = false;
        popupOfficalFlag(
          "GameOver!",
          "You are out of time. Please restart.",
          false,
          true,
          false
        );
      }
    }
  }, 1000);
};
authTimer();

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

let isHttp = true;
const animationTemplates = (isFirstFlow) => {
  isHttp = !isHttp;
  let colorCode = isHttp ? "#a3ea2a" : "#eb0037";
  let className = isFirstFlow ? "drop-to-firewall" : "moving-element";

  // using this condition we can drop the http packet when LAN flow performing.
  if (isFirstFlow == false && isHttp==false) className = "drop-to-firewall";

  let html = `
    <span class="absolute ${className}">
      <p class="w-[15px] h-[15px] bg-[${colorCode}] rounded-full"></p>
    </span>
  `;

  if (document.querySelector(".movement-animations")) {
    document
      .querySelector(".movement-animations")
      .insertAdjacentHTML("afterbegin", html);
  }
};

let timeOut;
const runFlow = (isWanFlow) => {
  if (timeOut) clearInterval(timeOut);
  const moveToDoc = document.querySelector(".packets-moves-to");

  if (isWanFlow) {
    isWanFlow = timeOut = setInterval(() => {
      animationTemplates(true);
    }, 1000);
    moveToDoc.innerHTML = "WAN";
    return;
  }

  timeOut = setInterval(() => {
    animationTemplates(false);
  }, 1000);
  moveToDoc.innerHTML = "LAN";
};

// The HTTP/TCP packets flow animation.
let isFlowFirst = false;
const playAnimation = () => {
  if (timeOut) clearInterval(timeOut);

  isFlowFirst = !isFlowFirst;
  isFlowFirst ? runFlow(true) : runFlow(false);

  setInterval(() => {
    isFlowFirst = !isFlowFirst;

    // the animation play each 5s
    if (isFlowFirst) {
      /*
        In 1st flow the aniamtion typo is : WAN 
        The packets will move from DMZ to WAN
        The packets will droped at firewall
      */
      runFlow(true);
    } else {
      /*
        In 2nd flow the aniamtion typo is : LAN 
        The packets will move from DMZ to LAN
        The packets will droped at firewall
      */
      runFlow(false);
    }
  }, 5000);
};

const firstScreenTemplates = (option, showOption) => {
  return `
  <div class="w-[640px] lg:w-[660px] lg:w-1/2 m-auto"> 
    <div class="flex items-center justify-center mt-4 gap-6">
      <p class="bg-[#a3ea2a] text-black font-bold px-4 rounded-lg"> DMZ </p>
      <i class="fa-solid fa-arrow-right"></i>
      <p class="bg-[#a3ea2a] text-black font-bold px-4 rounded-lg packets-moves-to"> WAN </p>
    </div>
    <div class="w-full h-[40vh] relative mb-8 mt-4" id="packet-section"> 
      <img src="./assest/cover-image.png" alt="" id="flickeringImage" class=" w-full h-full object-contain" />
      
      <div class="absolute left-0 bottom-4 flex flex-col gap-1"> 
        <span class="flex items-center gap-2">
          <p class="w-[15px] h-[15px] bg-[#a3ea2a] rounded-full"></p>
          <p class="font-bold text-lg text-[#a3ea2a]">HTTP</p>
        </span>
        <span class="flex items-center gap-2">
          <p class="w-[15px] h-[15px] bg-[#eb0037] rounded-full"></p>
          <p class="font-bold text-lg text-[#eb0037]">TCP</p>
        </span>
      </div>

      <div 
        class="w-[10rem] h-[10rem] absolute top-[50%] left-[50%] 
        translate-x-[-50%] translate-y-[-50%] rotate-[45deg] movement-animations">
      </div>


    </div>

    <div class="flex justify-between">
      <span data-tooltip="Remaining time" class="tooltip">Time : <b class="timer">2min 30sec</b> </span>
      <span data-tooltip="Remaining Attempts" class="tooltip">Remaining Attempts : (<b class="remaining-attemp"> 0/3 </b>) </span>
    </div>

    <div class="text-white mt-4 mb-8" id="option-container">
      <p class='text-2xl text-center'>Please select a blank to view its corresponding options.</p>
    </div>

    <div class="text-white mt-2 grid grid-cols-2 gap-y-4 gap-x-[1rem] lg:gap-x-[4%] mb-8" id="blank-container">
    ${blanks.map((option, i) => showingBlanks(option, i)).join("")}
    </div>

    <div class="btn-container mb-12 ">
      <button class="run-btn  run-not-allowed" id="run-btn"  style="font-size:1.4rem; width:10rem; padding:0%;">Run</button>
    </div>
  </div>
  `;
};

const firstScreenHandler = () => {
  mainContainer.innerHTML = "";
  mainContainer.insertAdjacentHTML("afterbegin", firstScreenTemplates());

  const allDropAbleButton = document.querySelectorAll(".button-drop");

  focusBlankHandler(allDropAbleButton);

  popupOfficalFlag("Instructions", "", false, false, true);
  const runBtn = document.querySelector(".run-btn");
  runBtn.addEventListener("click", checkRunHandler);
};

// showing crossesponding buttons respectively
const showBtnCorresponding = (index) => {
  const blank = blanks.find((blank, i) => i == index);
  const optionIds = blank.options || [];
  const _options = options.filter((opt) => optionIds.includes(opt.id));

  const btnsContainer = document.querySelector("#option-container");

  // checking if there are optionsFields then rendering the buttons
  if (_options.length > 0) {
    let html = `
    ${
      _options &&
      shuffleArray(_options)
        .map((option, i) => showingBtn(option))
        .join("")
    }
    `;

    btnsContainer.innerHTML = html;
    btnsContainer.classList.add("showing-btn-container");
  }
};

// will focus on the blanks
const focusBlankHandler = (allDropAbleButton) => {
  allDropAbleButton.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      deSelectBlanksHandler(allDropAbleButton);
      activeOptionId = btn.id;
      const colorBg = blanks.find((blank, i) => i == btn.id);
      btn.style.backgroundColor = colorBg.color;
      btn.classList.add("rounded-lg");
      showBtnCorresponding(activeOptionId);
    });
  });
};

let activeOptionId = undefined;
const deSelectBlanksHandler = (allDropAbleButton) => {
  allDropAbleButton.forEach((btn, i) => {
    btn.style.backgroundColor = "transparent";
    activeOptionId = undefined;
    btn.classList.remove("rounded-lg");
  });
};

const transferContent = (id, title) => {
  const focusedElement = document.getElementById(`${activeOptionId}`);
  focusedElement.innerHTML = title;
  focusedElement.classList.add("added-content");
  focusedElement.parentElement.classList.remove("not-auth");
  focusedElement.dataset.selected = id;
  const runBtn = document.querySelector(".run-btn");
  const allFilledBlanks = document.querySelectorAll(".added-content");

  if (allFilledBlanks.length != 16 || allFilledBlanks.length < 16) return;
  runBtn.classList.remove("run-not-allowed");
};

const checkingImageFlickeringAndBtn = (isAllDroped, e) => {
  startFlickering(e.target);
  isGameRunning = false;
  const attempDoc = document.querySelector(".remaining-attemp");
  attemp = attemp + 1;
  attempDoc.innerHTML = attemp + "/3";

  if (attemp == 3) {
    popupOfficalFlag(
      "Game Over!",
      "You have used all your attempts. Please restart.",
      false,
      true,
      false
    );
    isGameRunning = false;
    return;
  }

  popupOfficalFlag(
    "Warning",
    `You have ${3 - attemp} remaining ${
      3 - attemp > 1 ? "attempts" : "attempt"
    }.`,
    false,
    false,
    false
  );
  isGameRunning = false;
};

const compareAndAddAuth = (compare) => {
  const comapred = [];

  compare.forEach((answer, index) => {
    const blank = blanks[index];
    comapred.push(answer === blank.correct);
  });

  return comapred;
};

const selectWrongBlanks = (result) => {
  result.forEach((option, i) => {
    const blanks = document.getElementById(`${i}`);
    if (!option) {
      blanks.parentElement.classList.add("not-auth");
    } else {
      blanks.parentElement.classList.remove("not-auth");
    }
  });
};

const checkRunHandler = (e) => {
  if (e.target.classList.contains("run-not-allowed")) return;
  const insertData = [];

  // checking if all the buttons are already dropped
  const allBlanks = document.querySelectorAll(".button-drop");
  const allFilledBlanks = [...allBlanks].every((el) =>
    el.classList.contains("added-content")
  );

  // converting data to array format to variable insertData
  allFilledBlanks &&
    allBlanks.forEach((el) => insertData.push(+el.dataset.selected));

  const result = compareAndAddAuth(insertData);
  const isAllCorrect = result.every((item) => item);

  if (isAllCorrect) {
    scrollToTop();
    isGameRunning = false;
    setTimeout(() => {
      popupOfficalFlag("Flag", "", true, true, false);
    }, 3000);
  } else {
    checkingImageFlickeringAndBtn(false, e);
    selectWrongBlanks(result);
  }
  return;
};

// main handler for all modules
function modulesHandler() {
  if (screen === 1) firstScreenHandler();
  else return;
}

modulesHandler();
