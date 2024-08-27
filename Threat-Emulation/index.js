const body = document.querySelector(".body");
const mainContainer = document.querySelector("#main-content");
const mainHeading = document.querySelector(".heading-main");
const subHeading = document.querySelector(".subHeading");

const instruction =
  "There are <b>two</b> rounds, each round comprising of <b>three</b> questions related to a specific attack strategy that is being implemented. You have an option to utilize a <b class='bg-white text-black px-1 rounded'>Special Ability Play</b> that will have more impact and help complete the exercise quicker.";
const PER_ROUND_TIME = 30;

// total data from attacker to defender perspective.
const data = {
  round1: {
    name: "Emulating FIN7 APT",
    questions: [
      {
        title:
          "Assuming you're emulating Carbon Spider, what will you use to achieve Execution Techniques?",
        mainOptions: [
          {
            option: "Cron",
            demage: 10,
          },
          {
            option: "AppleScript",
            demage: 10,
          },
          {
            option: "Windows Command Shell",
            demage: 30,
          },
          {
            option: "Windows Management Instrumentation",
            demage: 10,
          },
        ],
        answer: "Windows Command Shell",
        reward: 30,
      },
      {
        title:
          "While emulating Carbon Spider, what would be used to achieve persistence?",
        mainOptions: [
          { option: "Scheduled Task ", demage: 30 },
          { option: "Launch Daemon ", demage: 10 },
          { option: "Windows Service ", demage: 10 },
          { option: "Login Items ", demage: 10 },
        ],
        answer: "Scheduled Task ",
        reward: 30,
      },
      {
        title:
          "There is a POS Malware that Carbon Spider has been known to use to harvest credit card data. What is it?",
        mainOptions: [
          { option: "VB Flash", demage: 10 },
          { option: "Pillowmint", demage: 30 },
          { option: "Windows Service", demage: 10 },
          { option: "KillACK", demage: 10 },
        ],
        answer: "Pillowmint",
        reward: 20,
      },
    ],
    specialAbility: {
      title: "FIN7’s ransomware program is",
      mainOptions: [
        {
          option: "Darkside",
          demage: 50,
        },
        {
          option: "Revil",
          demage: 50,
        },
        {
          option: "Blackmatter",
          demage: 50,
        },
        {
          option: "KillACK",
          demage: 50,
        },
      ],
      answer: "Darkside",
    },
  },
  round2: {
    name: "Emulating Reaper APT",
    questions: [
      {
        title:
          "Assuming you're emulating Reaper, what will you use to achieve Initial Access Techniques?",
        mainOptions: [
          {
            option: "Spear phishing ",
            demage: 10,
          },
          {
            option: "Drive-by Compromise",
            demage: 30,
          },
          {
            option: "Supply Chain Compromise",
            demage: 10,
          },
          {
            option: "Windows Management Instrumentation",
            demage: 10,
          },
        ],
        answer: "Drive-by Compromise",
        reward: 30,
      },
      {
        title:
          "Reaper's Command and Control plan utilises DOGCALL malware. Which platform would be used to deploy it?",
        mainOptions: [
          {
            option: "AOL Messenger",
            demage: 10,
          },
          {
            option: "Dropbox",
            demage: 30,
          },
          {
            option: "pCloud",
            demage: 10,
          },
          {
            option: "OneDrive",
            demage: 10,
          },
        ],
        answer: "Dropbox",
        reward: 30,
      },
      {
        title:
          "If you were Reaper, which defence evasion technique would you use to hide information?",
        mainOptions: [
          {
            option: "Steganography",
            demage: 30,
          },
          {
            option: "Software Packing",
            demage: 10,
          },
          {
            option: "Binary Padding",
            demage: 10,
          },
          {
            option: "Compile after Delivery",
            demage: 10,
          },
        ],
        answer: "Steganography",
        reward: 30,
      },
    ],
    specialAbility: {
      title: "Initial zero day abused by Reaper was on the software",
      mainOptions: [
        {
          option: "Adobe Flash",
          demage: 50,
        },
        {
          option: "Dropbox",
          demage: 50,
        },
        {
          option: "pCloud",
          demage: 50,
        },
        {
          option: "Binary Padding",
          demage: 50,
        },
      ],
      answer: "Adobe Flash",
      reward: 50,
    },
  },
};

// popup for showing round no
const closeRoundPopup = () => {
  document.querySelector(".popup-offical").remove();
  mainContainer.style.filter = "none";
  isTimer = true;
  isMove = true;
  isMoveShowQuestion = false;
};
const popupShowRound = () => {
  if (document.querySelector(".popup-offical")) {
    document.querySelector(".popup-offical").remove();
  }

  let message;
  if (roundNo == 1) {
    message = "Round 1";
    subHeading.innerHTML = message;
  }
  if (roundNo == 2) {
    message = "Round 2";
    subHeading.innerHTML = message;
  }

  const html = `
  <div class="fixed top-0 left-0  w-full  min-h-screen z-100 flex justify-center items-center   popup-offical overflow-hidden">
    <div class="w-[580px]  md:[666px] m-r-auto -mt-10  border rounded-lg popUp opacity-100 bg-[#151c2b] slide-bottom popup-offical-container">
        <div class="flex items-center justify-end p-3 ">
            <i onClick='closeRoundPopup()' class="fa-solid fa-xmark cursor-pointer text-2xl opacity-60 hover:opacity-100 popup-close" ></i>
        </div>
        <div class=" flex justify-between relative -mt-6 flex-col">
          <h3 class="px-12 pb-14 pt-8 text-center text-[#a3ea2a] text-3xl">${message}</h3>
        </div>
    </div>
</div>
  `;

  body.insertAdjacentHTML("afterbegin", html);
  mainContainer.style.filter = "blur(2px)";

  const attackerHealth = document.querySelector(".player-1-health");
  const defensiveHealth = document.querySelector(".player-2-health");
  attackerHealth.style.width = "100%";
  defensiveHealth.style.width = "100%";
};

// offical popup flag
const popupOfficalFlag = (
  heading,
  message,
  roundShow,
  isCopyText,
  isProceed
) => {
  if (document.querySelector(".popup-offical")) {
    document.querySelector(".popup-offical").remove();
  }

  const html = `
  <div class="fixed top-0 left-0  w-full  min-h-screen z-100 flex justify-center items-center popup-offical overflow-hidden">
  <div class="w-[580px]  md:[666px] m-r-auto -mt-10  border rounded-lg popUp opacity-100 bg-[#151c2b] slide-bottom popup-offical-container">
  <div class="flex items-center justify-between py-3 px-5  border-b">
  <h2 class="text-2xl font-bold">${heading}</h2>
            <i class="fa-solid fa-xmark cursor-pointer text-2xl opacity-60 hover:opacity-100 popup-close" ></i>
            </div>
        <div class="py-3 px-5 flex items-center justify-between relative pt-4">
        ${
          isCopyText
            ? `<p>${atob("VEhNe0M0UkIwTl8kUDFEM1JfMSRfRjFON30=")}</p>`
            : `<p>${message}</p>`
        }
           ${
             isCopyText
               ? `
          <div class="copy-container">
          <button id="copy-btn" class="cursor-pointer border-none outline-none">
               <i class="fa-solid fa-copy"></i>
               </button>
            <div id="tooltip">Copy</div>
            </div>
           `
               : ""
           }
              </div>
              ${
                isProceed
                  ? `
             <div class="btn-container-2 pb-4 px-5 ">
             <button  class="cursor-pointer proceed-btn border-none outline-none" >
             Let's proceed!
            </button>
            </div>
           `
                  : ""
              }
              </div>
</div>
  `;

  body.insertAdjacentHTML("afterbegin", html);
  mainContainer.style.filter = "blur(2px)";

  // copy text handler.
  const copyHandler = () => {
    const textToCopy = atob(message); // Replace with the text you want to copy
    tooltip.innerHTML = "Copied!";
    navigator.clipboard.writeText(textToCopy);

    setTimeout(() => {
      tooltip.innerHTML = "copy ";
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

    if (roundShow) {
      isTimer = false;
      setTimeout(() => {
        popupShowRound();
      }, 100);
    }
  };

  // listerner to both buttons for closing modal
  const closeBtn = document.querySelector(".popup-close");
  closeBtn.addEventListener("click", () => closeButton());
  if (document.querySelector(".proceed-btn"))
    document
      .querySelector(".proceed-btn")
      .addEventListener("click", () => closeButton());
};

// reload fun
const reload = () => window.location.reload();

// reseting state after losing the game
const resetingState = () => {
  document.querySelector(".popup-offical").remove();
  mainContainer.style.filter = "none";
  quizNo = 1;
  roundNo = roundNo;
  time = PER_ROUND_TIME;
  isTimer = true;
  gameStart = true;
  isMove = true;
  isMoveShowQuestion = false;
  popupOfficalFlag("Instructions", instruction, true, false, true);
  runQuiz();
};

// offical game over popup
const popupGameOver = (heading, message) => {
  if (document.querySelector(".popup-offical")) {
    document.querySelector(".popup-offical").remove();
  }

  if (timeoutID) clearTimeout(timeoutID);

  isTimer = false;
  gameStart = false;
  isMove = false;
  isMoveShowQuestion = false;
  shuffleQuestion = true;
  document.querySelector(".move-div").style.display = "none";

  const html = `
  <div class="fixed top-0 left-0  w-full  min-h-screen z-100 flex justify-center items-center   popup-offical overflow-hidden">
    <div class="w-[580px]  md:[666px] m-r-auto -mt-10  border rounded-lg popUp opacity-100 bg-[#151c2b] slide-bottom popup-offical-container">
        <div class="flex items-center justify-between py-3 px-5  border-b">
            <h2 class="text-2xl font-bold">${heading}</h2>
            <i class="fa-solid fa-xmark cursor-pointer text-2xl opacity-60 hover:opacity-100 popup-close" ></i>
        </div>
        <div class="  flex  justify-between relative p-2 flex-col">
          <p class="px-5">${message}</p>
        <div class="btn-container-2 w-full mt-3">
           <button onClick="resetingState()">Restart</button>
        </div>
        </div>
    </div>
</div>
  `;

  body.insertAdjacentHTML("afterbegin", html);
  mainContainer.style.filter = "blur(2px)";

  const attackerHealth = document.querySelector(".player-1-health");
  const defensiveHealth = document.querySelector(".player-2-health");
  attackerHealth.style.width = "100%";
  defensiveHealth.style.width = "100%";

  document
    .querySelector(".popup-close")
    .addEventListener("click", resetingState);
};

// verifing the given time.
function verifyTimer(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

// quiz button templates
const quizBtnTemp = (option, reward, specifial) => {
  return `
      <div class="btn-container-2 flex">
          <button class="answer-${
            specifial ? "btn-2" : "btn"
          }" data-id="${reward}">${option}</button>
      </div>  
  `;
};

// reseting background color of button
const btnBackgroundStyleHandler = (btn) => (btn.style.background = "#525a6a");

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/*///////////////////////
    starting the quiz
///////////////////////*/

let quizNo = 1;
let roundNo = 1;
let time = PER_ROUND_TIME;
let isTimer = false;
let gameStart = true;
let isMove = false;
let isMoveShowQuestion = false;
let shuffleQuestion = false;

// last wining screen.
const winingHandler = () => {
  mainHeading.innerHTML = "Congratulations on Emulating the Attacks";
  mainContainer.innerHTML = "";
  const html = `
      <div class="w-full h-[70vh]">
         <div class="wining-animation -mt-12"></div>
          <div class="flex items-center justify-center  flex-col">
            <b class="text-xl mt-4 mb-4">Flag</b>
            <div class="flex items-center justify-center gap-4">
                <p>${atob("VEhNezMkUDFPTjRHM19GMFJfUjM0UDNSfQ==")}<p/>
                <div class="copy-container relative">
                  <button id="copy-btn" class="cursor-pointer border-none outline-none">
                    <i class="fa-solid fa-copy"></i>
                  </button>
                  <div id="tooltip">Copy</div>
                  </div>
            </div>
          </div>
      </div

  `;
  mainContainer.insertAdjacentHTML("afterbegin", html);

  // copy tooltip
  const copyBtn = document.getElementById("copy-btn");

  const tooltip = document.getElementById("tooltip");
  subHeading.innerHTML = " ";

  // decoding handler on click message.
  const text = atob("VEhNezMkUDFPTjRHM19GMFJfUjM0UDNSfQ==");
  // handler for copy button.
  copyBtn.addEventListener("click", () => {
    const textToCopy = text; // Replace with the text you want to copy
    tooltip.innerHTML = "Copied!";
    navigator.clipboard.writeText(textToCopy);
    setTimeout(() => (tooltip.innerHTML = "copy "), 3000);
  });

  // copy tooltip end

  const winingDoc = document.querySelectorAll(".wining-animation");
  winingDoc.forEach((elem) => {
    while (elem.firstChild) {
      elem.removeChild(elem.firstChild);
    }
  });
  bodymovin.loadAnimation({
    container: winingDoc[0],
    renderer: "svg",
    loop: false,
    autoplay: true,
    path: animationsData.crowd.url,
  });
};

// show flag based on round no
const showWinFlags = async () => {
  if (roundNo == 1) {
    popupOfficalFlag(
      "Flag",
      "VEhNe0M0UkIwTl8kUDFEM1JfMSRfRjFON30=",
      true,
      true
    );
  } else if (roundNo == 2) {
    isMove = false;
    isMoveShowQuestion = false;
    document.querySelector(".move-div").style.display = "none";
    winingHandler();
    await verifyTimer(2000);
  }
};

// actively checking health && showing wining flags && changing state for round/presp
let isStateUpdate = false;
const settingStateCheckingAuthWinFlag = async (state, optionResult) => {
  const { player1: player1Stats, player2: player2Stats } = state;

  const { player: player1, ...player1Setting } = player1Stats;
  const { player: player2, ...player2Setting } = player2Stats;

  isStateUpdate = false;

  if (optionResult == true) {
    const { previousWidth, winPercentage } = player1Setting;
    player2.style.width = `${previousWidth - winPercentage}%`;

    if (previousWidth < winPercentage || player2.style.width == "0%") {
      player2.style.width = "0%";
      await verifyTimer(1000);

      await showWinFlags();
      isStateUpdate = true;
    }
  } else if (optionResult == false) {
    const { previousWidth, losePercentage } = player2Setting;

    let width = previousWidth - losePercentage;
    player1.style.width = `${width}%`;

    if (width <= 0) {
      player1.style.width = `0%`;
      await verifyTimer(1000);
      popupGameOver("Game Over", "You are out of time. Please restart");
    }
  }

  // time delay for button bg color updation effect.
  await verifyTimer(500);

  isEventDone = true;
  //   round 1 to round 2
  if (roundNo == 1 && isStateUpdate) {
    roundNo = roundNo + 1;
    quizNo = 1;
    time = PER_ROUND_TIME;
    runQuiz();
    return;
  }
};

// handler to click on main buttons
let winPercentage, losePercentage, optionResult;
let isEventDone = true;

let round1AuthSpecialAbilityClick=0;
let round2AuthSpecialAbilityClick = 0;

const buttonOptionHandler = async (props, special) => {
  winPercentage = null;
  losePercentage = null;
  optionResult = null;

  if (!isTimer) return;

  const { btn, player1, player2, newRound } = props;
  let answer, round;

  // checking and setting which round is playing based on perspective
  if (quizNo < 4) round = data[`round${roundNo}`];

  round = newRound || round;

  if (!isEventDone || !round) return;
  isEventDone = false;

  const player1WidthPercentage = player1.style.width.replace(/%/g, "");
  const player2WidthPercentage = player2.style.width.replace(/%/g, "");

  answer = newRound
    ? round.specialAbility.answer
    : round.questions[quizNo - 1].answer;

  // checking correct answer -> button id and answer id is matched
  if (btn.innerHTML == answer) {
    if (!newRound) quizNo = quizNo + 1;
    winPercentage = btn.dataset.id;
    optionResult = true;
    btn.style.background = "#a3ea2a";

    // playing animation attacker
    attackerAnimationPlay();

    if (timeoutID) clearTimeout(timeoutID);
    if (timeoutID2) clearTimeout(timeoutID2);
  } else {
    losePercentage = btn.dataset.id;
    optionResult = false;
    btn.style.background = "#eb0037";

    // playing animation defender
    defenderAnimationPlay();
  }

  // setting state
  let state = {
    player2: {
      player: player2,
      latestWidth: +player2.style.width.replace(/%/g, ""),
      previousWidth: +player1WidthPercentage,
      losePercentage: +losePercentage,
    },
    player1: {
      player: player1,
      latestWidth: +player1.style.width.replace(/%/g, ""),
      previousWidth: +player2WidthPercentage,
      winPercentage: +winPercentage,
    },
  };

  await settingStateCheckingAuthWinFlag(state, optionResult);
  btnBackgroundStyleHandler(btn);

  // if function is calling from special ability question disapering question modal
  if (special) {

    if(roundNo == 1){
      if(optionResult) {
        round1AuthSpecialAbilityClick = 2
      }else{
        round1AuthSpecialAbilityClick = round1AuthSpecialAbilityClick + 1
      }

      if(round1AuthSpecialAbilityClick==2){
        isMove = false;
        isMoveShowQuestion = false;
        document.querySelector(".move-div").style.display = "none";
      }

      isMoveShowQuestion = false;
      moveDiv()   
    }

    if(roundNo == 2){
      if(optionResult) {
        round2AuthSpecialAbilityClick = 2
      }else{
        round2AuthSpecialAbilityClick = round2AuthSpecialAbilityClick + 1
      }

      if(round2AuthSpecialAbilityClick==2){
        isMove = false;
        isMoveShowQuestion = false;
        document.querySelector(".move-div").style.display = "none";
      }

      isMoveShowQuestion = false;
      moveDiv()   
    }

  }

  if (isMove == false && quizNo == 4 && roundNo == 1) {
    setTimeout(() => {
      popupGameOver("Game Over", "You are out of questions. Please restart");
    }, 1000);
  }

  if (isMove == false && quizNo == 4 && roundNo == 2) {
    const { previousWidth, winPercentage } = state.player1;

    if (previousWidth < winPercentage || player2.style.width == "0%") return;
    setTimeout(() => {
      popupGameOver("Game Over", "You are out of questions. Please restart");
    }, 1000);
  }

  isEventDone = true;
  if(!optionResult && special) renderQuestions()
  if (optionResult === false) return;

  // if question answer is true then recalling renderQuestion to rerender question&options
  renderQuestions();
  return;
};

// animations data & handlers
const animationsData = {
  attacker: [
    {
      name: "Reaper (APT37)",
      url: "https://lottie.host/4c9939bd-6f1e-4cf4-8730-ba23bab9a9be/RkUCcGmVIo.json",
    },
    {
      name: "Double Dragons",
      url: "https://lottie.host/42d38ab1-d801-4cf6-af98-32c7cd8d1677/1quOpRBqnp.json",
    },
    {
      name: "Spider",
      url: "https://lottie.host/004f4481-15f1-4688-9142-38ba7a4f7292/dEiBn1WISX.json",
    },
  ],
  defender: [
    {
      name: "Glitternoceros",
      url: "https://lottie.host/c0d282e9-7146-41c4-a244-062eb73b18b5/wgsy1Vbzma.json",
    },
    {
      name: "Flamaring",
      url: "https://lottie.host/f1309c8c-a48f-4473-ba13-46054783314d/oQw35GxwVa.json",
    },
    {
      name: "Sharkinator",
      url: "https://lottie.host/1fe09d56-53f3-4445-bc74-4d3f6dbb9ddc/hkHxc2NvnK.json",
    },
  ],
  crowd: {
    url: "https://lottie.host/6c936a80-f071-4446-91bd-67d621231f9f/7D7B5gxKIX.json",
  },
};

// defender animation handler with his global defenderAnimationPlay function
let defenderAnimation;
let defenderAnimationPlay;
const defenderAnimationHandler = (path) => {
  const wrapperContainer =
    document.querySelector(".gif__defender").parentElement;

  if (roundNo == 1) {
    wrapperContainer.classList.remove("def-round-2");
    wrapperContainer.classList.add("def-round-1");
  } else {
    wrapperContainer.classList.remove("def-round-1");
    wrapperContainer.classList.add("def-round-2");
  }

  const anim2 = document.querySelectorAll(".gif__defender");
  anim2.forEach((elem) => {
    while (elem.firstChild) {
      elem.removeChild(elem.firstChild);
    }
  });
  defenderAnimation = bodymovin.loadAnimation({
    container: anim2[0],
    renderer: "svg",
    loop: false,
    autoplay: false,
    path: path,
  });

  defenderAnimation.addEventListener("complete", () =>
    defenderAnimation.stop()
  );

  defenderAnimationPlay = () => {
    defenderAnimation.play();
  };
};

// attacker animation handler with his global attackerAnimationPlay function
let attackAnimation;
let attackerAnimationPlay;
const attackerAnimationHandler = (path) => {
  const wrapperContainer =
    document.querySelector(".gif__attacker").parentElement;

  if (roundNo == 1) {
    wrapperContainer.classList.remove("attack-round-2");
    wrapperContainer.classList.add("attack-round-1");
  } else {
    wrapperContainer.classList.remove("attack-round-1");
    wrapperContainer.classList.add("attack-round-2");
  }

  const anim = document.querySelectorAll(".gif__attacker");

  anim.forEach((elem) => {
    while (elem.firstChild) {
      elem.removeChild(elem.firstChild);
    }
  });

  attackAnimation = bodymovin.loadAnimation({
    container: anim[0],
    renderer: "svg",
    autoplay: false,
    loop: false,
    path: path,
  });

  // animation for handling
  attackAnimation.addEventListener("complete", () => attackAnimation.stop());
  attackerAnimationPlay = () => {
    return attackAnimation.play();
  };

  return attackerAnimationPlay;
};

// animation rendering handler for render on each round
const renderingAnimation = () => {
  // the quiz no is added for preventing from rerendering on question changes

  // round 1 animations
  if (quizNo == 1 && roundNo == 1) {
    attackerAnimationHandler(animationsData.attacker[2].url);
    defenderAnimationHandler(animationsData.defender[0].url);
  }
  // round 2 animations
  if (quizNo == 1 && roundNo == 2) {
    attackerAnimationHandler(animationsData.attacker[0].url);
    defenderAnimationHandler(animationsData.defender[1].url);
  }
};

// rendering heading title and buttons questions
const renderingHeadingTitles = (quiz) => {
  const questionTitleContainer = document.querySelector(".question-title");
  const quizButtonContainer = document.querySelector(".quiz-container");
  const questionCountContainer = document.querySelector(".question-count");

  quizButtonContainer.innerHTML = "";
  questionTitleContainer.innerHTML = "";

  if (quizNo >= 4 || !quiz) {
    const html = `<div style="grid-column:1/3"><p class="text-center">Please use special ability to completely destroy. </p></div>`;
    quizButtonContainer.insertAdjacentHTML("afterbegin", html);
    return;
  }

  questionTitleContainer.innerHTML = quiz.title;
  questionCountContainer.innerHTML = `${quizNo} / 3`;

  let optionsArr = quiz.mainOptions;

  if (shuffleQuestion) optionsArr = shuffleArray(optionsArr);

  const btnsTemp = optionsArr.map((optionObj) =>
    quizBtnTemp(optionObj.option, optionObj.demage)
  );
  quizButtonContainer.innerHTML = btnsTemp.join("");
};

// main function to rendering animation
const renderQuestions = () => {
  if (!gameStart) return;

  let round;
  // setting which data to show
  round = data[`round${roundNo}`];

  // rendering title/buttons
  const quiz = round.questions[quizNo - 1];
  renderingHeadingTitles(quiz);

  // moving object special abaility question calling.
  const attackerHealth = document.querySelector(".player-1-health");
  const defensiveHealth = document.querySelector(".player-2-health");

  // moving special ability question calling
  if (timeoutID) clearTimeout(timeoutID);
  moveDiv(round, attackerHealth, defensiveHealth);

  // one time clicking to specil ability
  const moveDoc = document.querySelector(".move-div");
  function handleClickMoveDoc() {
    isMoveShowQuestion = true;
    moveDoc.removeEventListener("click", handleClickMoveDoc);
  }
  moveDoc.addEventListener("click", handleClickMoveDoc);

  // all main questions buttons rendering
  const allButtons = document.querySelectorAll(".answer-btn");
  allButtons.forEach((btn) => {
    btn.addEventListener(
      "click",
      async () =>
        await buttonOptionHandler({
          btn,
          player1: attackerHealth,
          player2: defensiveHealth,
        })
    );
  });
};

// checking each second if sec = 0 || < 0 then showing losing flag
/* setInterval(() => {
  if (isTimer === false) return;

  if (!document.querySelector(".time-second")) return;
  if (gameStart === false) return;

  const timerContainer = document.querySelector(".time-second");

  time = time - 1;
  timerContainer.innerHTML = "";
  timerContainer.innerHTML = `${time}s`;

  if (time == 0 || time < 0)
    popupGameOver("Game Over", "You are out of time. Please restart");
}, 1000); */

// moving div with quiz controll
let timeoutID, timeoutID2;
async function moveDiv(round, player1, player2) {
  // after clicking the specil ability button
  if (!round) return;

  if (isMoveShowQuestion) {
    clearTimeout(timeoutID2);
    clearTimeout(timeoutID);

    // when someone click on moving special abaility object then
    const { specialAbility } = round;
    const { title, mainOptions } = specialAbility;

    // rendering question templates
    let div = document.querySelector(".move-div");
    div.style.top = "50%";
    div.style.left = "50%";
    div.style.transform = "translate(-50%,-50%)";
    div.style.cursor = "auto";
    const btnsTemp = mainOptions.map((optionObj, i) => {
      return quizBtnTemp(optionObj.option, optionObj.demage, true);
    });

    const html = `
      <div class="move-div-container px-6  bg-[#151c2b] p-4 border">  
          <div class="heading"><h1 class="text-3xl mb-6">${title}</h1></div>
          <div class="options grid grid-cols-2 gap-4">
              ${btnsTemp.join("")}
          </div>
      </div>
          `;

    div.innerHTML = " ";
    div.insertAdjacentHTML("afterbegin", html);
    div.style.margin = "1rem";

    // adding each button an listener to check answer
    const allButtons = document.querySelectorAll(".answer-btn-2");
    const props = { player1, player2, newRound: round };
    allButtons.forEach((el, i) => {
      el.addEventListener("click", () =>
        buttonOptionHandler({ ...props, btn: el }, true)
      );
    });

    return;
  } else {
    // if question showing isnt authenticate
    let div = document.querySelector(".move-div");
    div.innerHTML = "";
    const html =
      '<h4 class="h-[70px] w-[70px] border text-sm bg-[#151c2b] flex items-center text-center  rounded-full	">Special Ability</h4>';

    div.insertAdjacentHTML("afterbegin", html);
  }

  // if the movement is false then prevent from showing object it always running
  if (!isMove) {
    document.querySelector(".move-div").style.display = "none";
    timeoutID2 = setTimeout(async () => {
      moveDiv(round, player1, player2);
    }, 1500);
    return;
  }

  // displaying object and moving object
  let movingElem = document.querySelector(".move-div");
  movingElem.style.display = "block";

  const { top, left } = movingElem.getBoundingClientRect();

  let topValue = Math.floor(
    Math.random() * (window.innerHeight - movingElem.clientHeight - 100)
  );
  let leftValue = Math.floor(
    Math.random() * (window.innerWidth - movingElem.clientWidth - 100)
  );

  if (Math.abs(topValue - top) > 200) {
    topValue = topValue >= top ? topValue / 2 : top / 2;
  }

  if (Math.abs(leftValue - left) > 200) {
    leftValue = leftValue >= left ? leftValue / 2 : left / 2;
  }

  movingElem.style.top = topValue + "px";
  movingElem.style.left = leftValue + "px";

  if (timeoutID) clearTimeout(timeoutID);

  timeoutID = setTimeout(async () => {
    moveDiv(round, player1, player2);
    await verifyTimer(1500);
  }, 1500);
}

// main quiz runing function which run after completeing each round
const runQuiz = () => {
  renderingAnimation();
  renderQuestions();
};
popupOfficalFlag("Instructions", instruction, true, false, true);
runQuiz();
