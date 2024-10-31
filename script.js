const datepicker = document.getElementById("datepicker");
const calendar = document.getElementById("calendar");
const monthLabel = document.getElementById("month-label");
const currentDate = new Date();
let selectedYear = currentDate.getFullYear();
let selectedMonth = currentDate.getMonth();

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function createCalendar(year, month) {
  calendar.innerHTML = `
        <div class="month-controls">
            <button id="prev-month">←</button>
            <span id="month-label">${monthNames[month]} ${year}</span>
            <button id="next-month">→</button>
        </div>
    `;

  const firstDay = new Date(year, month).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const header = document.createElement("tr");
  ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].forEach((day) => {
    const th = document.createElement("th");
    th.textContent = day;
    header.appendChild(th);
  });

  const table = document.createElement("table");
  table.appendChild(header);

  let row = document.createElement("tr");
  for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) {
    row.appendChild(document.createElement("td"));
  }

  for (let day = 1; day <= daysInMonth; day++) {
    if (row.children.length === 7) {
      table.appendChild(row);
      row = document.createElement("tr");
    }
    const cell = document.createElement("td");
    cell.textContent = day;
    cell.onclick = () => selectDate(year, month, day);
    row.appendChild(cell);
  }

  if (row.children.length > 0) {
    table.appendChild(row);
  }

  calendar.appendChild(table);

  document.getElementById("prev-month").onclick = (event) => {
    event.stopPropagation();
    changeMonth(-1);
  };

  document.getElementById("next-month").onclick = (event) => {
    event.stopPropagation();
    changeMonth(1);
  };
}

function changeMonth(direction) {
  selectedMonth += direction;
  if (selectedMonth < 0) {
    selectedMonth = 11;
    selectedYear--;
  } else if (selectedMonth > 11) {
    selectedMonth = 0;
    selectedYear++;
  }
  createCalendar(selectedYear, selectedMonth);
}

function selectDate(year, month, day) {
  const selectedDate = new Date(year, month, day);
  datepicker.value = selectedDate.toLocaleDateString();
  calendar.style.display = "none";
}

datepicker.addEventListener("click", (event) => {
  event.stopPropagation();
  calendar.style.display = calendar.style.display === "none" ? "block" : "none";
  createCalendar(selectedYear, selectedMonth);
});

document.addEventListener("click", (event) => {
  if (!datepicker.contains(event.target) && !calendar.contains(event.target)) {
    calendar.style.display = "none";
  }
});
