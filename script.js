// VARIABLES

let digits = document.querySelectorAll("#digit-0, #digit-1, #digit-2, #digit-3, #digit-4, #digit-5, #digit-6, #digit-7, #digit-8, #digit-9");
digits = Array.from(digits).sort((a, b) => a.textContent - b.textContent);

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
        case "÷": 
        if(right == 0) {
            return "Can't divide by 0!"
        } else {
            return Math.round(left / right * 100) / 100;
        };
        case "*": return left * right;
        case "-": return left - right;
        case "+": return parseFloat(left) + parseFloat(right); 
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
        if(hasOperation(input.textContent) && !isOperator(lastCharacter) && input.textContent != "" && last != "Can't divide by 0!" && last != "NaN") {
            last = solve(input.textContent);
            updateDisplay(result, last);
            updateDisplay(input, last + " " + operator.textContent + " ");
        } else if(isOperator(lastCharacter)) {
            updateDisplay(input, input.textContent.slice(0, -3) + " " + operator.textContent + " ");
        } else if(input.textContent != "" && !hasOperation(input.textContent)) {
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
    if(last != "Can't divide by 0!") {
        updateDisplay(input, input.textContent + last);
    }
});

function countOccurences(string, word) {
    return string.split(word).length - 1;
}

point.addEventListener("click", () => {
    if(!isOperator(lastCharacter) && countOccurences(input.textContent, ".") <= 1 && input.textContent != "" && lastCharacter != ".") {
        updateDisplay(input, input.textContent + ".");
    }
});

// KEYBOARD INTEGRATION

const isNumber = str => str == 0 || str == 1 || str == 2 || str == 3 || str == 4 || str == 5 || str == 6 || str == 7 || str == 8 || str == 9 ;

document.addEventListener("keydown", (event) => {
    if(isNumber(event.key)) {
        digit = digits[event.key];
        updateDisplay(input, input.textContent + digit.textContent);
    } else if(event.key == "Enter" && hasOperation(input.textContent) && !isOperator(lastCharacter)) {
        last = solve(input.textContent);
        updateDisplay(result, last);
    } else if(event.key == "NumLock" && last != "Can't divide by 0!") {
        updateDisplay(input, input.textContent + last);
    } else if(event.key == "." && !isOperator(lastCharacter) && countOccurences(input.textContent, ".") <= 1 && input.textContent != "" && lastCharacter != ".") {
        updateDisplay(input, input.textContent + ".");
    } else if(isOperator(event.key) || event.key == "/" || event.key == "%") {
        operator = event.key;
        if(event.key == "/") {
            operator = "÷";
        }
        if(hasOperation(input.textContent) && !isOperator(lastCharacter) && input.textContent != "" && last != "Can't divide by 0!" && last != "NaN") {
            last = solve(input.textContent);
            updateDisplay(result, last);
            updateDisplay(input, last + " " + operator + " ");
        } else if(isOperator(lastCharacter)) {
            updateDisplay(input, input.textContent.slice(0, -3) + " " + operator + " ");
        } else if(input.textContent != "" && !hasOperation(input.textContent)) {
            updateDisplay(input, input.textContent + " " + operator + " ");
        }
    } else if(event.key == "Backspace") {
        if(isOperator(lastCharacter)) {
            updateDisplay(input, input.textContent.slice(0, -3));
        } else {
            updateDisplay(input, input.textContent.slice(0, -1));
        }
    } else if(event.key == "Delete") {
        updateDisplay(input, "");
        updateDisplay(result, "");
    }
});