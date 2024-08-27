let level = 1;
let current_level = 1;

const levelsData = {
  level1: {
    title: "Instructions",
    content:
      "Inspect the alerts in your SIEM dashboard. Find the malicious IP address from the alerts, make note of it, and then click on the alert to proceed.",
  },
  level2: {
    title: "Instructions",
    content:
      " There are websites on the Internet that allow you to check the reputation of an IP address to see whether it's malicious or suspicious.",
  },
  level3: {
    title: "Instructions",
    content:
      "There are many open-source databases out there like AbuseIPDB, Cisco Talos Intelligence, where you can perform a reputation and location check for the IP address. Most security analysts use these tools to aid them with alert investigations. You can also make the Internet safer by reporting the malicious IPs, for example, on AbuseIPDB. <br/><br/> Now that we know the IP address is malicious, we need to escalate it to a staff member!",
  },
  level4: {
    title: "Instructions",
    content:
      "We shouldn't worry too much if it was a failed authentication attempt, but you probably noticed the successful authentication attempt from the malicious IP address. Let's declare a small incident event and escalate it. There is some great staff working at the company, but you wouldn't want to escalate this to the wrong person who is not in charge of your team or department.",
  },
  level5: {
    title: "Instructions",
    content:
      "You got the permission to block the malicious IP address, and now you can proceed and implement the block rule. Block the malicious IP address on the firewall and find out what message they left for you.",
  },
};
function jumpLevel(current) {
  level = current + 1;
  current_level = current + 1;

  updateProgress(current);

  if (level == 6) {
    popupOffical("Instructions", false, () =>
      isCopyingHook(atob("VEhNe1VOVElMLVdFLU1FRVQtQUdBSU59"))
    );
    return;
  }

  document.getElementById("level" + current).style.display = "none";
  document.getElementById("level" + (current + 1)).style.display = "block";

  const title = levelsData[`level${current_level}`]?.title;
  const content = levelsData[`level${current_level}`]?.content;
  popupOffical(title ? title : "test", false, () =>
    instructionHook(content ? content : "test")
  );
}

const updateProgress = (current) => {
  const allProgress = document.querySelectorAll(".progress");

  allProgress.forEach((progress, i) => {
    if (i == current) {
      progress.style.backgroundColor = "#A3EA2A";
      progress.style.boxShadow = "inset 0px 0px 0px 2px white";
    } else {
      if (i > level - 1) return;
      progress.style.backgroundColor = "#A3EA2A";
      progress.style.boxShadow = "inset 0px 0px 0px 2px transparent";
    }
  });
};

function setup() {
  document
    .getElementsByClassName("ip_clicked")[0]
    .addEventListener("click", ipClicked);
  document
    .getElementsByClassName("search_ip")[0]
    .addEventListener("click", ipSearched);
  document
    .getElementsByClassName("escalate")[0]
    .addEventListener("click", ipEscalate);
  document
    .getElementsByClassName("staff_chosen")[0]
    .addEventListener("click", staffClicked);
  document
    .getElementsByClassName("ip_blocked")[0]
    .addEventListener("click", ipBlocked);
  let prog_buttons = document
    .getElementsByClassName("progress-bar-dots")[0]
    .getElementsByTagName("div");
  for (let i in prog_buttons) {
    if (typeof prog_buttons[i] === "object") {
      prog_buttons[i].addEventListener("click", function () {
        let id = parseInt(this.id.replace("progress-", ""));
        if (id <= level) {
          updateProgress(id - 1);
          document.getElementById("level" + current_level).style.display =
            "none";
          document.getElementById("level" + id).style.display = "block";
          current_level = id;
        } else {
          popupOffical("Warning", "You cannot view this level");
        }
      });
    }
  }
}

function pieChart() {
  let data = google.visualization.arrayToDataTable([
    ["Type", "Percentage"],
    ["Operations: Information", 40],
    ["Security: Attack", 30],
    ["Security: Suspicious", 30],
  ]);
  let options = {
    legend: {
      position: "bottom",
    },
  };
  let chart = new google.visualization.PieChart(
    document.getElementById("piechart")
  );
  chart.draw(data, options);
}

function barChart() {
  let data = new google.visualization.DataTable();
  data.addColumn("string", "Country");
  data.addColumn("number", "Count");

  data.addRows([
    ["UK", 60],
    ["US", 30],
    ["Brazil", 21],
    ["China", 4],
    ["Russia", 15],
    ["N. Korea", 17],
  ]);

  let options = {
    title: "Countries",
    vAxis: {
      maxValue: 80,
    },
    legend: { position: "none" },
  };

  let chart = new google.visualization.ColumnChart(
    document.getElementById("chart")
  );

  chart.draw(data, options);
}

function drawCharts() {
  pieChart();
  barChart();
}

function ipClicked() {
  jumpLevel(1);
}

function ipSearched() {
  let v = document.getElementById("search_ip_input").value;
  if (v === "221.181.185.159") {
    jumpLevel(2);
  } else {
    popupOffical("Invalid", "Invalid IP address entered");
  }
}

function ipEscalate() {
  jumpLevel(3);
}

function staffClicked() {
  if (document.getElementById("correct_staff").checked) {
    jumpLevel(4);
  } else {
    popupOffical("Wrong", "Wrong staff member selected");
  }
}

function ipBlocked() {
  let v = document.getElementById("ip_blocked_input").value;
  if (v === "221.181.185.159") {
    jumpLevel(5);
  } else {
    popupOffical("Invalid", "Invalid IP address entered");
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
const instructionHook = (instructions) => {
  let hookTemplate = `
     <div class="">
         <div class="continue flex flex-col gap-1">
          <p>${instructions}</p>
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
popupOffical(levelsData.level1.title, false, () =>
  instructionHook(levelsData.level1.content)
);
