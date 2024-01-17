const btnAll = document.querySelectorAll("button");
const inputF = document.querySelector("input");

let currNum = '';
let pendOperation = null;
let firstOperand = null;

function handleButtonClick(evt) {
  const buttonText = evt.target.innerText;

  if (isNaN(buttonText)) {
    handleOperator(buttonText);
  } else {
    handleNumber(buttonText);
  }
}

function handleNumber(buttonText) {
  currNum += buttonText;
  inputF.value = currNum;
}

function handleOperator(buttonText) {
  switch (buttonText) {
    case "=":
      calcResult();
      break;
    case "c":
      clearResult();
      break;
    case "[x]":
      removeLastDigit();
      break;
    case ".":
      handleDecimal();
      break;
    default:
      inputF.value = buttonText;
      pendOperation = buttonText;
      firstOperand = parseFloat(currNum);
      currNum = '';
      break;
  }
}

function calcResult() {
  const secondOperand = parseFloat(currNum);
  let result;

  switch (pendOperation) {
    case "+":
      result = firstOperand + secondOperand;
      break;
    case "-":
      result = firstOperand - secondOperand;
      break;
    case "*":
      result = firstOperand * secondOperand;
      break;
    case "%":
      result = firstOperand % secondOperand;
      break; 
    case "/":
      if (secondOperand === 0) {
        inputF.value = "Error: Division by 0";
        return;
      }
      result = firstOperand / secondOperand;
      break;
    default:
      result = parseFloat(currNum);
  }
  inputF.value = result;
}

function clearResult() {
  currNum = '';
  pendOperation = null;
  firstOperand = null;
  inputF.value = '';
}

function removeLastDigit() {
  currNum = currNum.slice(0, -1);
  inputF.value = currNum;
}

function handleDecimal() {
  if (!currNum.includes(".")) {
    currNum += ".";
    inputF.value = currNum;
  }
}

btnAll.forEach(button => button.addEventListener("click", handleButtonClick));