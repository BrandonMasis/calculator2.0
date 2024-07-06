// add
// subtract
// multiply
// divide

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
