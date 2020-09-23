// BASIC OPERATIONS
// For operations, args is always a two element array of argument1, argument2
function add (args) {
    return args[0] + args[1];
};
function multiply (args) {
    return args[0] + args[1];
};
function divide (args) {
    try {
        return args[0] / args[1];
    }
    catch (err) {
        writeToDisplay(err.message);
    }
};
function subtract (args) {
    return args[0] - args[1];
};
function pow  (args) {
    return Math.exp(args[0], args[1]);
}
function operate (operatorFunction, arg1, arg2){
    return operatorFunction([arg1, arg2]);
};

// HTML and CSS references
divCalculator = Array.from(document.getElementsByClassName('calculator'))[0];
divDisplayHistory = Array.from(document.getElementsByClassName('history'))[0];
divDisplayAnswer =Array.from(document.getElementsByClassName('answer'))[0];    
divInputs = Array.from(document.getElementsByClassName('inputs'))[0];
divOperators = Array.from(document.getElementsByClassName('operators'))[0];
divNumbers = Array.from(document.getElementsByClassName('numbers'))[0];

// VARIABLES
let displayValue = NaN;
const buttons = [
    [
        {name:'btn-num7', class: 'number', text: '7'},
        {name:'btn-num8', class: 'number', text: '8'},
        {name:'btn-num9', class: 'number', text: '9'},
        {name:'btn-num4', class: 'number', text: '4'},
        {name:'btn-num5', class: 'number', text: '5'},
        {name:'btn-num6', class: 'number', text: '6'},
        {name:'btn-num1', class: 'number', text: '1'},
        {name:'btn-num2', class: 'number', text: '2'},
        {name:'btn-num3', class: 'number', text: '3'},
        {name:'btn-num0', class: 'number', text: '0'},
        {name:'btn-decimal', class: 'number', text: '.'}
    ],
    [
    {name:'btn-delete', class: 'operator', text: 'del'},
    {name:'btn-clear', class:'special', text: 'clear'},
    {name:'btn-open-parenthesis', class: 'operator', text: '('},
    {name:'btn-close-parenthesis', class: 'operator', text: ')'},
    {name:'btn-add', class: 'operator', text: '+'},
    {name:'btn-subtract', class: 'operator', text: '-'},
    {name:'btn-multiply', class: 'operator', text: '*'},
    {name:'btn-divide', class: 'operator', text: '/'},
    {name:'btn-pow', class: 'operator', text: 'pow'},
    {name:'btn-equal', class: 'special', text: '='},
]
];
const eventLookup = {
    'btn-add': add,
    'btn-subtract': subtract,
    'btn-divide': divide, 
    'btn-multiply': multiply,
    'btn-pow': pow,
    'btn-equal': parse, 
    'btn-num0': writeToDisplay,
    'btn-num1': writeToDisplay, 
};

// MAIN FUNTIONS
function parse  (str) {

};

function writeToDisplay (message) {
    divDisplayAnswer.innerText = message;
};

function chooser (e) {
    // All event listeners call chooser, which looks up the function to call
    // Each button / key ID will be in the eventLookup table to determine what to do with it
    let func = eventLookup[e.target.id];
    let arg = e.target.innerText;
    console.log(func, arg);
    func(arg);
};

function startup () {
    makeButtons();
    addButtonListeners();

    
};
function addButtonListeners() {
    buttons[0].forEach(button => {
        document.getElementById(button.name).addEventListener('click', chooser);
    });
    buttons[1].forEach(button => {
        document.getElementById(button.name).addEventListener('click', chooser);
    });
}
function makeButtons () {
    buttons[0].forEach(item => {
        const newButton = document.createElement('button');
        newButton.id = item.name;
        newButton.classList.add(item.class);
        newButton.innerText = item.text;
        divNumbers.appendChild(newButton);
    })
    buttons[1].forEach(item => {
        const newButton = document.createElement('button');
        newButton.id = item.name;
        newButton.classList.add(item.class);
        newButton.innerText = item.text;
        divOperators.appendChild(newButton);
    })
}

window.addEventListener('load', startup);