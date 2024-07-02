document.addEventListener("DOMContentLoaded", function() {
    const display = document.getElementById("display");
    const buttons = document.querySelectorAll(".btn");
    let currentInput = "";
    let operator = null;
    let previousInput = "";

    buttons.forEach(button => {
        button.addEventListener("click", function() {
            const value = button.getAttribute("data-value");

            if (value === "C") {
                currentInput = "";
                operator = null;
                previousInput = "";
                display.innerText = "";
                return;
            }

            if (value === "=") {
                if (currentInput !== "" && previousInput !== "" && operator !== null) {
                    currentInput = calculate(previousInput, currentInput, operator);
                    display.innerText = currentInput;
                    operator = null;
                    previousInput = "";
                }
                return;
            }

            if (["+", "-", "*", "/"].includes(value)) {
                if (currentInput !== "") {
                    if (previousInput !== "") {
                        currentInput = calculate(previousInput, currentInput, operator);
                    }
                    operator = value;
                    previousInput = currentInput;
                    currentInput = "";
                    display.innerText = previousInput + " " + operator;
                }
                return;
            }

            currentInput += value;
            display.innerText = previousInput + " " + operator + " " + currentInput;
        });
    });

    function calculate(a, b, operator) {
        a = parseFloat(a);
        b = parseFloat(b);
        switch (operator) {
            case "+":
                return (a + b).toString();
            case "-":
                return (a - b).toString();
            case "*":
                return (a * b).toString();
            case "/":
                return (a / b).toString();
            default:
                return b;
        }
    }
});
