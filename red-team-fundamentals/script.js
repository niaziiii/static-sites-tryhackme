let level = 1;
let current_level = 1;

function jumpLevel(current) {
  level = current + 1;
  current_level = current + 1;
  document.getElementById("progress-" + current).style.backgroundColor =
    "#A3EA2A";
  document.getElementById("progress-" + (current + 1)).style.backgroundColor =
    "#A3EA2A";
  document.getElementById("progress-" + current).style.boxShadow =
    "inset 0px 0px 0px 2px #A3EA2A";
  document.getElementById("progress-" + (current + 1)).style.boxShadow =
    "inset 0px 0px 0px 2px #fff";
  document.getElementById("level" + current).style.display = "none";
  document.getElementById("level" + (current + 1)).style.display = "block";
}

function setup() {
  document
    .getElementsByClassName("btn_level1")[0]
    .addEventListener("click", function () {
      jumpLevel(1);
    });

  document
    .getElementsByClassName("btn_level2")[0]
    .addEventListener("click", function () {
      jumpLevel(2);
    });

  document
    .getElementsByClassName("btn_level3")[0]
    .addEventListener("click", function () {
      jumpLevel(3);
      simulateExploit("console-results");
    });

  document
    .getElementsByClassName("btn_level4")[0]
    .addEventListener("click", function () {
      jumpLevel(4);
    });

  document
    .getElementsByClassName("btn_level5")[0]
    .addEventListener("click", function () {
      var encodedFlag = "VEhNe1JFRF9URUFNX1JPQ0tTfQ==";

      // Decode the flag
      var decodedFlag = atob(encodedFlag);

      // Display the decoded flag
      document.getElementById("obfuscated-flag-placeholder").textContent =
        decodedFlag;

      // Copy button functionality
      var copyBtn = document.getElementById("copy-btn");
      copyBtn.addEventListener("click", copyHandler);

      jumpLevel(5);
    });

  let prog_buttons = document
    .getElementsByClassName("progress-bar-dots")[0]
    .getElementsByTagName("div");
  for (let i in prog_buttons) {
    if (typeof prog_buttons[i] === "object") {
      prog_buttons[i].addEventListener("click", function () {
        let id = parseInt(this.id.replace("progress-", ""));
        if (id <= level) {
          if (current_level === level) {
            document.getElementById(
              "progress-" + current_level
            ).style.boxShadow = "inset 0px 0px 0px 2px #A3EA2A";
          } else {
            document.getElementById(
              "progress-" + current_level
            ).style.boxShadow = "inset 0px 0px 0px 2px #A3EA2A";
          }
          document.getElementById("progress-" + id).style.boxShadow =
            "inset 0px 0px 0px 2px #fff";
          document.getElementById("level" + current_level).style.display =
            "none";
          document.getElementById("level" + id).style.display = "block";
          current_level = id;
        } else {
          //   alert("You cannot view this level yet");
          popupOffical("Warning", "You cannot view this level yet...", false);
        }
      });
    }
  }
}

function openEmail(idx) {
  var elem = document.getElementsByClassName("email-body-main");
  for (var i = 0; i < elem.length; ++i) {
    var item = elem[i];
    item.style.display = "none";
  }
  document.getElementById("email-body-main-" + idx).style.display = "block";

  var elem = document.getElementsByClassName("email-summary");
  for (var i = 0; i < elem.length; ++i) {
    var item = elem[i];
    item.classList.remove("active");
  }
  document.getElementById("email-summary-" + idx).classList.add("active");
}

function scroll() {
  let div = document.getElementById("console-body");
  div.scrollTop = div.scrollHeight - div.clientHeight;
}

function simulateExploit(id) {
  elem = document.getElementById(id);
  elem.innerHTML = "";

  addHTMLToExplSim(id, '<span class="b">mimikatz #</span>');

  simulateTyping(id, "lsadump::sam", 0, 80);

  setTimeout(function () {
    addHTMLToExplSim(
      id,
      "Domain : BANK<br/>SysKey : 606c5f914ffd4c3bc8553b69b968e0c7<br/><br/>SAMKey : fdb2b417771ad800254c6324e213ad64<br/><br/>"
    );
  }, 1400);

  setTimeout(function () {
    addHTMLToExplSim(
      id,
      "RID  : 000001f4 (500)<br/>User : Administrator<br/>LM   :<br/>NTLM : 31d6cfe0d16ae931b73c59d7e0c089c0<br/><br/>"
    );
  }, 1550);

  setTimeout(function () {
    addHTMLToExplSim(
      id,
      'RID  : 000003e9 (1001)<br/><span class="r">User : Backups<br/>NTLM : 5fb8724896a778fcc3eeca1c28ac51f5</span><br/><br/>'
    );
  }, 1700);

  setTimeout(function () {
    addHTMLToExplSim(id, '<span class="b">mimikatz #</span>');
  }, 1900);

  setTimeout(function () {
    // keep looping animation if on right level
    if (current_level == 4) {
      simulateExploit(id);
    }
  }, 10000);
}

function addHTMLToExplSim(id, html) {
  document.getElementById(id).innerHTML += `${html}`;
  scroll();
}

function simulateTyping(id, text, start, delay) {
  elem = document.getElementById(id);
  elem.innerHTML += text[start];
  if (start < text.length - 1) {
    setTimeout(function () {
      simulateTyping(id, text, start + 1, delay);
    }, delay);
  } else {
    elem.innerHTML += "<br/>";
  }
}

const popupOffical = (heading, message, hook) => {
  const body = document.querySelector(".body");
  const mainContainer = document.querySelector(".mainContainer");

  if (document.querySelector(".popup-offical")) {
    document.querySelector(".popup-offical").remove();
  }
  const [hookTemplate, hookHandler, action] = hook ? hook() : [];

  const html = `
         <div style="z-index:100" class="text-white fixed top-0 left-0  w-full  min-h-screen z-100 flex justify-center items-center popup-offical overflow-hidden">
           <div class="w-[580px]  md:[666px] m-r-auto rounded-lg popUp opacity-100 bg-[#151c2b] slide-bottom popup-offical-container">
               <div class="flex items-center justify-between py-3 px-3  border-b">
                 <h3 class="text-2xl font-bold">${heading}</h3>
                 <i class="fa-solid fa-xmark cursor-pointer text-2xl opacity-60 hover:opacity-100 popup-close" ></i>
                 </div>
                 <div class="py-3 px-3 relative">
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
    if (action == "refresh") {
      window.location.reload();
    }
  };

  if (hookHandler) hookHandler(closeButton);

  // listerner to both buttons for closing modal
  const closeBtn = document.querySelectorAll(".popup-close");
  closeBtn.forEach((btn) => btn.addEventListener("click", () => closeButton()));
};

const copyHandler = () => {
  const textToCopy = "THM{RED_TEAM_ROCKS}";
  tooltip.innerHTML = "Copied!";
  navigator.clipboard.writeText(textToCopy);

  setTimeout(() => {
    if (tooltip) tooltip.innerHTML = "Copy ";
  }, 3000);
};
const copyhookHandler = () => {
  document.querySelector(".copy-btn").addEventListener("click", copyHandler);
};
copyhookHandler();

// 'VEhNe1JFRF9URUFNX1JPQ0tTfQ=='
