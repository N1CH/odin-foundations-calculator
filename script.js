const digit0 = document.querySelector("#digit-0");
const digit1 = document.querySelector("#digit-1");
const digit2 = document.querySelector("#digit-2");
const digit3 = document.querySelector("#digit-3");
const digit4 = document.querySelector("#digit-4");
const digit5 = document.querySelector("#digit-5");
const digit6 = document.querySelector("#digit-6");
const digit7 = document.querySelector("#digit-7");
const digit8 = document.querySelector("#digit-8");
const digit9 = document.querySelector("#digit-9");

const del = document.querySelector("#delete");
const clear = document.querySelector("#clear");

const multiply = document.querySelector("#multiply");
const divide = document.querySelector("#divide");
const plus = document.querySelector("#plus");
const minus = document.querySelector("#minus");
const point = document.querySelector("#point");
const remainder = document.querySelector("#remainder");
const answer = document.querySelector("#answer");
const equal = document.querySelector("#equal");

const equation = document.querySelector(".upper-screen");
const result = document.querySelector(".lower-screen");

// SCREEN CONTENT

equation.textContent = "";
result.textContent = "";

// DIGITS

digit0.addEventListener("click", () => {
    equation.textContent = equation.textContent + 0;
});

digit1.addEventListener("click", () => {
    equation.textContent = equation.textContent + 1;
});

digit2.addEventListener("click", () => {
    equation.textContent = equation.textContent + 2;
});

// DELETE AND CLEAR

del.addEventListener("click", () => {
    equation.textContent = equation.textContent.slice(0, -1);
});

clear.addEventListener("click", () => {
    equation.textContent = ""
});

// OPERATORS