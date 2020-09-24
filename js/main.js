class TreeNode {
    constructor(value) {
        this.value = value;
        this.descendents = [];
    }
}
// BASIC OPERATIONS
// For operations, args is always a two element array of argument1, argument2
function add(arg1, arg2) {
    return arg1 + arg2;
};
function multiply(arg1, arg2) {
    return arg1 * arg2;
};
function divide(arg1, arg2) {
    try {
        return arg1 / arg2;
    }
    catch (err) {
        writeToExpression(err.message);
    }
};
function subtract(arg1, arg2) {
    return arg1 - arg2;
};
function pow(arg1, arg2) {
    return arg1 ** arg2;
}

// HTML and CSS references
divCalculator = Array.from(document.getElementsByClassName('calculator'))[0];
divDisplayExpression = Array.from(document.getElementsByClassName('expression'))[0];
divDisplayAnswer = Array.from(document.getElementsByClassName('answer'))[0];
divInputs = Array.from(document.getElementsByClassName('inputs'))[0];
divOperators = Array.from(document.getElementsByClassName('operators'))[0];
divNumbers = Array.from(document.getElementsByClassName('numbers'))[0];

// VARIABLES
let displayValue = NaN;
const expTree = new TreeNode;
let currTree = new TreeNode;
const buttons = [

    { id: 'btn-num7', class: 'number', text: '7', display: '7' },
    { id: 'btn-num8', class: 'number', text: '8', display: '8' },
    { id: 'btn-num9', class: 'number', text: '9', display: '9' },
    { id: 'btn-num4', class: 'number', text: '4', display: '4' },
    { id: 'btn-num5', class: 'number', text: '5', display: '5' },
    { id: 'btn-num6', class: 'number', text: '6', display: '6' },
    { id: 'btn-num1', class: 'number', text: '1', display: '1' },
    { id: 'btn-num2', class: 'number', text: '2', display: '2' },
    { id: 'btn-num3', class: 'number', text: '3', display: '3' },
    { id: 'btn-num0', class: 'number', text: '0', display: '0' },
    { id: 'btn-decimal', class: 'number', text: '.', display: '.' },

    { id: 'btn-delete', class: 'operator', text: 'del', display: '' },
    { id: 'btn-clear', class: 'special', text: 'clear', display: '' },
    { id: 'btn-open-parenthesis', class: 'operator', text: '(', display: '(' },
    { id: 'btn-close-parenthesis', class: 'operator', text: ')', display: ')' },
    { id: 'btn-add', class: 'operator', text: '+', display: '+' },
    { id: 'btn-subtract', class: 'operator', text: '-', display: '-' },
    { id: 'btn-multiply', class: 'operator', text: '*', display: '*' },
    { id: 'btn-divide', class: 'operator', text: '/', display: '/' },
    { id: 'btn-pow', class: 'operator', text: 'pow', display: '**' },
    { id: 'btn-equal', class: 'special', text: '=', display: '=' },

];
const functionLookup = {
    '+': add,
    '-': subtract,
    '/': divide,
    '*': multiply,
    '**': pow,
};
const pemdas = {
    '+': 0, 
    '-': 0,
    '*': 1,
    '/': 1, 
    '**': 2, 
    '(': 3, 
    ')': 3
}
const operators = ["+", "-", "*", "/", "(", ")", '**'];

// MAIN FUNTIONS
function identity(arg1, arg2) {
    return arg1;
}
function writeToExpression(message) {
    divDisplayExpression.innerText = divDisplayExpression.innerText + message;
};
function writeToAnswer(message) {
    divDisplayAnswer.innerText = message;
};
function deleteFromDisplay(arg) {
    if (arg === 'clear') {
        divDisplayExpression.innerText = '';
    } else {
        let text = divDisplayExpression.innerText;
        divDisplayExpression.innerText = text.slice(0, text.length - 1);
        if (text[-1] === '.') {
            enableDecimal();
        }
    }
};
function clearExpression() {
    divDisplayExpression.innerText = '';
    enableDecimal();
}

function enableDecimal () {
    
}


function chooser(e) {
    // All event listeners call chooser
    let id = e.target.id; // strip the 'btn-' or the 'key-'
    let button = buttons.find(obj => obj.id === id);
    let name = button.text;
    switch (name) {
        case 'del':
            deleteFromDisplay(1);
            break;
        case '=':
            break;
        case 'clear':
            deleteFromDisplay('clear');
            clearExpression();
            break;
        default:
            writeToExpression(button.display);
            console.log(name);
            switch (name) {
                case '(':
                    break;
                case ')':
                    break;
                case '*' :
                case '+' :
                case '/' :
                case '-' :
                case '**':
                    if(!currTree.value) {
                        currTree.value = functionLookup[name];
                    } else {
                        if (currTree.descendents[1] !== undefined) {
                            //Error
                        } else if (pemdas[functionLookup[name]] 
                            > pemdas[functionLookup[currTree.valeu]]) {
                        }
                            
                        }
                    } 
                    break;
                case '.':
                    disableDecimal()
                    // No break since we want to run the default and add the decimal 
                default:
                    // Numbers and decimal
                    if (currTree.value) {
                        if (currTree.descendents[1] !== undefined) {
                            currTree.descendents[1] += button.display;
                        } else {
                            currTree.descendents[1] = button.display;
                        }
                    } else {
                        if (currTree.descendents[0] !== undefined) {
                            currTree.descendents[0] += button.display;
                        } else {
                            currTree.descendents[0] = button.display;
                        }
                    }
            }
            break;

    }
    console.log(currTree);
};

function evaluateTree (t) {
    if (isLeaf(t)) {
        return label(t);
    } else {
        return label(t)(evaluateTree(branch1(t)), evaluateTree(branch2(t)));
    }
}
z = new TreeNode(3);
y = new TreeNode(2);
x = new TreeNode(4);
m = new TreeNode(multiply);
a = new TreeNode(add);
a.descendents.push(m, x);
m.descendents.push(y,z);

function isLeaf(t) {
    return (t.descendents.length === 0);
}
function label (t) {
    return t.value;
}
function branch1 (t) {
    return t.descendents[0];
}
function branch2 (t) {
    return t.descendents[1];
}

function branches (t) {
    return t.descendents;
}

function startup() {
    makeButtons();
    addButtonListeners();
};
function addButtonListeners() {
    buttons.forEach(button => {
        document.getElementById(button.id).addEventListener('click', chooser);
    });
};
function makeButtons() {
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