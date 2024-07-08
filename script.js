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
  operatorOnEmptyLock: true,
  clear() {
    this.firstNumber = undefined;
    this.operator = undefined;
    this.secondNumber = undefined;
    this.resultDisplayed = false;
    this.operatorLock = false;
    this.operatorOnEmptyLock = true;
  },
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
  if (a == 0 || b == 0) {
    displayNumbers.textContent = 'ERROR, press "clear"';
    displayResult.textContent = "Can't divide by 0";
    throw new Error("Can't divide by 0");
  }
  return (a / b).toFixed(2);
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
  state.operatorOnEmptyLock = false;

  displayResult.textContent += value;
});

addGlobalEventListener('click', '.operator', (e) => {
  //In case user presses operator multiple times, it won't
  // continue executing operations
  if (state.operatorOnEmptyLock) {
    return;
  }

  if (!state.operatorLock) {
    state.secondNumber = parseInt(displayResult.textContent);
  } else {
    state.secondNumber = undefined;
  }

  // first number works as an accumulator
  state.firstNumber = operate(
    state.operator,
    state.firstNumber,
    state.secondNumber
  );

  // operate() works with previous operator, so then we define the new one
  state.operator = e.target.getAttribute('data-operator');
  displayNumbers.textContent = `${state.firstNumber} ${state.operator} `;

  // code for result here
  if (e.target.getAttribute('data-operator') == '=') {
    displayNumbers.textContent = '';
    displayResult.textContent = state.firstNumber;
    state.clear();
  } else {
    displayResult.textContent = state.firstNumber;
    state.operatorLock = true;
  }

  state.secondNumber = undefined;
  // this one is to check if the display is currently displaying the result
  // if so, when you click a number, it cleans it out in order to write the second number
  state.resultDisplayed = true;
});

addGlobalEventListener('click', '#clearBtn', (e) => {
  displayNumbers.textContent = '';
  displayResult.textContent = '';

  state.clear();
});

addGlobalEventListener('click', '#resultBtn', (e) => {});

function testAlert() {
  console.table(state);
}
