const mainContainer = document.querySelector("#main-content");
const mainHeading = document.querySelector(".heading-main");
const body = document.querySelector(".body");
const instructions =
   "The site shows an email client showing the inbox of a security engineer. The inbox has several unread emails. Each unread email will be one of the tasks that the security engineer has to perform.";
let screen = 1;

const data = [
   {
      name: "Vulnerability Assessment and Penetration testing report",
      date: "2:19 pm",
      sender: "External Pentest Vendor",
      subject: "VAPT results - XYZ Inc.",
      body: "Hi,<br>External Pentest Vendor performed VAPT of XYZ Inc.’s external facing infrastructure. Please find attached the report for the VAPT activity.",
      attachment: {
         id: "VAPT report",
         title: "VAPT report",
         description:
            "Please read the vulnerability report and select one of the available mitigation options to mitigate this vulnerability according to the information. Please keep the ease of use, ease of implementation, cost, and improvement in security posture while selecting the answer. Select the answer that best suits the above-mentioned criteria.",
         isChecked: false,
      },
   },
   {
      name: "Audit observations",
      date: "5:12 am",
      sender: "External Auditor",
      subject: "External Audit non-compliance report",
      body: "Hi,<br>External Auditor performed an audit of XYZ Inc. Please find attached some observed non-compliances for your perusal.",
      attachment: {
         id: "External Audit non-compliance report",
         title: "External Audit non-compliance report",
         description:
            "Please read the audit non-compliance report and select one of the available mitigation options to mitigate the non-compliances according to the information. Please keep the ease of use, ease of implementation, cost, and improvement in security posture while selecting the answer. Select the answer that best suits the above-mentioned criteria.",
         isChecked: false,
      },
   },
   {
      name: "A new portal is going live",
      date: "12:09 pm",
      sender: "Project Manager",
      subject: "New community forum going live",
      body: "Hi,<br>As you might know, XYZ Inc. is launching a new community forum. On this forum, customers of XYZ Inc. can discuss their experiences and the wider industry as a whole. We have covered the going live checklist to ensure security best practices are followed, however, we have some issues on which we need your recommendations before moving forward. For details, please see the attached file.",
      attachment: {
         title: "Going Live checklist shortcomings",
         description:
            "Please read the going live checklist shortcomings and provide your recommendations for mitigation.",
         isChecked: true,
      },
   },
   {
      name: "Important Announcement",
      date: "9:45 am",
      attachment: {
         title: "Marketing Campaign Report",
         description:
            "Attached is the detailed report of our latest marketing campaign.",
         isChecked: true,
      },
   },
   {
      name: "Weekly Newsletter",
      date: "12:00 pm",
      attachment: {
         title: "Marketing Campaign Report",
         description:
            "Attached is the detailed report of our latest marketing campaign.",
         isChecked: true,
      },
   },
   {
      name: "Invitation to Webinar",
      date: "3:30 pm",
      attachment: {
         title: "Webinar Invitation",
         description:
            "Attached is the invitation for the upcoming webinar on effective time management.",
         isChecked: true,
      },
   },
];

const quizQuestions = [
   {
      title: "External Audit non-compliance report",
      questions: [
         {
            title: "Observation 1",
            requirements:
               "All assets of XYZ Inc. should have the latest Operating System security updates installed.",
            description:
               "Though most systems had the latest OS security updates, some legacy systems that supported XYZ Inc.’s older hardware didn’t have the latest security updates.",
            recomendedSolution:
               "These systems are older and installing security updates on them might break the functionality of these systems.",
            options: [
               "Keep as it is",
               "Install security updates",
               "Rebuild the legacy servers so that they don't break with security updates",
               "Restrict accessibility of the servers to only required usage",
            ],
            isSolvedCorrectly: null,
            isSecondEmail: true,
            answer:
               "Restrict accessibility of the servers to only required usage",
         },
         {
            title: "Observation 2",
            requirements:
               "All network communication, user activity,and security device logs shall be aggregated in a single platform (SIEM) and monitored continuously.",
            description:
               "XYZ Inc. has some assets in the cloud and others on-prem. It was observed that the cloud assets were not integrated with the SIEM, which is present on-prem.",
            recomendedSolution:
               "The logs from the cloud are not integrated with the SIEM because this will require enabling internet access to the SIEM, which is not desirable.",
            options: [
               "Keep as it is",
               "Forward cloud logs to SIEM regardless of concerns of XYZ Inc",
               "Rebuild the applications on the cloud to on-prem or vice versa",
               "Aggregate cloud logs in a single place. Forward the logs from that place to on-prem network using a restricted tunnel",
            ],
            isSecondEmail: true,
            isSolvedCorrectly: null,
            answer:
               "Aggregate cloud logs in a single place. Forward the logs from that place to on-prem network using a restricted tunnel",
         },
      ],
   },
   {
      title: "VAPT report",
      questions: [
         {
            title: "Vulnerability 1",
            requirements:
               "Oracle-backend-DB-Server <br> ORACLE MYSQL VULNERABILITY: CVE-2022-21417",
            description:
               "Vulnerability in the MySQL Server product of Oracle MySQL (component: InnoDB). Supported versions that are affected are 5.7.37 and prior and 8.0.28 and prior. Easily exploitable vulnerability allows a high privileged attacker with network access via multiple protocols to compromise MySQL Server. Successful attacks of this vulnerability can result in unauthorized ability to cause a hang or frequently repeatable crash (complete DOS) of MySQL Server. CVSS 3.1 Base Score 4.9 (Availability impacts). CVSS Vector: (CVSS:3.1/AV:N/AC:L/PR:H/UI:N/S:U/C:N/I:N/A:H).",
            recomendedSolution:
               "Upgrade to the latest version of Oracle MySQL <br> Download and apply the upgrade from: <a class='underline' target='_blank' href='http://dev.mysql.com/downloads/mysql'>http://dev.mysql.com/downloads/mysql</a>",
            options: [
               "Keep as it is",
               "Patch the vulnerability",
               "Rebuild the server",
               "Restrict accessibility of the server only through VPN or internal network",
            ],
            isSolvedCorrectly: null,
            answer:
               "Restrict accessibility of the server only through VPN or internal network",
         },
         {
            title: "Vulnerability 2",
            requirements:
               "corporate-client-portal <br> OPENSSL THE C_REHASH SCRIPT ALLOWS COMMAND INJECTION (CVE-2022-2068)",
            description:
               "In addition to the c_rehash shell command injection identified in CVE-2022-1292, further circumstances where the c_rehash script does not properly sanitise shell metacharacters to prevent command injection were found by code review. When the CVE-2022-1292 was fixed, it was not discovered that there were other places in the script where the file names of certificates being hashed were possibly passed to a command executed through the shell. This script is distributed by some operating systems in a manner where it is automatically executed. On such operating systems, an attacker could execute arbitrary commands with the privileges of the script. Use of the c_rehash script is considered obsolete and should be replaced by the OpenSSL rehash command line tool. Fixed in OpenSSL 3.0.4 (Affected 3.0.0,3.0.1,3.0.2,3.0.3). Fixed in OpenSSL 1.1.1p (Affected 1.1.1-1.1.1o). Fixed in OpenSSL 1.0.2zf (Affected 1.0.2-1.0.2ze).",
            recomendedSolution: [
               "Upgrade to OpenSSL version 1.0.2zf",
               "Download and apply the upgrade from: <a class='underline' target='_blank' href='http://ftp.openssl.org/source/openssl1.0.2zf.tar.gz'>http://ftp.openssl.org/source/openssl1.0.2zf.tar.gz</a> <div class='bg-[#d9d9d9] p-2 ml-2 mt-1 mb-1'> Upgrade to version 1.0.2zf of OpenSSL (<a class='underline' target='_blank' href='http://www.openssl.org'>http://www.openssl.org</a>). The source code for this release can be downloaded from OpenSSL's website(<a class='underline' target='_blank' href='http://ftp.openssl.org/source/openssl-1.0.2zf.tar.gz'>http://ftp.openssl.org/source/openssl-1.0.2zf.tar.gz</a>). To obtain binaries for your platform, please visit your vendor's site. Please note that many operating system vendors choose to apply the most recent OpenSSL security patches to their distributions without changing the package version to the most recent OpenSSL version number.</div>",
               "Upgrade to OpenSSL version 1.1.1p",
               "Download and apply the upgrade from: <a class='underline' target='_blank' href='http://ftp.openssl.org/source/openssl1.1.1p.tar.gz'>http://ftp.openssl.org/source/openssl1.1.1p.tar.gz</a> Upgrade to version 1.1.1p of OpenSSL <a class='underline' target='_blank' href='http://www.openssl.org'>(http://www.openssl.org)</a>. The source code for this release can be downloaded from OpenSSL's website <a class='underline' target='_blank' href='http://ftp.openssl.org/source/openssl-1.1.1p.tar.gz'>(http://ftp.openssl.org/source/openssl-1.1.1p.tar.gz)</a>. To obtain binaries for your platform, please visit your vendor's site. Please note that many operating system vendors choose to apply the most recent OpenSSL security patches to their distributions without changing the package version to the most recent OpenSSL version number.",
               "Upgrade to OpenSSL version 3.0.4 Download and apply the upgrade from: <a class='underline' target='_blank' href='http://ftp.openssl.org/source/openssl-3.0.4.tar.gz'>http://ftp.openssl.org/source/openssl-3.0.4.tar.gz</a> Upgrade to version 3.0.4 of OpenSSL <a class='underline' target='_blank' href='http://www.openssl.org'>(http://www.openssl.org)</a>. The source code for this release can be downloaded from OpenSSL's website (<a class='underline' target='_blank' href='http://ftp.openssl.org/source/openssl-3.0.4.tar.gz'>http://ftp.openssl.org/source/openssl-3.0.4.tar.gz</a>). To obtain binaries for your platform, please visit your vendor's site. Please note that many operating system vendors choose to apply the most recent OpenSSL security patches to their distributions without changing the package version to the most recent OpenSSL version number.",
            ],
            options: [
               "Keep as it is",
               "Patch the vulnerability",
               "Rebuild the server",
               "Restrict accessibility of the server only through VPN or internal network",
            ],
            isSolvedCorrectly: null,
            answer:
               "Restrict accessibility of the server only through VPN or internal network",
         },
         {
            title: "Vulnerability 3",
            requirements:
               "corporate-website-public <br> APACHE HTTPD: MOD_LUA USE OF UNINITIALIZED VALUE OF IN R:PARSEBODY (CVE-2022-22719)",
            description:
               "A carefully crafted request body can cause a read to a random memory area which could cause the process to crash. This issue affects Apache HTTP Server 2.4.52 and earlier.",
            recomendedSolution: [
               "Apache HTTPD >= 2.4 and < 2.4.53",
               "Upgrade to Apache HTTPD version 2.4.53",
               "Apache HTTPD version 2.4.53 Download and apply the upgrade from: <a class='underline' target='_blank' href='http://archive.apache.org/dist/httpd/httpd2.4.53.tar.gz'>http://archive.apache.org/dist/httpd/httpd2.4.53.tar.gz</a>",
               "Many platforms and distributions provide pre-built binary packages for Apache HTTP server. These pre-built packages are usually customized and optimized for a particular distribution, therefore we recommend that you use the packages if they are available for your operating system.",
            ],
            options: [
               "Keep as it is",
               "Patch the vulnerability",
               "Rebuild the server",
               "Restrict accessibility of the server only through VPN or internal network",
            ],
            isSolvedCorrectly: null,
            answer: "Patch the vulnerability",
         },
      ],
   },
];

const screenShow = (num) => {
   screen = num;
   modulesHandler();
};

const popupOfficalFlag = (heading, message, isCopyText, refresh, proceed) => {
   if (document.querySelector(".popup-offical")) {
      document.querySelector(".popup-offical").remove();
   }

   const html = `
  <div style="z-index:100" class="fixed top-0 left-0  w-full  min-h-screen z-100 flex justify-center items-center popup-offical overflow-hidden">
  <div class="w-[580px]  md:[666px] m-r-auto -mt-10  border-0 rounded-lg popUp opacity-100 bg-[#151c2b] slide-bottom popup-offical-container">
  <div class="flex items-center justify-between py-3 px-5  border-b">
  <h2 class="text-2xl font-bold">${heading}</h2>
            <i class="fa-solid fa-xmark cursor-pointer text-2xl opacity-60 hover:opacity-100 popup-close" ></i>
            </div>
        <div class="py-3 px-5 flex items-center justify-between relative pt-4">
        ${
           isCopyText
              ? `<p class="copy-message">${atob(
                   "VEhNe1MzQ1VSMVRZXzNORzFOMzNSNV9SMENLfQ=="
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
                      ? `<div class="btn-container-2 p-2"> <button class="p-2 popup-close">Restart</button> </div>`
                      : ""
                }
                ${
                   proceed
                      ? `<div class="btn-container-2 p-2"> <button class="p-2 popup-close">Let's Proceed!</button> </div>`
                      : ""
                }
        </div>
</div>
  `;

   body.insertAdjacentHTML("afterbegin", html);
   mainContainer.style.filter = "blur(2px)";

   // copy text handler.
   const copyHandler = () => {
      const textToCopy = atob("VEhNe1MzQ1VSMVRZXzNORzFOMzNSNV9SMENLfQ=="); // Replace with the text you want to copy
      tooltip.tooltip.innerHTML = "Copied!";
      navigator.clipboard.writeText(textToCopy);

      setTimeout(() => {
         tooltip.tooltip.innerHTML = "Copy ";
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
   closeBtn.forEach((btn) =>
      btn.addEventListener("click", () => closeButton())
   );
};

const popupAttachmentFlag = (heading, message, subject) => {
   if (document.querySelector(".popup-offical")) {
      document.querySelector(".popup-offical").remove();
   }

   const html = `
  <div style="z-index:100" class="fixed top-0 left-0  w-full  min-h-screen z-100 flex justify-center items-center popup-offical overflow-hidden">
    <div class="w-[580px]  md:[666px] m-r-auto -mt-10  border-0 rounded-lg popUp opacity-100 bg-[#151c2b] slide-bottom popup-offical-container">
        <div class="flex items-center justify-between py-3 px-5  border-b">
            <h2 class="text-2xl font-bold">${heading}</h2>
            <i class="fa-solid fa-xmark cursor-pointer text-2xl opacity-60 hover:opacity-100 popup-close" ></i>
        </div>
        <div class="py-3 px-5 flex items-center justify-between relative pt-4">
                <p class="whitespace-pre-line">${message}</p>
        </div>
        <div class="btn-container-2 m-3">
          <button class="flex items-center gap-3 justify-center open-link-btn py-2" id="${subject}">
            <i class="fa-solid fa-link"></i>
            <b> Open Link </b>
          </button>
        </div>
    </div>
</div>
  `;

   body.insertAdjacentHTML("afterbegin", html);
   mainContainer.style.filter = "blur(2px)";

   const closeButton = () => {
      document.querySelector(".popup-offical").remove();
      mainContainer.style.filter = "none";
   };

   // listerner to both buttons for closing modal
   const closeBtn = document.querySelector(".popup-close");
   closeBtn.addEventListener("click", () => closeButton());

   const linkBtn = document.querySelector(".open-link-btn");
   linkBtn.addEventListener("click", () => {
      document.querySelector(".popup-offical").remove();
      mainContainer.style.filter = "none";
      runQuiz(linkBtn.id);
   });
};

popupOfficalFlag("Instruction", instructions, false, false, true);

// First screen temp/handler

const emailListTemplate = (email) => {
   return `
<li class="email-list flex gap-4 items-center border-b m-2 p-2">
    <i class="fa-regular fa-star w-4 h-4"></i>
    <p class=' ${email.attachment.isChecked ? "text-[#a3ea2a]" : ""}'> ${
      email.attachment.isChecked ? "Read" : "Unread"
   }</p>
    <p class="ml-[1rem] cursor-pointer hover:text-black/70 email-lists ${
       email.attachment.isChecked ? "" : "font-bold"
    } " id="${email.name}">${email.name} </p>
   ${
      email.attachment.isChecked
         ? ` <p class="ml-auto whitespace-nowrap	">${email.date}</p>`
         : `<b class="ml-auto whitespace-nowrap	">${email.date}</b>`
   }
    <i class="fa-solid fa-trash text-[#eb0037] cursor-pointer"></i>
</li>
  `;
};

const emailInboxTemplates = () => {
   const html = `
<div class="w-[95%] md:w-[80%] m-auto mt-12 rounded min-h-[55vh] m-auto flex items-start justify-center gap-2 email text-black bg-white overflow-hidden">
    <div class="email__left w-[14rem] md:w-[18rem] bg-white h-[55vh] border-r">
      <div class="email__left__sidebar">
        <ul class="p-6 w-full flex flex-col gap-2">
          <li class="w-full">
            <span class="tool relative bg-[#212c42]/75 px-6 py-2 w-full flex items-center gap-4 rounded cursor-pointer text-white text-xl" >
              <i class="fa-solid fa-inbox"></i>
              <b>Inbox</b>
               <div id="tooltip" style="top:10%; left:112%; z-index:10">Inbox</div>
            </span>
          </li>

          <li class="w-full">
            <span class="bg-[#212c42] hover:bg-[#212c42]/90 px-6 py-2 w-full flex items-center gap-4 rounded cursor-pointer text-white text-xl">
              <i class="fa-solid fa-envelope-circle-check"></i>
              <b>Sent</b>
            </span>
          </li>

          <li class="w-full">
            <span class="bg-[#212c42] hover:bg-[#212c42]/90 px-6 py-2 w-full flex items-center gap-4 rounded cursor-pointer text-white text-xl">
              <i class="fa-regular fa-star"></i>
              <b>Important</b>
            </span>
          </li>

          <li class="w-full">
            <span class="bg-[#212c42] hover:bg-[#212c42]/90 px-6 py-2 w-full flex items-center gap-4 rounded cursor-pointer text-white text-xl">
              <i class="fa-solid fa-trash"></i>
              <b>Trash</b>
            </span>
          </li>

        </ul>
      </div>
    </div>   
  <div class="email__right flex-1 bg-white relative py-4">
    <ul>  
    ${data.map((email) => emailListTemplate(email)).join(" ")}
    </ul>
</div>
    `;

   return html;
};

const emailInboxHandler = () => {
   const temp = emailInboxTemplates();
   mainContainer.innerHTML = "";
   mainContainer.insertAdjacentHTML("afterbegin", temp);
   mainHeading.innerHTML = "Security Engineer";

   const allInboxEmails = document.querySelectorAll(".email-lists");
   allInboxEmails.forEach((inboxEmail) =>
      inboxEmail.addEventListener("click", () => {
         const id = inboxEmail.id;
         const email = data.find((email) => email.name == id);
         if (email.attachment.isChecked) return;

         return readEmailHandler(email);
      })
   );
};

const emailReadTemplate = (email) => {
   return `
<div class="w-full flex items-start justify-center">
  <div class="p-6 rounded text-black flex flex-col scale-up-center w-full relative pl-12 pt-4 md:pt-8"> 
  <button class="text-2xl text-[#525a6a] top-0 left-3 absolute goBackBtn tool">
    <i class="fa-solid fa-arrow-left hover:bg-[#d5d4d4] p-2 hover:rounded-[50%]"></i>
    <div id="tooltip" style="padding:.1rem .5rem; top:0%; left:175%; z-index:10">Back</div>
  </button> 

    <span class="flex gap-2 mb-3 mt-2 items-start">
        <h2 class="text-2xl font-bold">${email.name}</h2>
      </span>
      <span class="flex gap-4">
        <b>Sender </b>
        ${email.sender}
      </span>
      <span class="flex gap-4">
        <b>Subject </b>
        ${email.subject}
      </span>
      <span>
        <p class="whitespace-pre-line	-mt-4">
        ${email.body}
        </p>
      </span>
     <div class="ml-auto flex gap-8 items-center mt-8">
     
       <button class="tool relative attachment-btn flex items-center px-2 bg-[#a3ea2a] hover:bg-[#a3ea2a]/75 rounded" id="${email.name}">
          <div id="tooltip" style="top:-105%; left:-0%; z-index:10">Attachment</div>
          
          <div class="tex-3xl cursor-pointer flex items-center gap-2" >
              <i class="fa-solid fa-paperclip  p-2 text-[1.3rem]"></i>
              </div>
              Attachment
       </button>
        
        <div class="tex-3xl cursor-pointer flex items-center gap-2">
          <i class="fa-solid fa-reply"></i>
          <p>Reply</p>
        </div>

        <div class="tex-3xl cursor-pointer flex items-center gap-2">
          <i class="fa-solid fa-reply-all"></i>
          <p>Reply all</p>
        </div>
        
     </div>

  </div>
</div>
  `;
};

function openAttachment(email) {
   popupAttachmentFlag(
      email.attachment.title,
      email.attachment.description,
      email.attachment.id
   );
}
const readEmailHandler = (email) => {
   const html = emailReadTemplate(email);
   const readEmailContainer = document.querySelector(".email__right");
   readEmailContainer.innerHTML = "";
   readEmailContainer.insertAdjacentHTML("afterbegin", html);

   const attachmentBtn = document.querySelector(".attachment-btn");
   attachmentBtn.addEventListener("click", (e) => {
      openAttachment(data.find((email) => attachmentBtn.id == email.name));
   });

   const goBackBtn = document.querySelector(".goBackBtn");
   goBackBtn.addEventListener("click", () => {
      screenShow(1);
   });
};

function shuffleArray(array) {
   const shuffled = [...array];
   for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
   }
   return shuffled;
}
const quizTemplates = (title, q, length) => {
   return `
  <div class="w-full min-h-[85vh] my-4 flex items-center justify-center">
    <div class="bg-white p-8 min-w-[25rem] text-black rounded overflow-hidden w-[95%] md:w-[80%] m-auto relative">
        <span class="flex items-center gap-2 absolute top-2 right-4 tool">
          Question
          <b>${quizNo + 1}/${length}</b>
          <div id="tooltip" style="top:100%; left:15%">Remaining questions left</div>
        </span>
        <span class="flex items-center gap-2 absolute top-2 left-4 tool">
          Remaining Attempts 
          <b>${attempsLeft}/2</b>
           <div id="tooltip" style="top:100%">Remaining attempts left</div>
        </span>
        <h3 class="text-3xl font-bold text-center">${title}</h3>
        <div class="quiz-contaienr">
          <h4 class="text-2xl font-bold mb-2 mt-2">${q.title}</h4>
          <span>
              <b>${q?.isSecondEmail ? "Requirements" : "Asset Name"}</b>
             <p class="ml-3">${q.requirements}</p>
          </span>
          <br>
          <span>
              <b>${q?.isSecondEmail ? "Observation" : "Description"} </b>
             <p class="ml-3">${q.description}</p>
          </span>
          <br>
          <span>
              <b> ${
                 q?.isSecondEmail ? "XYZ Inc. Comments" : "Recommended Solution"
              } </b>
              ${
                 typeof q.recomendedSolution == "string"
                    ? `<p class="ml-3">${q.recomendedSolution}</p>`
                    : `<ul class="ml-3"> ${q.recomendedSolution
                         .map(
                            (list) => `<li class='list-disc mb-2'>${list}</li>`
                         )
                         .join(" ")}</ul>`
              }
          </span>
        </div>
        <div class="quiz grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"> 
          ${shuffleArray(q.options)
             .map(
                (option) =>
                   `
              <div class="btn-container-2">
                <button class="leading-5 px-2 min-h-[3.2rem] options-buttons">${option}</button>
              </div>
              `
             )
             .join("")}
        </div>
    </div>
  </div>
  `;
};

const markQuizQuestionWrongCorrect = (solved, quizId) => {
   quizQuestions.map((question, index) => {
      if (question.title == quizId) {
         question.questions[quizNo].isSolvedCorrectly = solved;
         if (solved) quizNo = quizNo + 1;

         setTimeout(() => {
            quizRuning = false;
            runQuiz(null);
         }, 1000);
      }
   });
};

let quizNo = 0;
let attempsLeft = 2;
let quizId;
let quizRuning = false;

const runQuiz = (id) => {
   if (id !== undefined && id !== null && id !== "") quizId = id;
   quizId = quizId || id;

   // setting the that email is checked.
   data.forEach((email) => {
      if (email.attachment.id == quizId) email.attachment.isChecked = true;
   });

   // finding specific email quiz data
   const question = quizQuestions.find((quiz) => quiz.title == quizId);

   if (
      question.questions.length == quizNo ||
      question.questions.length < quizNo
   ) {
      quizNo = 0;
      return screenShow(1);
   }

   const showingQuestion = question.questions[quizNo];

   const html = quizTemplates(
      question.title,
      showingQuestion,
      question.questions.length
   );

   mainHeading.innerHTML = "Work On This Task";
   mainContainer.innerHTML = "";
   mainContainer.insertAdjacentHTML("afterbegin", html);

   const allOptions = document.querySelectorAll(".options-buttons");

   allOptions.forEach((option) =>
      option.addEventListener("click", () => {
         if (quizRuning) return;
         quizRuning = true;
         if (option.innerHTML == showingQuestion.answer) {
            option.style.backgroundColor = "#a3ea2a";
            markQuizQuestionWrongCorrect(true, quizId, showingQuestion);
         } else {
            option.style.backgroundColor = "#eb0037";
            attempsLeft = attempsLeft - 1;

            if (attempsLeft == 0) {
               popupOfficalFlag(
                  "Game Over",
                  `You are out of attempts. Please restart`,
                  false,
                  true
               );
               return;
            }
            popupOfficalFlag(
               "Remaining Attempts",
               `You have ${attempsLeft} attempt left.`,
               false,
               false
            );

            markQuizQuestionWrongCorrect(false, quizId, showingQuestion);
         }
      })
   );
};
// main handler for all modules
function modulesHandler() {
   const allEmailChecked = data.every(
      (email) => email.attachment.isChecked === true
   );
   if (allEmailChecked) popupOfficalFlag("Flag", "", true, false);

   if (screen === 1) emailInboxHandler();
   else if (screen === 2) sdecondScreenHandler();
   else return;
}

modulesHandler();
