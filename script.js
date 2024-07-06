const numberBtns = document.querySelectorAll('.button');
const operatorBtns = document.querySelectorAll('.operator');
const calcDisplay = document.querySelector('#display');

let firstNumber;
let operator;
let secondNumber;

const add = (a, b) => {
  return a + b;
};

const substract = (a, b) => {
  return a - b;
};

const multiply = (a, b) => {
  return a * b;
};

const divide = (a, b) => {
  return a / b;
};

function operate(operator, first, second) {
  switch (operator) {
    case '+':
      return add(first, second);
      break;
    case '-':
      return substract(first, second);
      break;
    case '*':
      return multiply(first, second);
      break;
    case '/':
      return divide(first, second);
      break;
  }
}

// function to populate display when you click the number

function addGlobalEventListener(type, selector, callback) {
  document.addEventListener(type, (e) => {
    if (e.target.matches(selector)) callback(e);
  });
}

addGlobalEventListener('click', '.button, .operator', (e) => {
  let value = e.target.textContent;

  calcDisplay.textContent += value;
});
