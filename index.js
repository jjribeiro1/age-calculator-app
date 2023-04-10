const dayContainer = document.querySelector("#day-container");
const monthContainer = document.querySelector("#month-container");
const yearContainer = document.querySelector("#year-container");
const inputYear = document.querySelector("#year");
const inputMonth = document.querySelector("#month");
const inputDay = document.querySelector("#day");
const btnSubmit = document.querySelector(".btn-submit");
const yearResult = document.querySelector("#year-result");
const monthResult = document.querySelector("#month-result");
const dayResult = document.querySelector("#day-result");

function validateInputDayValue() {
  if (inputDay.value.length === 0) {
    createSpanErrorDayMsg("this field is required");
    return false;
  }
  if (inputDay.value.length > 2) {
    createSpanErrorDayMsg("must be a valid day");
    return false;
  }

  if (parseInt(inputDay.value) < 1 || parseInt(inputDay.value) > 31) {
    createSpanErrorDayMsg("must be a valid day");
    return false;
  }

  if (parseInt(inputDay.value) > 28 && parseInt(inputMonth.value) === 2) {
    createSpanErrorDayMsg("must be a valid date");
    return false;
  }

  if (inputDay.value === "31") {
    const validMonth = ["01", "03", "05", "07", "08", "10", "12"].some(
      (value) => value === inputMonth.value
    );
    if (!validMonth) {
      createSpanErrorDayMsg("must be a valid date");
      return false;
    }
  }

  return true;
}

function validateInputMonthValue() {
  if (inputMonth.value.length === 0) {
    createSpanErrorMonthMsg("this field is required");
    return false;
  }
  if (inputMonth.value.length > 2) {
    createSpanErrorMonthMsg("must be a valid month");
    return false;
  }

  if (parseInt(inputMonth.value) < 1 || parseInt(inputMonth.value) > 12) {
    createSpanErrorMonthMsg("must be a valid month");
    return false;
  }

  return true;
}

function validateInputYearValue() {
  const today = new Date().getTime();
  const birthDay = new Date(
    `${inputYear.value}-${inputMonth.value}-${inputDay.value}T00:00:00`
  ).getTime();

  if (inputYear.value.length === 0) {
    createSpanErrorYearMsg("this field is required");
    return false;
  }

  if (inputYear.value.length !== 4) {
    createSpanErrorYearMsg("invalid year format");
    return false;
  }

  if (today < birthDay) {
    createSpanErrorYearMsg("must be in the past");
    return false;
  }

  return true;
}

function allInputValuesIsValid() {
  const inputDayIsValid = validateInputDayValue();
  const inputMonthIsValid = validateInputMonthValue();
  const inputYearIsValid = validateInputYearValue();

  return inputDayIsValid && inputMonthIsValid && inputYearIsValid;
}

function setResultValues(years, months, days) {
  yearResult.textContent = years;
  monthResult.textContent = months;
  dayResult.textContent = days;
}

function resetResultValues() {
  yearResult.textContent = "--";
  monthResult.textContent = "--";
  dayResult.textContent = "--";
}

function createSpanErrorDayMsg(message) {
  const errorMsgSpan = document.querySelector("#day-error-message");
  if (errorMsgSpan) {
    errorMsgSpan.textContent = message;
    dayContainer.insertAdjacentElement("beforeend", errorMsgSpan);
  } else {
    const span = document.createElement("span");
    span.classList.add("error-msg");
    span.setAttribute("id", "day-error-message");
    span.textContent = message;
    dayContainer.insertAdjacentElement("beforeend", span);
  }
}

function createSpanErrorMonthMsg(message) {
  const errorMsgSpan = document.querySelector("#month-error-message");
  if (errorMsgSpan) {
    errorMsgSpan.textContent = message;
    monthContainer.insertAdjacentElement("beforeend", errorMsgSpan);
  } else {
    const span = document.createElement("span");
    span.classList.add("error-msg");
    span.setAttribute("id", "month-error-message");
    span.textContent = message;
    monthContainer.insertAdjacentElement("beforeend", span);
  }
}

function createSpanErrorYearMsg(message) {
  const errorMsgSpan = document.querySelector("#year-error-message");
  if (errorMsgSpan) {
    errorMsgSpan.textContent = message;
    yearContainer.insertAdjacentElement("beforeend", errorMsgSpan);
  } else {
    const span = document.createElement("span");
    span.classList.add("error-msg");
    span.setAttribute("id", "year-error-message");
    span.textContent = message;
    yearContainer.insertAdjacentElement("beforeend", span);
  }
}

function resetErrorMessages() {
  const errorMessages = document.querySelectorAll(".error-msg");
  if (errorMessages.length > 0) {
    errorMessages.forEach((message) => {
      message.remove();
    });
  }
}

function inputLabelErrorStyle() {
  const labels = document.querySelectorAll("label");
  labels.forEach((label) => {
    label.style.color = "hsl(0, 100%, 67%)";
  });
  inputDay.style.borderColor = "hsl(0, 100%, 67%)";
  inputMonth.style.borderColor = "hsl(0, 100%, 67%)";
  inputYear.style.borderColor = "hsl(0, 100%, 67%)";
}

function initialInputLabelStyle() {
  const labels = document.querySelectorAll("label");
  labels.forEach((label) => {
    label.style.color = "hsl(0, 1%, 44%)";
  });
  inputDay.style.borderColor = "hsl(0, 0%, 86%)";
  inputMonth.style.borderColor = "hsl(0, 0%, 86%)";
  inputYear.style.borderColor = "hsl(0, 0%, 86%)";
}

function formattedBirthDayToCalculate() {
  let day = inputDay.value;
  let month = inputMonth.value;
  let year = inputYear.value;
  if (day.length === 1) {
    day = day.padStart(2, "0");
  }
  if (month.length === 1) {
    month = month.padStart(2, "0");
  }
  return `${year}-${month}-${day}T00:00:00`;
}

function calculateAge() {
  resetErrorMessages();
  if (!allInputValuesIsValid()) {
    inputLabelErrorStyle();
    resetResultValues();
    return;
  }
  initialInputLabelStyle();
  const today = new Date();
  const birthDay = new Date(formattedBirthDayToCalculate());
  const diffYear = today.getFullYear() - birthDay.getFullYear();
  const diffMonths = today.getMonth() - birthDay.getMonth();
  const diffDays = today.getDate() - birthDay.getDate();

  let years = diffYear;
  let months = diffMonths;
  if (diffMonths < 0 || (diffMonths === 0 && diffDays < 0)) {
    years--;
    months = 12 + diffMonths;
  }

  let days = diffDays;

  if (diffDays < 0) {
    const lastDayPrevMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      0
    ).getDate();
    months--;
    days = lastDayPrevMonth + diffDays;
  }

  setResultValues(years, months, days);
}

btnSubmit.addEventListener("click", calculateAge);
