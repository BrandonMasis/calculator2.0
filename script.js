const numberBtns = document.querySelectorAll('.button');
const operatorBtns = document.querySelectorAll('.operator');
const displayNumbers = document.querySelector('#displayNumbers');
const displayResult = document.querySelector('#displayResult');

const state = {
  firstNumber: undefined,
  operator: undefined,
  secondNumber: undefined,
  resultDisplayed: false,
  operatorLock: false,
};

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
  if (first == undefined) {
    return second;
  } else if (second == undefined) {
    return first;
  }

  switch (operator) {
    case '+':
      return add(first, second);
    case '-':
      return substract(first, second);
    case '*':
      return multiply(first, second);
    case '/':
      return divide(first, second);
  }
}

function addGlobalEventListener(type, selector, callback) {
  document.addEventListener(type, (e) => {
    if (e.target.matches(selector)) callback(e);
  });
}

addGlobalEventListener('click', '.button', (e) => {
  let value = e.target.textContent;

  if (state.resultDisplayed) {
    displayResult.textContent = '';
    state.resultDisplayed = false;
  }

  state.operatorLock = false;

  displayResult.textContent += value;
});

addGlobalEventListener('click', '.operator', (e) => {
  if (!state.operatorLock) {
    state.secondNumber = parseInt(displayResult.textContent);
  } else {
    state.secondNumber = undefined;
  }
  state.firstNumber = operate(
    state.operator,
    state.firstNumber,
    state.secondNumber
  );
  state.operator = e.target.getAttribute('data-operator');
  displayNumbers.textContent = `${state.firstNumber} ${state.operator} `;

  displayResult.textContent = state.firstNumber;
  state.secondNumber = undefined;
  state.operatorLock = true;
  state.resultDisplayed = true;
});

addGlobalEventListener('click', '#clearBtn', (e) => {
  displayNumbers.textContent = '';
  displayResult.textContent = '';

  state.firstNumber = undefined;
  state.secondNumber = undefined;
  state.operator = undefined;
  state.resultDisplayed = false;
  state.operatorLock = false;
});

function testAlert() {
  alert(
    `first: ${state.firstNumber} second: ${state.secondNumber} operator: ${state.operator}`
  );
}
