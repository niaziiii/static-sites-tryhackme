const Driver = window.driver.js.driver;

const counter = (num) =>
  `<b class='counting text-[#212c42] absolute top-[3%] right-[9%]'>(${num}/6)</b>`;
const steps = [
  {
    element: "#controls-btns",
    popover: {
      title: "Control Buttons",
      description: `Run all the instructions at once - Run instructions one by one - Reset all memory. ${counter(
        1
      )}`,
      position: "bottom",
      showPrevButton: false,
    },
  },
  {
    element: "#select-code",
    popover: {
      title: "Example Codes",
      description: `Through this dropdown, you can choose different sets of instructions. ${counter(
        2
      )}`,
      position: "bottom",
      showPrevButton: false,
    },
  },
  {
    element: "#intro-section",
    popover: {
      title: "Instructions Block",
      description: `Here you can see different instruction codes.The green arrow presents the running command. ${counter(
        3
      )}`,
      position: "top",
    },
  },

  {
    element: "#register-section",
    popover: {
      title: "Registers & Flags Block",
      description: `Here you will see the registers values and checked flags. ${counter(
        4
      )}`,
      position: "top",
      showPrevButton: false,
    },
  },
  {
    element: "#memory-section",
    popover: {
      title: "Memory Block",
      description: `Here you will see the current command memory. ${counter(
        5
      )}`,
      position: "top",
      showPrevButton: false,
    },
  },
  {
    element: "#stack-section",
    popover: {
      title: "Stack Block",
      description: `Here you will see the stack and pointers. ${counter(6)}`,
      position: "top",
      showPrevButton: false,
    },
  },
];
const driver = new Driver({
  steps,
  closeBtnText: "Skip",
  nextBtnText: "Next",
  doneBtnText: "Next",
  onNext: () => {
    if (driver.currentStep >= driver.steps.length - 1)
      successfullGuidedComplete();
  },
});

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // Use smooth scrolling
  });
}
const successfullGuidedComplete = () => {
  const temp = `
     <div class="successfullGuided fixed top-0 left-0 w-full h-full flex items-center justify-center bg-[#000000a1] z-10 ">
        <div class="bg-[#151c2b] px-4 py-6 relative w-[550px] md:w-[50%] rounded-lg text-center relative">
        <b class='counting text-white absolute top-[3%] right-[9%]'>(6/6)</b>
           <h4 class="text-3xl mb-2">Congratulations!</h4>
          <p class="text-xl mb-3 m-auto"> You've completed our Assembly Emulator tour. We hope you found it helpful.</p>
          <div class="btn-container h-8 mt-4 ">
            <button class="w-[10rem] p-0 close-btn" style="padding:.2rem 0% !important;margin-left:auto !important; margin:0% ">Close</button>
          </div>
        </div>
    </div> 
  `;

  const body = document.querySelector("body");
  body.insertAdjacentHTML("afterbegin", temp);
  scrollToTop();

  document.querySelector(".close-btn").addEventListener("click", () => {
    document.querySelector(".successfullGuided").remove();
  });
};

const memoryAddress = [
  "0x0",
  "0x4",
  "0x8",
  "0xC",
  "0x10",
  "0x4B",
  "0x4C",
  "0x50",
];

let runSteps = () => {
  driver.drive();
};

// Start the introduction

let skip = undefined;
let startTour = undefined;
const getTourTemp = () => {
  const temp = `
    <div class="tour-temp fixed top-0 left-0 w-full h-full flex items-center justify-center bg-[#000000a1] z-10 ">
      <div class="bg-[#151c2b] p-4 rounded-lg">
        <img class="w-[130px]  m-auto" src="https://assets.tryhackme.com/img/logo/tryhackme_logo_full.svg"</img>
        <h4 class="text-3xl mb-1 text-center mt-6">THM Assembly Emulator!</h4>
        <p class=" mb-4 w-[90% ] m-auto">Would you like to take a guided tour to learn more about how to get started?</p>
        <span class="h-[2rem] mt-4 flex items-center justify-end  px-4">
          <button class="skip-take-tour m-0" style="padding:0px 1rem !important; margin:0% !important; margin-right:1rem !important;">Skip</button>
          <button class="yes-take-tour m-0" style="padding:0px 1rem !important; margin:0% !important;">Let's start</button>
        </span>
      </div>
    </div> 
  `;
  return temp;
};

const tourSiteHandler = () => {
  const body = document.querySelector("body");
  body.insertAdjacentHTML("afterbegin", getTourTemp());

  const skipBtn = document.querySelector(".skip-take-tour");
  const tourBtn = document.querySelector(".yes-take-tour");
  const tourTempContainer = document.querySelector(".tour-temp");

  skipBtn.addEventListener("click", () => {
    skip = true;
    startTour = false;
    tourTempContainer.remove();
  });
  tourBtn.addEventListener("click", () => {
    startTour = true;
    skip = false;
    tourTempContainer.remove();
    setTimeout(runSteps, 200);
  });
};

const initStack = () => {
  const stackContainer = document.getElementById("stack");

  let stackBody = "";
  const stackValues = [
    "0xFE4",
    "0xFE8",
    "0xFEC",
    "0xFF0",
    "0xFF4",
    "0xFF8",
    "0xFFC",
  ];
  stackValues.forEach((elem, index) => {
    const rounded =
      index === 0
        ? "rounded-t-md"
        : index === stackValues.length - 1
        ? "rounded-b-md"
        : "";
    stackBody += `<div id="stack-${elem}" class="item flex items-center ${rounded}">
      <p id="address-${elem}" class="address flex items-center justify-center rounded-r-md">${elem}</p>
      <p id="value-${elem}" class="value text-center grow"></p>
      </div>`;
  });
  stackContainer.innerHTML = stackBody;
};

const initMemory = () => {
  const container = document.getElementById("memory-table");

  let body = "";
  memoryAddress.forEach((elem) => {
    body += `<tr id="memory-item-${elem}" class="bg-white border-b memory-lists">
      <td class="px-6 py-4" id="memory-address-${elem}">${elem}</td>
      <td class="px-6 py-4" id="memory-int-${elem}">0</td>
      <td class="px-6 py-4" id="memory-uint-${elem}">0</td>
      <td class="px-6 py-4" id="memory-hex-${elem}">0x00000000</td>
    </tr>`;
  });
  container.innerHTML = body;
  return;
};

tourSiteHandler();
initStack();
initMemory();
const mainContainer = document.querySelector("#main-content");
const body = document.querySelector(".body");

// utils
let lineNoShowArrow = 0;
let islineNoShowArrowFirst = true;

let firstTime = true;
let showingData;
let isAlreadyRun = false;
let shouldContinue = true;

const guide = {
  mov: {
    command: "MOV-Move",
    args: `<b>DESTINATION</b>: general-purpose register, segment register or memory location; <br/> 
      <b>SOURCE</b>: immediate value, general-purpose register, segment register or memory location`,
    usage: "MOV DESTINATION,SOURCE",
  },
  add: {
    command: "ADD-Integer Addition",
    args: "<b>DESTINATION</b>: register or memory location; <br/> <b>SOURCE</b>: immediate value, register or memory location; (two memory operands cannot be used)",
    usage: "ADD DESTINATION,SOURCE",
  },
  nop: {
    command: "NOP-No Operation",
    args: "none",
    usage: "NOP",
  },
  sub: {
    command: "SUB-Integer Subtraction",
    args: "<b>DESTINATION</b>: register or memory location; <br/> <b>SOURCE</b>: immediate value, register or memory location",
    usage: "SUB DESTINATION,SOURCE",
  },
  inc: {
    command: "INC-Increment by 1",
    args: "<b>DESTINATION</b>: register or memory location",
    usage: "INC DESTINATION",
  },
  dec: {
    command: "DEC-Decrement by 1",
    args: "<b>DESTINATION</b>: general-purpose register or memory location",
    usage: "DEC DESTINATION",
  },
  mul: {
    command: "MUL-Unsigned Multiplication of AL or AX",
    args: "<b>DESTINATION</b>: any 8, 16 or 32 bit memory location or register",
    usage: "MUL DESTINATION",
  },
  push: {
    command: "PUSH-Push Operand onto the Stack",
    args: "<b>SRC</b>: 16 or 32 bit immediate value, register or memory location",
    usage: "PUSH SRC",
  },
  pop: {
    command: "POP-Pop a Word from the Stack",
    args: "DESTINATION 16 or 32 bit memory location or register or segment register",
    usage: "POP DESTINATION",
  },
  cmp: {
    command: "CMP-Compare Two Operands",
    args: "<b>SRC1</b>: Immediate, Register or memory location;<br/> <b>SRC2<b/>: Immediate, Register or memory location",
    usage: "CMP SRC1, SRC2",
  },
  test: {
    command: "TEST-Test For Bit Pattern",
    args: "DEST: Register or memory location of arbitrary size, SRC: Immediate, register or memory location",
    usage: "TEST DEST,SRC",
  },
  lea: {
    command: "LEA-Load Effective Address",
    args: "dest: 16 or 32 bit general purpose register, src: memory location",
    usage: "LEA dest, src",
  },
};

const data = {
  set1: [
    {
      code: "mov eax,20h",
      output: [
        { type: "Eax", value: "0x00000020" },
        { type: "Eip", value: "0x00000001" },
      ],
      guide: guide.mov,
    },
    {
      code: "mov ebx,30h",
      output: [
        { type: "Ebx", value: "0x00000030" },
        { type: "Esx", value: "0x00001000" },
        { type: "Eip", value: "0x00000002" },
      ],
      guide: guide.mov,
    },
    {
      code: "add eax,ebx",
      output: [
        { type: "Eax", value: "0x00000050" },
        { type: "Eip", value: "0x00000003" },
      ],
      guide: guide.add,
      checked: ["Parity"],
    },
    {
      code: "nop",
      output: [{ type: "Eip", value: "0x00000004" }],
      guide: guide.nop,
      checked: ["Parity"],
    },
    {
      code: "nop",
      output: [{ type: "Eip", value: "0x00000005" }],
      guide: guide.nop,
      checked: ["Parity"],
    },
    {
      code: "sub eax,ebx",
      output: [
        { type: "Eax", value: "0x00000020" },
        { type: "Eip", value: "0x00000006" },
      ],
      guide: guide.sub,
    },
    {
      code: "inc ebx",
      output: [
        { type: "Ebx", value: "0x00000031" },
        { type: "Eip", value: "0x00000007" },
      ],
      guide: guide.inc,
    },
    {
      code: "dec ebx",
      output: [
        { type: "Ebx", value: "0x00000030" },
        { type: "Eip", value: "0x00000008" },
      ],
      guide: guide.dec,
      checked: ["Parity", "Auxiliary"],
    },
    {
      code: "mul eax",
      output: [
        { type: "Eax", value: "0x00000400" },
        { type: "Edx", value: "0x00000000" },
        { type: "Eip", value: "0x00000009" },
      ],
      guide: guide.mul,
      checked: ["Parity", "Auxiliary"],
    },
  ],
  set2: [
    {
      code: "mov eax,10h",
      output: [
        { type: "Eax", value: "0x00000010" },
        { type: "Eip", value: "0x00000001" },
      ],
      guide: guide.mov,
    },
    {
      code: "mov ebx,32h",
      output: [
        { type: "Ebx", value: "0x00000032" },
        { type: "Eip", value: "0x00000002" },
      ],
      guide: guide.mov,
    },
    {
      code: "mov ecx,eax",
      output: [
        { type: "Ecx", value: "0x00000010" },
        { type: "Eip", value: "0x00000003" },
      ],
      guide: guide.mov,
    },

    {
      code: "mov [eax],40h",
      output: [{ type: "Eip", value: "0x00000004" }],
      guide: guide.mov,
      memory: [
        {
          address: "0x10",
          signedInt: "64",
          unSignedInt: "64",
          hex: "0x00000040",
        },
      ],
    },
    {
      code: "add [eax],30h",
      output: [{ type: "Eip", value: "0x00000005" }],
      guide: guide.add,
      memory: [
        {
          address: "0x10",
          signedInt: "112",
          unSignedInt: "112",
          hex: "0x00000070",
        },
      ],
    },
    {
      code: "mov [ebx],[eax]",
      output: [],
      guide: guide.mov,
      error: "Memory to memory data movement is not allowed.",
    },
  ],
  set3: [
    {
      code: "mov eax, 10h",
      output: [
        { type: "Eax", value: "0x00000010" },
        { type: "Eip", value: "0x00000001" },
      ],
      guide: guide.mov,
    },
    {
      code: "mov ebx, 15h",
      output: [
        { type: "Ebx", value: "0x00000015" },
        { type: "Eip", value: "0x00000002" },
      ],
      guide: guide.mov,
    },
    {
      code: "mov ecx, 20h",
      output: [
        { type: "Ecx", value: "0x00000020" },
        { type: "Eip", value: "0x00000003" },
      ],
      guide: guide.mov,
    },
    {
      code: "mov edx, 25h",
      output: [
        { type: "Edx", value: "0x00000025" },
        { type: "Eip", value: "0x00000004" },
      ],
      guide: guide.mov,
    },
    {
      code: "push eax",
      output: [
        { type: "Esp", value: "0x00000FFC" },
        { type: "Eip", value: "0x00000005" },
      ],
      stack: { address: "0xFFC", value: "0x00000010" },
      guide: guide.push,
    },
    {
      code: "push ebx",
      output: [
        { type: "Esp", value: "0x00000FF8" },
        { type: "Eip", value: "0x00000006" },
      ],
      stack: { address: "0xFF8", value: "0x00000015" },
      guide: guide.push,
    },
    {
      code: "push ecx",
      output: [
        { type: "Esp", value: "0x00000FF4" },
        { type: "Eip", value: "0x00000007" },
      ],
      stack: { address: "0xFF4", value: "0x00000020" },
      guide: guide.push,
    },
    {
      code: "push edx",
      output: [
        { type: "Esp", value: "0x00000FF0" },
        { type: "Eip", value: "0x00000008" },
      ],
      stack: { address: "0xFF0", value: "0x00000025" },
      guide: guide.push,
    },
    {
      code: "pop eax",
      output: [
        { type: "Eax", value: "0x00000025" },
        { type: "Esp", value: "0x00000FF4" },
        { type: "Eip", value: "0x00000009" },
      ],
      stack: { address: "0xFF0", value: "" },
      guide: guide.pop,
    },
    {
      code: "pop ebx",
      output: [
        { type: "Ebx", value: "0x00000020" },
        { type: "Esp", value: "0x00000FF8" },
        { type: "Eip", value: "0x0000000A" },
      ],
      stack: { address: "0xFF4", value: "" },
      guide: guide.pop,
    },
    {
      code: "pop ecx",
      output: [
        { type: "Ecx", value: "0x00000015" },
        { type: "Esp", value: "0x00000FFC" },
        { type: "Eip", value: "0x0000000B" },
      ],
      stack: { address: "0xFF8", value: "" },
      guide: guide.pop,
    },
    {
      code: "pop edx",
      output: [
        { type: "Edx", value: "0x00000010" },
        { type: "Esp", value: "0x00001000" },
        { type: "Eip", value: "0x0000000C" },
      ],
      stack: { address: "0xFFC", value: "" },
      guide: guide.pop,
    },
  ],
  set4: [
    {
      code: "mov eax,10h",
      output: [
        { type: "Eax", value: "0x00000010" },
        { type: "Eip", value: "0x00000001" },
      ],
      guide: guide.mov,
    },
    {
      code: "mov ebx,10h",
      output: [
        { type: "Ebx", value: "0x00000010" },
        { type: "Eip", value: "0x00000002" },
      ],
      guide: guide.mov,
    },
    {
      code: "cmp eax,ebx",
      output: [{ type: "Eip", value: "0x00000003" }],
      guide: guide.cmp,
      checked: ["Parity", "Zero"],
    },
    {
      code: "test eax,ebx",
      guide: guide.test,
      output: [{ type: "Eip", value: "0x00000004" }],
    },
    {
      code: "mov eax,20h",
      output: [
        { type: "Eax", value: "0x00000020" },
        { type: "Eip", value: "0x00000005" },
      ],
      guide: guide.mov,
    },
    {
      code: "mov ebx,10h",
      output: [
        { type: "Ebx", value: "0x00000010" },
        { type: "Eip", value: "0x00000006" },
      ],
      guide: guide.mov,
    },
    {
      code: "cmp eax,ebx",
      guide: guide.cmp,
      output: [{ type: "Eip", value: "0x00000007" }],
    },
    {
      code: "test eax,ebx",
      output: [{ type: "Eip", value: "0x00000008" }],
      guide: guide.test,
      checked: ["Parity", "Zero"],
    },
    {
      code: "mov eax,20h",
      output: [
        { type: "Eax", value: "0x00000020" },
        { type: "Eip", value: "0x00000009" },
      ],
      guide: guide.mov,
      checked: ["Parity", "Zero"],
    },
    {
      code: "mov ebx,40h",
      output: [
        { type: "Ebx", value: "0x00000040" },
        { type: "Eip", value: "0x0000000A" },
      ],
      guide: guide.mov,
      checked: ["Parity", "Zero"],
    },
    {
      code: "cmp eax,ebx",
      output: [{ type: "Eip", value: "0x0000000B" }],
      guide: guide.cmp,
      checked: ["Carry", "Sign"],
    },
    {
      code: "test eax,ebx",
      output: [{ type: "Eip", value: "0x0000000C" }],
      guide: guide.test,
      checked: ["Parity", "Zero"],
    },
  ],
  set5: [
    {
      code: "mov eax, 20h",
      output: [
        { type: "Eax", value: "0x00000020" },
        { type: "Eip", value: "0x00000001" },
      ],
      guide: guide.mov,
    },

    {
      code: "mov ebx, 30h",
      output: [
        { type: "Ebx", value: "0x00000030" },
        { type: "Eip", value: "0x00000002" },
      ],
      guide: guide.mov,
    },
    {
      code: "add eax,ebx",
      output: [
        { type: "Eax", value: "0x00000050" },
        { type: "Eip", value: "0x00000003" },
      ],
      guide: guide.add,
      checked: ["Parity"],
    },
    {
      code: "nop",
      output: [{ type: "Eip", value: "0x00000004" }],
      guide: guide.nop,
      checked: ["Parity"],
    },
    {
      code: "mov [eax],ebx",
      output: [{ type: "Eip", value: "0x00000005" }],
      memory: [
        {
          address: "0x50",
          signedInt: "48",
          unSignedInt: "48",
          hex: "0x00000030",
        },
      ],
      guide: guide.mov,
      checked: ["Parity"],
    },
    {
      code: "add ebx, 15h",
      output: [
        { type: "Ebx", value: "0x00000045" },
        { type: "Eip", value: "0x00000006" },
      ],
      guide: guide.add,
    },
    {
      code: "mov ecx, 6",
      output: [
        { type: "Ecx", value: "0x00000006" },
        { type: "Eip", value: "0x00000007" },
      ],
      guide: guide.mov,
    },
    {
      code: "mov [ebx+ecx], eax",
      output: [{ type: "Eip", value: "0x00000008" }],
      memory: [
        {
          address: "0x4B",
          signedInt: "1342177280",
          unSignedInt: "1342177280",
          hex: "0x50000000",
        },
        {
          address: "0x4C",
          signedInt: "0",
          unSignedInt: "0",
          hex: "0x00000000",
        },
      ],
      guide: guide.mov,
    },
    {
      code: "lea eax,[ebx+ecx]",
      output: [
        { type: "Eax", value: "0x0000004B" },
        { type: "Eip", value: "0x00000009" },
      ],
      guide: guide.lea,
    },
    {
      code: "push eax",
      output: [
        { type: "Esp", value: "0x00000FFC" },
        { type: "Eip", value: "0x0000000A" },
      ],
      stack: { address: "0xFFC", value: "0x0000004B" },
      guide: guide.push,
    },
    {
      code: "push ebx",
      output: [
        { type: "Esp", value: "0x00000FF8" },
        { type: "Eip", value: "0x0000000B" },
      ],
      stack: { address: "0xFF8", value: "0x00000045" },
      guide: guide.push,
    },
    {
      code: "pop ecx",
      output: [
        { type: "Ecx", value: "0x00000045" },
        { type: "Esp", value: "0x00000FFC" },
        { type: "Eip", value: "0x0000000C" },
      ],
      stack: { address: "0xFF8", value: "" },
      guide: guide.pop,
    },
  ],
};

const onChangeCode = (e) => {
  const selectedItemValue = e.target.value;
  firstTime = true;
  showingData = data[`set${selectedItemValue}`];

  resetHandler();
};

const toggleModal = (index) => {
  const data = showingData[index].guide;

  const { command, args, usage } = data;
  document.getElementById("command").innerHTML = command;
  document.getElementById("arguments").innerHTML = args;
  document.getElementById("usage").innerHTML = usage;

  document.getElementById("secret-btn").click();
};

// instrcution temp & handler
const instructionTemp = (instruction, program, number = 1, data) => {
  const arrow = program
    ? `<div><i class="fa-solid fa-right-long text-[#a3ea2a]"></i></div>`
    : `<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>`;
  return `
    <div class="flex items-center gap-3 relative pl-1">
      <span>${number}.</span>
      ${arrow}
      <p>${instruction}</p>
      <i 
        class="fa-solid fa-circle-info text-[#151c2b] cursor-pointer" onclick="toggleModal(${number})"
      >
      </i>
    </div>
  `;
};
function handlerInstructions(showArrow, isShow) {
  const instructionsListDoc = document.querySelector(".instructions-list");

  showingData = showingData || data.set1;

  const result = showingData.map((el, i) => {
    let isShowArrow = i == showArrow && isShow;

    return instructionTemp(el.code, isShowArrow, i, el.guide);
  });
  instructionsListDoc.innerHTML = "";
  instructionsListDoc.insertAdjacentHTML("afterbegin", result.join(""));
}
handlerInstructions(lineNoShowArrow);

// /////////////////////////
/////// controller-handlers
// ////////////////////////
const stepOverDoc = document.querySelector(".stepOverController");
const resetRepeatDoc = document.querySelector(".resetRepeatController");
const playAllDoc = document.querySelector(".playController");
const allInputFields = document.querySelectorAll(".register-inputs");
const allCheckedFields = document.querySelectorAll(".register-flags");

// handler for reseting the memory & all registers
const resetHandler = () => {
  // stop the loop in playAllHandler
  shouldContinue = false;

  // setting reset to line arrow
  lineNoShowArrow = 0;
  islineNoShowArrowFirst = true;

  // reseting the input-fields/check-boxes/memory-rows status
  deSelectInputs(true);
  deSelectCheckBoxs();
  deResetMemoryRows();

  // presenting default instructions
  handlerInstructions(lineNoShowArrow);

  // reseting the Stack
  resetStack();
};

// removing the highlighting from input fields & values
const deSelectInputs = (isValueChange) => {
  allInputFields.forEach((input) => {
    input.classList.remove("highlighted-input");
    let value = "0x00000000";
    if (["Esp", "Ebp"].includes(input.id)) {
      value = "0x00001000";
    }

    if (isValueChange) {
      input.value = value;
    }
  });
};

// removing check mark on all checkboxes
const deSelectCheckBoxs = () => {
  allCheckedFields.forEach((checkBox) => (checkBox.checked = false));
};

// removing memory values and reseting each row
const deResetMemoryRows = () => {
  const memoryListsDoc = document.querySelectorAll(".memory-lists");
  memoryListsDoc.forEach((list, i) => {
    list.classList.remove("highlighted-row");
    list.children[0].innerHTML = memoryAddress[i];
    list.children[1].innerHTML = "0";
    list.children[2].innerHTML = "0";
    list.children[3].innerHTML = "0x00000000";
  });
};

const resetStackHighlighted = () => {
  const items = document.getElementsByClassName("item");
  for (let elem of items) elem.classList.remove("highlighted");
};

const resetStackValues = () => {
  const items = document.getElementsByClassName("value");
  for (let elem of items) elem.innerText = "";
};

const resetStack = () => {
  resetStackHighlighted();
  resetStackValues();
};

const resetMemoryHighlighted = () => {
  const items = document.querySelectorAll(".memory-lists");
  for (let elem of items) elem.classList.remove("highlighted-row");
};

// highlighting the input fields and inserting values
const highlightMatchingInputFields = (output) => {
  allInputFields.forEach((input) => {
    if (input.id == output.type) {
      input.classList.add("highlighted-input");
      input.value = output.value;
    }
  });
};

// marking check on checkboxes
const checkedMatchingCheckFields = (field) => {
  allCheckedFields.forEach((checkBox) => {
    if (checkBox.id == field) {
      checkBox.checked = true;
    }
  });
};

// adding memory values to specific row
const checkMatchingMemoryRows = (memory) => {
  const { address: id, signedInt, unSignedInt, hex } = memory;
  document.getElementById(`memory-item-${id}`).classList.add("highlighted-row");
  document.getElementById(`memory-address-${id}`).innerText = id;
  document.getElementById(`memory-int-${id}`).innerText = signedInt;
  document.getElementById(`memory-uint-${id}`).innerText = unSignedInt;
  document.getElementById(`memory-hex-${id}`).innerText = hex;
};

const checkStack = (pair) => {
  const { address, value } = pair;

  document.getElementById(`value-${address}`).innerText = value;
  document.getElementById(`stack-${address}`).classList.add("highlighted");
};

// Executing the next commad from instruction
let stepChecker = false;

const stepOverHandler = () => {
  if (islineNoShowArrowFirst) {
    lineNoShowArrow = 0;
    islineNoShowArrowFirst = false;
  }

  if (lineNoShowArrow >= showingData.length) return;
  shouldContinue = true;

  // for input fields
  deSelectInputs();

  showingData[lineNoShowArrow].output.forEach((output) =>
    highlightMatchingInputFields(output)
  );

  // for check boxes
  deSelectCheckBoxs();
  showingData[lineNoShowArrow].checked?.forEach((check) =>
    checkedMatchingCheckFields(check)
  );

  resetStackHighlighted();
  resetMemoryHighlighted();
  // for memory
  showingData[lineNoShowArrow].memory?.forEach((memory) =>
    checkMatchingMemoryRows(memory)
  );

  // for stack
  const stack = showingData[lineNoShowArrow].stack;
  if (stack) checkStack(stack);

  const error = showingData[lineNoShowArrow].error;
  if (error) {
    document.getElementById("error-text").innerHTML = error;
    document.getElementById("error-trigger-btn").click();
  }

  handlerInstructions(lineNoShowArrow, true);
  lineNoShowArrow = lineNoShowArrow + 1;
  if (lineNoShowArrow > showingData.length - 1) return;
};

// Run the program handler && Executing all commad
const playAllHandler = async () => {
  if (isAlreadyRun) return;

  isAlreadyRun = true;
  shouldContinue = true;

  for (let i = 0; i < showingData.length && shouldContinue; i++) {
    await new Promise((resolve) => {
      stepOverHandler();
      setTimeout(resolve, 500);
    });
  }

  isAlreadyRun = false;
};

// Listener for  reset & set over code & run the program
resetRepeatDoc.addEventListener("click", resetHandler);
stepOverDoc.addEventListener("click", () => {
  if (isAlreadyRun) return;
  stepOverHandler();
});
playAllDoc.addEventListener("click", playAllHandler);
