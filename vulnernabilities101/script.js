let level = 1;
let current_level = 1;

const levelsData = {
  level1: {
    title: "Scenario",
    content:
      "It is your first week at ThePentestingCo as a Jr. Penetration tester. To ease into the role, you are shadowing a Sr. Penetration tester on your first engagement. <br/> <br/> The Sr. Penetration tester has managed to find a vulnerability in a web application that the client (ACKme IT Services) uses.<br/> <br/> Follow the steps that the Sr. Penetration tester took to ultimately exploit ACKme IT Service's infrastructure.",
  },
  level2: {
    title: "1. Information Gathering",
    content:
      "At this stage, the Sr. Penetration Tester has used a public service that compiles some details about the target company.<br/> <br/> As we can see, ACKme IT Services provide IT services to 800+ clients. This information is useful because we can begin to think of possible software that they are using for us to attack. For example, helpdesk or a support application.",
  },
  level3: {
    title: "2. Enumeration & Scanning",
    content:
      "The Sr. Penetration tester now moves onto the enumeration and scanning stage of the engagement. This stage helps establish services and applications running on ACKme's infrastructure.<br/> <br/> We can use the information gathered from this scan to begin to understand what services may be viable to attack. For example, a webserver hosting a website.<br/> <br/> Recall from our Email, we are given one IP address <b>240.228.189.136.</b> Try scanning this IP address yourself...",
  },
  level4: {
    title: "3. Application Testing",
    content:
      "Using the information gathered from stage two of the penetration engagement. The Jr. Penetration tester has visited the target in their web browser and has been greeted with a login page.<br/> <br/> The Sr. Penetration tester guesses some random passwords such as 'admin' and 'admin' to no avail. They notice a version number of the application <b>1.5.2</b> and takes a note of this. This will be useful for the next stage.",
  },
  level5: {
    title: "4. Vulnerability Research",
    content:
      "The Sr. Penetration tester recalls that ACKme IT Services uses an application called ACKme Portal that has a version number of 1.5.2. The Sr. Penetration Tester visits a vulnerability & exploit database called 'Vulnerability Bank™'.<br/> <br/> This website stores details of vulnerabilities and exploits for applications. The Sr. Penetration Tester searches this site for the software that was discovered in stage three. They're in luck! There is one vulnerability listed for that application & version: Remote Code Execution (RCE).<br/><br/> RCE vulnerability allows commands to be executed on the target's system. The Sr. Penetration Tester could use this vulnerability to gain access to the console of the target. Try searching Vulnerability Bank™️ for an exploit for <b>ACKMe Portal 1.5.2</b> and",
  },
  level6: {
    title: "5. Exploitation",
    content:
      "Accumulating the information from all the previous stages, the Sr. Penetration Tester uses the exploit downloaded from Vulnerability Bank™️ against ACKme's web application on 240.228.189.13. <br/> <br/> The exploit is successful and abuses the Remote Code Execution (RCE) vulnerability to launch a reverse shell on ACKme's infrastructure.<br/><br/> From here, the Sr. Penetration tester can look for files of value such as passwords, backups or application source code.",
  },
};

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

  const title = levelsData[`level${current_level}`]?.title;
  const content = levelsData[`level${current_level}`]?.content;
  popupOffical(title ? title : "test", false, () =>
    instructionHook(content ? content : "test")
  );
}
const showScenario = (current) => {
  const title = levelsData[`level${current}`]?.title;
  const content = levelsData[`level${current}`]?.content;
  popupOffical(title ? title : "test", false, () =>
    instructionHook(content ? content : "test")
  );
};
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
    });

  document
    .getElementsByClassName("btn_level4")[0]
    .addEventListener("click", function () {
      jumpLevel(4);
    });

  document
    .getElementsByClassName("btn_level5")[0]
    .addEventListener("click", function () {
      jumpLevel(5);
    });

  document.getElementById("info0").addEventListener("click", function () {
    showScenario(1);
  });
  document.getElementById("info1").addEventListener("click", function () {
    showScenario(2);
  });
  document.getElementById("info2").addEventListener("click", function () {
    showScenario(3);
  });
  document.getElementById("info3").addEventListener("click", function () {
    showScenario(4);
  });
  document.getElementById("info4").addEventListener("click", function () {
    showScenario(5);
  });
  document.getElementById("info5").addEventListener("click", function () {
    showScenario(6);
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
          popupOffical("Warning", "You cannot view this level yet...", false);
        }
      });
    }
  }
  !(function () {
    document.getElementById("ip").addEventListener("keyup", function () {
      let ip = this.value.replace(/([^0-9.])/g, "");
      this.value = ip;
      document.getElementById("ip_addr").innerHTML = ip;
    });
    document.getElementById("request").addEventListener("click", function () {
      let ip = document.getElementById("ip").value.replace(/([^0-9.])/g, "");
      let ip_sp = ip.split(".");
      let valid = true;
      if (ip_sp.length === 4) {
        for (let i = 0; i < 4; i++) {
          if (parseInt(ip_sp[i]) < 0 || parseInt(ip_sp[i]) > 255) {
            valid = false;
          }
        }
      } else {
        valid = false;
      }
      let tmp_div = document.createElement("DIV");
      if (valid) {
        document.getElementById("cli_line").style.display = "none";
        tmp_div.innerHTML = "";
        tmp_div.innerHTML =
          '<span class="g">user@thepentestingco</span>:<span class="b">~</span>$ nmap ' +
          ip +
          "<br><br>Starting Nmap 7.60 ( https://nmap.org )";
        setTimeout(
          function () {
            let resp_div = document.createElement("DIV");
            if (ip === "240.228.189.136") {
              resp_div.innerHTML += "Nmap scan report for " + ip + "<br>";
              resp_div.innerHTML += "Host is up (0.0013s latency).<br>";
              resp_div.innerHTML += "Not shown: 997 closed ports<br>";
              resp_div.innerHTML += "PORT    STATE SERVICE<br>";
              resp_div.innerHTML += "22/tcp  open  ssh<br>";
              resp_div.innerHTML += "80/tcp  open  http<br>";
              resp_div.innerHTML += "443/tcp open  https<br>";
              resp_div.innerHTML +=
                "<br>Nmap done: 1 IP address (1 host up) scanned in 8.35 seconds";
            } else {
              resp_div.innerHTML = "This IP address is out of scope!";
            }
            document.getElementById("console-results").appendChild(resp_div);
            document.getElementById("cli_line").style.display = "block";
            document.getElementById("ip_addr").innerHTML = "";
            document.getElementById("ip").value = "";
          },
          3050,
          ip
        );
      } else {
        tmp_div.innerHTML =
          '<span class="g">user@thepentestingco</span>:<span class="b">~</span>$ nmap ' +
          ip +
          "<br><br>Starting Nmap 7.60 ( https://nmap.org ) at " +
          "2:10" +
          ' UTC<br>Failed to resolve "' +
          ip +
          '".<br>WARNING: No targets were specified, so 0 hosts scanned.<br>Nmap done: 0 IP addresses (0 hosts up) scanned in 0.04 seconds';
        document.getElementById("ip_addr").innerHTML = "";
        document.getElementById("ip").value = "";
      }
      document.getElementById("console-results").appendChild(tmp_div);
    });
  })();

  $(function () {
    var vuln = "ACKMe Portal 1.5.2";

    $("#vulnbank").on("keyup", function () {
      var input = $(this);

      // if search result is already displayed, remove h3 & p tags to delete it
      if (input.next().is("h3")) input.next().remove();

      if (input.next().is("p")) input.next().remove();

      // if the inputted value = the correct vulnerability, show the the following in HTML on the page
      if (input.val() === vuln)
        input.after(
          "<h3><br/>Search Results (1)</h3><p><u>ACKme Portal 1.5.2</u> | Remote Code Execution</p>"
        );
    });
  });
}

const body = document.querySelector(".body");
const mainContainer = document.querySelector(".mainContainer");

// offical popup
const popupOffical = (heading, message, hook) => {
  if (document.querySelector(".popup-offical")) {
    document.querySelector(".popup-offical").remove();
  }
  const [hookTemplate, hookHandler, action] = hook ? hook() : [];

  const html = `
     <div style="z-index:100" class="text-white fixed top-0 left-0  w-full  min-h-screen z-100 flex justify-center items-center popup-offical overflow-hidden">
       <div class="w-[580px]  md:[666px] m-r-auto rounded-lg popUp opacity-100 bg-[#151c2b] slide-bottom popup-offical-container">
           <div class="flex items-center justify-between py-3 px-5  border-b">
             <h3 class="text-2xl font-bold">${heading}</h3>
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
    if (action == "refresh") {
      window.location.reload();
    }
  };

  if (hookHandler) hookHandler(closeButton);

  // listerner to both buttons for closing modal
  const closeBtn = document.querySelectorAll(".popup-close");
  closeBtn.forEach((btn) => btn.addEventListener("click", () => closeButton()));
};
const instructionHook = (introductions) => {
  let hookTemplate = `
   <div class="">
       <div class="continue flex flex-col gap-1">
        <p>${introductions}</p>
       </div>
       <div class="btn-container mt-3"> 
           <button class="py-[.3rem] continue-btn"> Continue </button> 
       </div>
   </div>  
   `;

  let hookHandler = (close) => {
    document.querySelector(".continue-btn").addEventListener("click", () => {
      isGameStarted = true;
      if (close) close();
    });
  };
  return [hookTemplate, hookHandler, "start-game"];
};
const isCopyingHook = (flag) => {
  let hookTemplate = `
   <div class="flex items-center justify-between">
      ${flag}
     <div class="copy-container relative">
         <button id="copy-btn" class="cursor-pointer border-none outline-none">
           <i class="fa-solid fa-copy"></i>
         </button>
         <div id="tooltip" class="copy-tooltip">Copy</div>
     </div>
   </div>
   `;

  const copyHandler = () => {
    const textToCopy = flag;
    tooltip.innerHTML = "Copied!";
    navigator.clipboard.writeText(textToCopy);

    setTimeout(() => {
      if (tooltip) tooltip.innerHTML = "Copy ";
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
const showFlag = () => {
  document.querySelector(".flag-show").addEventListener("click", () => {
    popupOffical("Flag", false, () =>
      isCopyingHook(atob("VEhNe0FDS01FX0VOR0FHRU1FTlR9"))
    );
  });
};
showFlag();
popupOffical(levelsData.level1.title, false, () =>
  instructionHook(levelsData.level1.content)
);
