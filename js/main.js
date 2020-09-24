// BASIC OPERATIONS
// For operations, args is always a two element array of argument1, argument2
function add (arg1, arg2) {
    return String(parseFloat(arg1) + parseFloat(arg2));
};
function multiply (arg1, arg2) {
    return String(parseFloat(arg1) * parseFloat(arg2));

};
function divide (arg1, arg2) {
    try {
        return String(parseFloat(arg1) / parseFloat(arg2));
    }
    catch (err) {
        writeToHistory(err.message);
    }
};
function subtract (arg1, arg2) {
    return String(parseFloat(arg1) - parseFloat(arg2));
};
function pow  (arg1, arg2) {
    return String(parseFloat(arg1) ** parseFloat(arg2));
}

// HTML and CSS references
divCalculator = Array.from(document.getElementsByClassName('calculator'))[0];
divDisplayHistory = Array.from(document.getElementsByClassName('history'))[0];
divDisplayAnswer =Array.from(document.getElementsByClassName('answer'))[0];    
divInputs = Array.from(document.getElementsByClassName('inputs'))[0];
divOperators = Array.from(document.getElementsByClassName('operators'))[0];
divNumbers = Array.from(document.getElementsByClassName('numbers'))[0];

// VARIABLES
let displayValue = NaN;
let lastButton;
const buttons = [
    
    {id:'btn-num7', class: 'number', text: '7', display: '7'},
    {id:'btn-num8', class: 'number', text: '8', display: '8'},
    {id:'btn-num9', class: 'number', text: '9', display: '9'},
    {id:'btn-num4', class: 'number', text: '4', display: '4'},
    {id:'btn-num5', class: 'number', text: '5', display: '5'},
    {id:'btn-num6', class: 'number', text: '6', display: '6'},
    {id:'btn-num1', class: 'number', text: '1', display: '1'},
    {id:'btn-num2', class: 'number', text: '2', display: '2'},
    {id:'btn-num3', class: 'number', text: '3', display: '3'},
    {id:'btn-num0', class: 'number', text: '0', display: '0'},
    {id:'btn-decimal', class: 'number', text: '.', display: '.'},

    {id:'btn-delete', class: 'operator', text: 'del', display: ''},
    {id:'btn-clear', class:'special', text: 'clear', display: ''},
    {id:'btn-open-parenthesis', class: 'operator', text: '(', display: '('},
    {id:'btn-close-parenthesis', class: 'operator', text: ')', display: ')'},
    {id:'btn-add', class: 'operator', text: '+', display: '+'},
    {id:'btn-subtract', class: 'operator', text: '-', display: '-'},
    {id:'btn-multiply', class: 'operator', text: '*', display: '*'},
    {id:'btn-divide', class: 'operator', text: '/', display: '/'},
    {id:'btn-pow', class: 'operator', text: 'pow', display: '**'},
    {id:'btn-equal', class: 'special', text: '=', display: '='},

];
const functionLookup = {
    '+': add,
    '-': subtract,
    '/': divide, 
    '*': multiply,
    '**': pow, 
};
const operators = ["+", "-", "*", "/", "(", ")", '**'];

// MAIN FUNTIONS
function parse  (input) {
    let op = '';
    //Deal with '**' pow operator
    for (let i = 0; i < input.length; i++) {
        if (input[i] === '*') {
            if (i!== input.length-1 && input[i+1] === '*') {
                // We have a pow operator
                input.splice(i, 2, '**'); // replace , '*', '*', with ,'**', 
            }
        }
    };
    const startIndex = input.findIndex(char => operators.includes(char)); // Run to the first operator
    op = input[startIndex];
    switch (op) {
        case '':
            //No operators, it's a number
            return [identity, input.join('') ,'']
        case '(':
            // Run to opposite bracket )
            const endIndex = input.findIndex(char => char===')');
            const expr = input.slice(startIndex+1, endIndex);
            const rest = input.slice(endIndex+1);
            return parse(evaluateExpression(expr).concat(rest)); 
        case ')':
            // Shouldn't have an end bracket when reading from the right
            return [identity, 'Error: Incorrect \')\'', ''];
        case '-':
            //negative numbers
            break;
        default:
            return [functionLookup[op], input.slice(0,startIndex)[0], input.slice(startIndex+1)[0]];
            // + or / or * or **
    }
    

    // if(isArgument(arg1) && isArgument(arg2)) {
    //     result = operator(arg1, arg2);
    // } else
};

function identity (arg1, arg2) {
    return arg1;
}

function writeToHistory (message) {
    divDisplayHistory.innerText = divDisplayHistory.innerText + message;
};

function writeToAnswer (message) {
    divDisplayAnswer.innerText = message;
};

function deleteFromDisplay (arg) {
    if (arg === 'clear') {
        divDisplayHistory.innerText = '';
    } else {
    let text = divDisplayHistory.innerText;
    divDisplayHistory.innerText = text.slice(0,text.length-1);
    }
};

function evaluateExpression(exp) {
    // Exp is an array of characters
    let operator, arg1, arg2;
    // Parse
    [operator, arg1, arg2] = parse(exp);
    // Evalutate
    console.log(operator, arg1, arg2);
    return textToMathArray(operator(arg1, arg2));
    
}

function textToMathArray(str) {
    text = Array.from(str);
    
}

function chooser (e) {
    // All event listeners call chooser, which looks up the function to call
    // Each button / key ID will be in the eventLookup table to determine what to do with it
    let id = e.target.id; // strip the 'btn-' or the 'key-'
    let button = buttons.find(obj => obj.id === id);
    
    switch (id.slice(4)) {
        case 'delete':
            deleteFromDisplay(1);
            break;
        case 'equal':
            const text = divDisplayHistory.innerText;
            const ans = evaluateExpression(textToMathArray(text));
            writeToAnswer(ans[0]);
            break;
        case 'clear':
            deleteFromDisplay('clear');
            break;
        default:
            writeToHistory(button.display);
            break;
    }
        lastButton = button;
};

function startup () {
    makeButtons();
    addButtonListeners();

    
};
function addButtonListeners() {
    buttons.forEach(button => {
        document.getElementById(button.id).addEventListener('click', chooser);
    });
};
function makeButtons () {
    buttons.forEach(item => {
        const newButton = document.createElement('button');
        newButton.id = item.id;
        newButton.classList.add(item.class);
        newButton.innerText = item.text;

        if (item.class === 'number') {    
            divNumbers.appendChild(newButton);
        } else {
            divOperators.appendChild(newButton);
        }
    });
};

window.addEventListener('load', startup);