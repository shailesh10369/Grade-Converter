// DOM Elements
const themeToggle = document.getElementById("themeToggle");
const swapBtn = document.getElementById("swapBtn");
const convertBtn = document.getElementById("convertBtn");
const resultDiv = document.getElementById("result");
const inputValue = document.getElementById("inputValue");
const inputLabel = document.getElementById("inputLabel");
const fromTypeDisplay = document.getElementById("fromType");
const toTypeDisplay = document.getElementById("toType");
const formulaInfo = document.getElementById("formulaInfo");
const optionButtons = document.querySelectorAll(".option-btn");
const methodSelection = document.getElementById("methodSelection");
const methodButtons = document.querySelectorAll(".method-btn");
const methodIndividual = document.getElementById("methodIndividual");
const methodTotal = document.getElementById("methodTotal");
const regularInput = document.getElementById("regularInput");
const semesterInputs = document.getElementById("semesterInputs");
const addSemesterBtn = document.getElementById("addSemesterBtn");
const totalSGPA = document.getElementById("totalSGPA");
const totalSemesters = document.getElementById("totalSemesters");

// Current conversion types
let fromType = "sgpa";
let toType = "percentage";
let currentMethod = "individual";

// 🌙 Theme Toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const icon = themeToggle.querySelector("i");
  if (document.body.classList.contains("dark-mode")) {
    icon.classList.replace("fa-moon", "fa-sun");
  } else {
    icon.classList.replace("fa-sun", "fa-moon");
  }
});

// 🔘 Option Buttons
optionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    optionButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    fromType = button.dataset.from;
    toType = button.dataset.to;

    updateDisplay();
    updateInputMethods();
    updateFormulaInfo();
  });
});

// 🔁 Swap Functionality
swapBtn.addEventListener("click", () => {
  [fromType, toType] = [toType, fromType];

  let exactMatch = null;
  optionButtons.forEach((btn) => {
    if (btn.dataset.from === fromType && btn.dataset.to === toType) {
      exactMatch = btn;
    }
  });

  optionButtons.forEach((btn) => btn.classList.remove("active"));
  if (exactMatch) exactMatch.classList.add("active");

  updateDisplay();
  updateInputMethods();
  updateFormulaInfo();
  updateInputLabel();
});

// 📖 Method Selection
methodButtons.forEach((button) => {
  button.addEventListener("click", () => {
    methodButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    currentMethod = button.dataset.method;

    if (currentMethod === "individual") {
      methodIndividual.classList.add("active");
      methodTotal.classList.remove("active");
    } else {
      methodIndividual.classList.remove("active");
      methodTotal.classList.add("active");
    }
  });
});

// ➕ Add Semester
addSemesterBtn.addEventListener("click", () => {
  const semesterCount = semesterInputs.children.length + 1;
  const semesterItem = document.createElement("div");
  semesterItem.className = "semester-item";
  semesterItem.innerHTML = `
    <div class="semester-input-container">
      <i class="fas fa-hashtag"></i>
      <input type="number" class="semester-input" min="0" max="10" step="0.01" placeholder="Semester ${semesterCount}">
    </div>
    <button class="remove-semester">
      <i class="fas fa-times"></i>
    </button>
  `;
  semesterInputs.appendChild(semesterItem);

  const removeBtn = semesterItem.querySelector(".remove-semester");
  removeBtn.addEventListener("click", () => {
    semesterItem.remove();
    updateRemoveButtons();
  });

  updateRemoveButtons();
});

function initializeRemoveButtons() {
  const removeButtons = document.querySelectorAll(".remove-semester");
  removeButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      this.parentElement.remove();
      updateRemoveButtons();
    });
  });
  updateRemoveButtons();
}

function updateRemoveButtons() {
  const semesterItems = semesterInputs.querySelectorAll(".semester-item");
  semesterItems.forEach((item, index) => {
    const removeBtn = item.querySelector(".remove-semester");
    removeBtn.style.display = index >= 2 ? "flex" : "none";
  });
}

// 🧾 Update UI Display
function updateDisplay() {
  fromTypeDisplay.textContent = fromType.toUpperCase();
  toTypeDisplay.textContent = toType.toUpperCase();
}

function updateInputMethods() {
  if (fromType === "sgpa" && toType === "cgpa") {
    methodSelection.style.display = "flex";
    regularInput.classList.remove("active");
    methodIndividual.classList.add("active");
    methodTotal.classList.remove("active");
    convertBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Calculate';
  } else {
    methodSelection.style.display = "none";
    regularInput.classList.add("active");
    methodIndividual.classList.remove("active");
    methodTotal.classList.remove("active");
    updateInputLabel();
    convertBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Convert Now';
  }
}

function updateInputLabel() {
  let inputText = "";
  let placeholder = "";

  switch (fromType) {
    case "cgpa":
      inputText = "Enter CGPA";
      placeholder = "e.g., 8.5";
      inputValue.max = 10;
      break;
    case "sgpa":
      inputText = "Enter SGPA";
      placeholder = "e.g., 8.2";
      inputValue.max = 10;
      break;
    case "percentage":
      inputText = "Enter Percentage";
      placeholder = "e.g., 85.5";
      inputValue.max = 100;
      break;
    default:
      inputText = "Enter Value";
  }

  inputLabel.textContent = inputText;
  inputValue.placeholder = placeholder;
  inputValue.value = "";
  resultDiv.classList.remove("show");
}

function updateFormulaInfo() {
  let formulaText = "";

  if (fromType === "cgpa" && toType === "percentage")
    formulaText = "Using formula: CGPA × 9.5 = Percentage";
  else if (fromType === "percentage" && toType === "cgpa")
    formulaText = "Using formula: Percentage ÷ 9.5 = CGPA";
  else if (fromType === "sgpa" && toType === "percentage")
    formulaText = "Using formula: SGPA × 10 = Percentage";
  else if (fromType === "percentage" && toType === "sgpa")
    formulaText = "Using formula: Percentage ÷ 10 = SGPA";
  else if (fromType === "sgpa" && toType === "cgpa")
    formulaText = "Using formula: CGPA = Total SGPA ÷ Number of Semesters";
  else if (fromType === "cgpa" && toType === "sgpa")
    formulaText = "Using approximate conversion: CGPA ≈ SGPA";
  formulaInfo.textContent = formulaText;
}

// 📐 Conversion Functions
function convertCGPAtoPercentage(cgpa) {
  return (cgpa * 9.5).toFixed(2);
}
function convertPercentageToCGPA(percentage) {
  return (percentage / 9.5).toFixed(2);
}
function convertSGPAtoPercentage(sgpa) {
  return (sgpa * 10 - 7.5).toFixed(2);
}
function convertPercentageToSGPA(percentage) {
  return ((percentage - 7.5) / 10).toFixed(2);
}
function calculateCGPAFromIndividualSGPAs() {
  const semesterInputs = document.querySelectorAll(".semester-input");
  let total = 0;
  let validCount = 0;

  semesterInputs.forEach((input) => {
    const value = parseFloat(input.value);
    if (!isNaN(value) && value >= 0 && value <= 10) {
      total += value;
      validCount++;
    }
  });

  if (validCount === 0) {
    return { error: "Please enter at least one valid SGPA" };
  }
  return { cgpa: (total / validCount).toFixed(2), semesters: validCount };
}

function calculateCGPAFromTotal() {
  const total = parseFloat(totalSGPA.value);
  const semesters = parseInt(totalSemesters.value);

  if (isNaN(total) || total < 0) {
    return { error: "Please enter a valid total SGPA" };
  }
  if (isNaN(semesters) || semesters < 1) {
    return { error: "Please enter a valid number of semesters" };
  }
  return { cgpa: (total / semesters).toFixed(2), semesters: semesters };
}

// 🚀 Perform Conversion (with validation)
convertBtn.addEventListener("click", () => {
  let result = "";
  const value = parseFloat(inputValue.value);

  // ✅ Validate input range before conversion
  if (regularInput.classList.contains("active")) {
    if (isNaN(value)) return showError("Please enter a number first.");

    if (fromType === "percentage" && (value < 0 || value > 100))
      return showError("Please enter a valid percentage (0–100).");

    if (
      (fromType === "sgpa" || fromType === "cgpa") &&
      (value < 0 || value > 10)
    )
      return showError("Please enter a valid value (0–10).");
  }

  // SGPA → CGPA (with methods)
  if (fromType === "sgpa" && toType === "cgpa") {
    let calc =
      currentMethod === "individual"
        ? calculateCGPAFromIndividualSGPAs()
        : calculateCGPAFromTotal();

    if (calc.error) return showError(calc.error);
    result = `Your CGPA is ${calc.cgpa}`;
  } else if (fromType === "cgpa" && toType === "percentage") {
    result = `Percentage: ${convertCGPAtoPercentage(value)}%`;
  } else if (fromType === "percentage" && toType === "cgpa") {
    result = `CGPA: ${convertPercentageToCGPA(value)}`;
  } else if (fromType === "sgpa" && toType === "percentage") {
    result = `Percentage: ${convertSGPAtoPercentage(value)}%`;
  } else if (fromType === "percentage" && toType === "sgpa") {
    result = `SGPA: ${convertPercentageToSGPA(value)}`;
  } else if (fromType === "cgpa" && toType === "sgpa") {
    result = `SGPA (approx.): ${value.toFixed(2)}`;
  } else {
    result = "Conversion not available for the selected types.";
  }

  resultDiv.style.color = "var(--primary)";
  resultDiv.textContent = result;
  resultDiv.classList.add("show");
});

function showError(msg) {
  resultDiv.textContent = msg;
  resultDiv.style.color = "var(--secondary)";
  resultDiv.classList.add("show");
}

// Initialize
updateInputLabel();
updateFormulaInfo();
initializeRemoveButtons();
updateRemoveButtons();
