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
        outputVal(btn.textContent);
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
    
    let ans = number[number.length-1];
    let decChck = ans.toString();
    decChck = [...decChck];
    
    let findDec = decChck.indexOf(".");
    findDec = +decChck.length - +findDec;

    if(findDec > 5 && decChck.length > 8) {
        ans = Math.floor(+ans * 1000);
        ans = (+ans/1000);
        console.log(ans);
    }
    return ans;
}

function outputVal(val) {
    var string = output.textContent;
    let last = string.charAt(string.length - 1);
    
    var search = [...string, val];
    
    if (val !== "enter") {
        if (output.textContent == "0" && val !== "+" && val !== "*" && val !== "/" && val !== "-") {
            output.textContent = val;
            displayValue.push(val);
        } else if (val !== "+" && val !== "*" && val !== "/" && val !== "-" && val !== ".") {
            output.textContent += val;
            displayValue.push(val);
        } else if (val === "." && findSingleDec(search) === false) {
            output.textContent += val;
            displayValue.push(val);
        } else if(val === "-" && findDblNeg(search) === false) {
            output.textContent += val;
            displayValue.push(val);
        } else if(val === "+" || val === "/" || val === "*") {
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
                if(num[key-1] === undefined) {
                    num[+key+1] = num[key] + num[+key+1]
                } else {
                    equation.push(num[+key - 1]);
                    equation.push(num[key]);
                }
                
                delete num[key - 1];
                delete num[key];
            } 

        }
    }
    equation.push(num.pop());
    return equation;
}

function findDblNeg(ary) {
    let chckAry = [];
    let val = ary.pop();
    console.log(val);
    for(let i = 0; i <= ary.length; i++) {
        if(ary[i] == "-") {
            chckAry.push(i);
        }
    }

    const dblChck = chckAry.reduce((x, y) => {
        if((+y - +x) == 1 && val == "-") {
            return true;
        } else {
            return +y;
        }
    }, false)
    
    if(+dblChck == +chckAry[chckAry.length-1]) {
        return false;
    }
    return dblChck;
}


function findSingleDec(ary) {
    let decIndex = [];

    let count;
    let tf;
    for (let i = 0; i <= ary.length; i++) {
        if (ary[i] === ".") {
            decIndex.push(i);
        }
    }
    
    let lstPlc = decIndex[decIndex.length-1];

    let otherIndex = [0];
    for (let i = 0; i <= ary.length; i++) {
        if (ary[i] === "+" || ary[i] === "-" || ary[i] === "*" || ary[i] === "/") {
            otherIndex.push(i);
        }
    }
    otherIndex.push(+lstPlc + 1);
    for (let key in otherIndex) {
        count = 0;
        for (let prop in decIndex) {
            let dec = decIndex[prop];
            let other = otherIndex[key];
            if (dec >= other && dec < otherIndex[+key + 1]) {
                count++;
            } 
        }
        if (+count >= 2) {
            tf = true;
        }
    }
    if(tf === undefined) {
        return false;
    }
    return tf;
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
