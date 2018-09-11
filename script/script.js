var container = document.getElementById("container");
var output = document.getElementById("output");
var anchor = document.querySelectorAll("a");
var button = document.getElementById("button");







var enter = document.querySelector(".enter");
var clear = document.querySelector(".clear");
var displayValue = [0];
var numButton = document.querySelectorAll(".num");
anchor = Array.from(anchor);

for (let key in anchor) {
    let btn = anchor[key];
    btn.addEventListener("click", function() {
        outputVal(btn);
    })
}

function operate(number) {
    console.log(number);

    for (let key in number) {
        if (number[key] == "+") {

            return add(number[+key - 1], number[+key + 1]);
        } else if (number[key] == "-") {

            return subtract(number[+key - 1], number[+key + 1]);
        } else if (number[key] == "*") {

            return multiply(number[+key - 1], number[+key + 1]);
        } else if (number[key] == "/") {

            return divide(number[+key - 1], number[+key + 1]);
        } else if (number[0] == 0) {
            delete number[0];
        }
    }
    ;function add(x, y) {
        const addNum = +x + +y;
        return addNum;
    }

    function subtract(x, y) {
        const subtractNum = +x - +y;
        return subtractNum;
    }

    function multiply(x, y) {
        const multiplyNum = +x * +y;
        return multiplyNum;
    }

    function divide(x, y) {
        const divideNum = +x / +y;
        return divideNum;
    }
    console.log(functCall);
    return add(num);
}

function outputVal(val) {
    var string = output.textContent;
    var buttonVal = numButton.value;

    if(typeof buttonVal == "number") {
        console.log(buttonVal);
    }

    let last = string.charAt(string.length - 1);

    val = val.text;

    if (output.textContent == "0") {
        output.textContent = val;
        displayValue.push(val);
    } else if (last != ".") {
        output.textContent += val;
        displayValue.push(val);
    } else if (last == "." && val != ".") {
        output.textContent += val;
        displayValue.push(val);
    }

    return displayValue;
}




function combineNumbers(num) {
    var numKey = "0123456789";
    numKey = [...numKey];
    var equation = [];

    for (let key in num) {
        for (let prop in numKey) {

            if (num[key] == numKey[prop] && +key !== 0 && num[key - 1] !== undefined) {

                num[key] = num[key - 1] + num[key];
                delete num[key - 1];

            } else if (num[key] == "+" || num[key] == "-" || num[key] == "*" || num[key] == "/") {
                equation.push(num[+key - 1]);
                equation.push(num[key]);
                delete num[key];
                delete num[key];
            }
        }
    }
    equation.push(num.pop());
    return equation;
}



clear.addEventListener("click", function() {
    output.textContent = 0;
    displayValue = [];
})

enter.addEventListener("click", function() {
    displayValue = displayValue.slice(0, displayValue.length - 1);
    
    if(displayValue[0] === 0) {
        displayValue = displayValue.slice(1, displayValue.length);
    }
    
    
    let newAry = combineNumbers(displayValue);
    
    let answer = operate(newAry);
    output.textContent = answer;
    displayValue = [answer];
    //return operate(displayValue);
})
