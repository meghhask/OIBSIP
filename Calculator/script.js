let currentInput = "";
let display = document.getElementById("display");

function appendToDisplay(value) {
  currentInput += value;
  display.innerHTML = currentInput;
}

function clearDisplay() {
  currentInput = "";
  display.innerHTML = "0";
}

function calculate() {
  try {
    const result = eval(currentInput);
    currentInput = result.toString();
    display.innerHTML = currentInput;
  } catch (error) {
    display.innerHTML = "Error";
  }
}
