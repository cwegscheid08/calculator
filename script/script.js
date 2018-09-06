function operate(funct, ...num) {
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
