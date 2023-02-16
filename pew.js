const num = document.querySelectorAll('.num');
const screen = document.querySelector('.screen');
const ops = document.querySelectorAll('.ops');
const equal = document.querySelector('#equal');
const del = document.querySelector('#delete');
const reset = document.querySelector('#reset');
const numArr = [];
const inputArr = [];

for(let i = 0; i < num.length; i++) {
    num[i].addEventListener('click', showNum);
}

for(let i = 0; i < ops.length; i++) {
    ops[i].addEventListener('click', operateNum);
}

del.addEventListener('click', (e) => {
    numArr.pop();
    screen.innerHTML = numArr.join('');
});

reset.addEventListener('click', wipeAll);

equal.addEventListener('click', giveAnswer);

function showNum(e) {
    numArr.push(this.innerText);
    screen.innerHTML = numArr.join('');
    checkDecimal();
}

function operateNum(e) {
    if(screen.innerHTML != '') { 
        inputArr.push(+`${screen.innerHTML}`, this.innerText);
        while(numArr.length > 0) {
            numArr.pop();
        }
        if(inputArr[2] != null) {
            inputResult(solveEquation());
            inputArr.push(+`${screen.innerHTML}`,this.innerText);
        }
    }
    else {
        screen.innerHTML = 0;
    }
}

function wipeAll(e) {
    screen.innerHTML = '';
    fullWipe();
}

function giveAnswer(e) {
    if(screen.innerHTML != '') {
        inputArr.push(+`${screen.innerHTML}`);
        inputResult(solveEquation());
    }
    else {
        screen.innerHTML = 0;
    }
}

function solveEquation() {
    const sign = inputArr[1];
    const firstNum = inputArr[0];
    const secondNum = inputArr[2];
    if(sign == 'x') {
        return firstNum * secondNum;
    }
    if(sign == '/') {
        if(secondNum == 0) {
            return 'Invalid';
        }
        return firstNum / secondNum;
    }
    if(sign == '+') {
        return firstNum + secondNum;
    }
    if(sign == '-') {
        return firstNum - secondNum;
    }
}

function inputResult(num) {
    fullWipe();
    const roundedNum = Math.round(num * 100) / 100;
    screen.innerHTML = roundedNum;
}

function fullWipe() {
    while(numArr.length > 0 || inputArr.length > 0) {
        numArr.pop();
        inputArr.pop();
    }
}

function checkDecimal() {
    if(numArr.includes('.'))
        num[10].disabled = true;
    else
        num[10].disabled = false;
}
