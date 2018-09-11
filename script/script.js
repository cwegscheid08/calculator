var container = document.getElementById("container");
var output = document.getElementById("output");
var anchor = document.querySelectorAll("a");
var button = document.getElementById("button");





var enter = document.querySelector(".enter");
var clear = document.querySelector(".clear");
var displayValue = [0];
var numButton = document.querySelectorAll(".num");
anchor = Array.from(anchor);



for(let key in anchor) {
    let btn = anchor[key];
    btn.addEventListener("click", function() {
        outputVal(btn);
    })
}



function operate(...number) {
    console.log(number);

    for(let key in number) {
        
    }




    var functCall = operate.arguments[0];
    num = [...num];

    if(functCall == "add") {
        return add(num);
    } else if(functCall == "subtract") {
        return subtract(num);
    } else if(functCall == "multiply") {
        return multiply(num);
    } else if (functCall == "divide") {
        return divide(num);
    }

    function add() {
        const addNum = num.reduce((sum,num)=>sum += num);
        return addNum;
    }

    function subtract() {
        const subtractNum = num.reduce((diff,num)=>diff -= num);
        return subtractNum;
    }

    function multiply() {
        const multiplyNum = num.reduce((prdct,num)=>prdct *= num);
        return multiplyNum;
    }

    function divide() {
        const divideNum = num.reduce((rslt,num)=>rslt = (rslt / num));
        return divideNum;
    }
    console.log(functCall);
    return add(num);
}




function outputVal(val) {
    var string = output.textContent;
    var buttonVal = numButton.value;
    let last = string.charAt(string.length-1);

    
    val = val.text;

    

    if(output.textContent == "0") {
        output.textContent = val;
        displayValue.push(val);
    } else if(last != ".") {
        output.textContent += val;
        displayValue.push(val);
    } else if(last == "." && val != ".") {
        output.textContent += val;
        displayValue.push(val);
    }
    
    
    
    return displayValue;
}



clear.addEventListener("click", function() {
    output.textContent = 0;
    displayValue = [];
})

enter.addEventListener("click", function() {
    displayValue = displayValue.slice(1, displayValue.length - 1);
    return operate(displayValue);
})