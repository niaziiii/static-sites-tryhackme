const fetchTrainingBtn = document.querySelector("#fetch-training");
const dashboardBtns = document.querySelectorAll("#tab-header");
const allDashboardTables = document.querySelectorAll(".dashboard-tables");
const employeeTable = document.querySelector(".employe-table-body");

let training = [];
const employees = [
  {
    name: "Josh",
    department: "Computer Science",
    updated: "2-10-23",
  },
  {
    name: "Alice",
    department: "Marketing",
    updated: "9-2-22",
  },
  {
    name: "Bob",
    department: "Finance",
    updated: "22-4-23",
  },
  {
    name: "Charlie",
    department: "Human Resources",
    updated: "18-10-23",
  },
  {
    name: "David",
    department: "Engineering",
    updated: "11-1-23",
  },
  {
    name: "Eva",
    department: "Sales",
    updated: "28-6-23",
  },
  {
    name: "Frank",
    department: "Operations",
    updated: "2-10-23",
  },
];

// fun : for generation of html template of employees
const employeeTableTemplates = (emp) => {
  return `
  <tr class="odd:bg-[#212c42] even:bg-[#151c2b] even:dark:bg-gray-800 border-b dark:border-gray-700">
      <th scope="row" class="px-6 py-4 font-medium text-white whitespace-nowrap dark:text-white">
          ${emp.name}
      </th>
      <td class="px-6 py-4">
      ${emp.department}
      </td>
      <td class="px-6 py-4">
      ${emp.updated}
      </td>
  </tr>
   `;
};
const renderEmployeeTable = async () => {
  let saveEmployesTemp = [];

  for (let index = 0; index < 7; index++) {
    saveEmployesTemp.push(employeeTableTemplates(employees[index]));
  }

  employeeTable.insertAdjacentHTML("afterbegin", saveEmployesTemp.join(" "));
};

renderEmployeeTable();

// fun : to get fetch all training data from given training url
const fetchTraining = async () => {
  alert("fetching training data has been started!");
  var currentUrl = window.location.href;
  var trainingUrl = "http://192.168.1.1/file.php";
  var newUrl = currentUrl + ".php?url=" + encodeURIComponent(trainingUrl);

  training = [];
  try {
    const response = await fetch(newUrl, { method: "GET" });
    const trainers = await response.json();
    return trainers;
  } catch (error) {
    console.log({ error });
  } finally {
    console.log({ fetchTrainingBtn });
  }
};

// fetchTrainingBtn.addEventListener("click", fetchTraining);
