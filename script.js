const digits = document.querySelectorAll("#digit-0, #digit-1, #digit-2, #digit-3, #digit-4, #digit-5, #digit-6, #digit-7, #digit-8, #digit-9");

const del = document.querySelector("#delete");
const clear = document.querySelector("#clear");

const operators = document.querySelectorAll("#multiply, #divide, #plus, #minus, #remainder");

const multi = document.querySelector("#multiply");
const division = document.querySelector("#divide");
const plus = document.querySelector("#plus");
const minus = document.querySelector("#minus");
const remainder = document.querySelector("#remainder");

const point = document.querySelector("#point");
const answer = document.querySelector("#answer");
const equal = document.querySelector("#equal");

const input = document.querySelector(".user-input");
const result = document.querySelector(".result");

let last = "";
let lastCharacter = "";

// OPERATIONS

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    return operator(a, b);
}

function updateDisplay(type, content) {
    type.textContent = content;
    lastCharacter = input.textContent.replace(/\s+/g, '').slice(-1);
}

function hasOperation(str) {
    if(str.includes("+") || str.includes("-") || str.includes("*") || str.includes("÷") || str.includes("%")) {
        return true;
    } else {
        return false;
    }
}

function isOperator(character) {
    const operators = "÷*-+%";
    for(let j = 0; j < operators.length; j++) {
        if(character === operators[j]) {
            return true;
        }
    }
    return false;
}

function solve(str) {
    str = str.replace(/\s+/g, '');
    const operators = "÷*-+%";
    let op = "";
    let pos = 0;
    for(let i = 1; i < str.length; i++) {
        for(let j = 0; j < operators.length; j++) {
            if(str[i] === operators[j]) {
                op = operators[j];
                pos = i;
            }
        }
    }
    const left = str.substr(0, pos);
    const right = str.substr(pos + 1);
    switch (op) {
        case "%": return left % right;
        case "÷": return Math.round(left / right * 100) / 100;
        case "*": return left * right;
        case "-": return left - right;
        case "+": return parseInt(left) + parseInt(right); 
    }
}

// SCREEN CONTENT

input.textContent = "";
result.textContent = "";

// DIGITS

digits.forEach(digit => {
    digit.addEventListener("click", () => {
        updateDisplay(input, input.textContent + digit.textContent);
    })
});

// DELETE AND CLEAR

del.addEventListener("click", () => {
    if(isOperator(lastCharacter)) {
        updateDisplay(input, input.textContent.slice(0, -3));
    } else {
        updateDisplay(input, input.textContent.slice(0, -1));
    }
});

clear.addEventListener("click", () => {
    updateDisplay(input, "");
    updateDisplay(result, "");
});

// OPERATORS

operators.forEach(operator => {
    operator.addEventListener("click", () => {
        console.log(lastCharacter + " is the last");
        if(hasOperation(input.textContent) && !isOperator(lastCharacter)) {
            last = solve(input.textContent);
            updateDisplay(result, last);
            updateDisplay(input, last + " " + operator.textContent + " ");
        } else if(isOperator(lastCharacter)) {
            updateDisplay(input, input.textContent.slice(0, -3) + " " + operator.textContent + " ");
        } else {
            updateDisplay(input, input.textContent + " " + operator.textContent + " ");
        }
    })
});

// EQUAL, ANSWER AND POINT

equal.addEventListener("click", () => {
    if(hasOperation(input.textContent) && !isOperator(lastCharacter)) {
        last = solve(input.textContent);
        updateDisplay(result, last);
    }
});

answer.addEventListener("click", () => {
    updateDisplay(input, input.textContent + last);
});

point.addEventListener("click", () => {
    if(!isOperator(lastCharacter) && !input.textContent.includes(".") && input.textContent !== "") {
        updateDisplay(input, input.textContent + ".");
    }
});