var container = document.getElementById("container");
var output = document.getElementById("output");

var anchor = document.querySelectorAll("a");
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

            number[+key+1] = add(number[+key - 1], number[+key + 1]);
        } else if (number[key] == "-") {

            number[+key+1] = subtract(number[+key - 1], number[+key + 1]);
        } else if (number[key] == "*") {

            number[+key+1] = multiply(number[+key - 1], number[+key + 1]);
        } else if (number[key] == "/") {
            number[+key+1] = divide(number[+key - 1], number[+key + 1]);
        }
    }
    function add(x, y) {
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
    return number[number.length-1];
}

function outputVal(val) {
    var string = output.textContent;
    let last = string.charAt(string.length - 1);
    val = val.text;

    var search = [...string];

    const find = search.some(char => (char == ".") ? true : false);

    console.log(find);

    if (val !== "enter") {
        if (output.textContent == "0" && val !== "+" && val !== "*" && val !== "/") {
            output.textContent = val;
            displayValue.push(val);
        } else if (last != ".") {
            output.textContent += val;
            displayValue.push(val);
        } else if (last == "." && val != ".") {
            output.textContent += val;
            displayValue.push(val);
        }
    }
    return displayValue;
}

function combineNumbers(num) {
    var numKey = "0123456789";
    numKey = [...numKey];
    var equation = [];

    for (let key in num) {
        for (let prop in numKey) {

            if (num[key] == numKey[prop] && +key !== 0 && num[key - 1] !== undefined || num[key] === ".") {
                if(num[key-1] === undefined && num[key] === ".") {
                    num[key] = "0" + num[key];
                } else if(num[key] === ".") {
                    num[key] = num[key-1] + num[key];
                    delete num[key-1];
                } else {
                    num[key] = num[key - 1] + num[key];
                    delete num[key - 1];
                }

            } else if (num[key] == "+" || num[key] == "*" || num[key] == "/" || num[key] == "-") {
                equation.push(num[+key - 1]);
                equation.push(num[key]);
                delete num[key - 1];
                delete num[key];
            } 
//             else if(key == 0 && num[key] == "-") {
//                 num[]
//             }
        }
    }
    equation.push(num.pop());
    return equation;
}

clear.addEventListener("click", function() {
    output.textContent = 0;
    displayValue = [0];
})

enter.addEventListener("click", function() {

    displayValue = [0, ...output.textContent];
    let newAry = combineNumbers(displayValue);
    let answer = operate(newAry);
    output.textContent = answer;
    if (answer === Infinity) {
        output.textContent = "Nopers.";
    } else {
        displayValue = [answer];
    }

})
