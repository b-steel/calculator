class TreeNode {
    constructor(value) {
        this.value = value;
        this.branch1 = [];
        this.branch2 = []
    }
}
function evaluateTree (t) {
    if (isLeaf(t)) {
        return t.value;
    } else {
        return t.value(evaluateTree(t.branch1), evaluateTree(t.branch2));
    }
}
z = new TreeNode(3);
y = new TreeNode(2);
x = new TreeNode(4);
m = new TreeNode(multiply);
a = new TreeNode(add);
a.branch1 = 4;
a.branch2 = m;
m.branch1 = 2;
m.branch2 = 3;

function isLeaf(t) {
    return (t.branch1.length === 0 && t.branch2.length === 0)   ;
}

const pemdas = {
    '+': 0, 
    '-': 0,
    '*': 1,
    '/': 1, 
    '**': 2, 
    '(': 3, 
    ')': 3
};
// BASIC OPERATIONS
// For operations, args is always a two element array of argument1, argument2
function add(arg1, arg2) {
    return String(parseFloat(arg1) + parseFloat(arg2));
};
function multiply(arg1, arg2) {
    return String(parseFloat(arg1) * parseFloat(arg2));

};
function divide(arg1, arg2) {
    try {
        return String(parseFloat(arg1) / parseFloat(arg2));
    }
    catch (err) {
        writeToExpression(err.message);
    }
};
function subtract(arg1, arg2) {
    return String(parseFloat(arg1) - parseFloat(arg2));
};
function pow(arg1, arg2) {
    return String(parseFloat(arg1) ** parseFloat(arg2));
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
let lastButton;
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
const operators = [
    "(", 
    ")",
    "+", 
    "-",
    "*", 
    "/",
    '**', 
     ];

// MAIN FUNCTIONS
function combinePow(input) {
    // input is an array of characters
    
    //Deal with '**' pow operator
    for (let i = 0; i < input.length; i++) {
        if (input[i] === '*') {
            if (i !== input.length - 1 && input[i + 1] === '*') {
                // We have a pow operator
                input.splice(i, 2, '**'); // replace , '*', '*', with ,'**', 
            }
        }
    };
    return input;
};

function evalParenthesis (arg) {
    const first = input.findIndex(char => char === '(');
    let count = 0;
    let matched = false;
    let end;
    for (let i = first + 1; i < input.length; i++) {
        if (input[i] === '(') {
            count ++;
        } else if (input[i] === ')' && count === 0) {
            end = i;
            matched = true;
        } else if (input[i] === ')') {
            count--;
        } 
    }
    if (!matched) {
        //Error
    }
    const pre = input.slice(0,first);
    const expr = input.slice(first +1, end); // dropping the ()
    const rest = input.slice(end + 1); // dropping the ()

    // evaluate the expression, then rebuild the tree
    return buildTree(pre.concat(buildTree(expr)).concat(rest));
};
function addNode (t, n, branch) {
    if (branch === 'left') {
        t.branch1 = n;
    } else {
        t.branch2 = n;
    }
    return t;
}
function buildTree(arg) {
    
    // input is an array of characters / TreeNodes
    input = combinePow(arg); // Deal with the pesky ** operator

    //Encounter operators in PEMDAS order
    let operIndex = -1;
    let i = 0;
   for (let i =0; i<operators.length; i++) {
        operIndex = input.findIndex(char => char=== operators[i]);
        if (operIndex >=0) {
            break;
        }
    } 
    const op = input[operIndex];
    let newTree = new TreeNode();
    switch (op) {
        case undefined:
            //No operators, it's a number or a node
            if (typeof(input[0]) === 'object') {
                return input[0];  // Got a tree already
            } else {
                newTree.value = input.join('');
                return newTree;

            }
        case '(':
            return evalParenthesis(input);

        case ')':
            // Shouldn't have an end bracket when reading from the right
            // Error
            break;
        default:
            let arg1;
            if(op === '-') {
                if (operIndex === 0) {
                    //negative number
                arg1 = '0';
                } else {
                arg1 = input.slice(0, operIndex);
                }
            } else {
                arg1 = input.slice(0, operIndex);

            }
            const arg2 = input.slice(operIndex + 1);
            newTree.value = functionLookup[op];
            newTree.branch1 = buildTree(arg1);
            newTree.branch2 = buildTree(arg2);
            return newTree;
    }
};


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
    }
};


function chooser(e) {
    // All event listeners call chooser, which looks up the function to call
    // Each button / key ID will be in the eventLookup table to determine what to do with it
    let id = e.target.id; // strip the 'btn-' or the 'key-'
    let button = buttons.find(obj => obj.id === id);

    switch (id.slice(4)) {
        case 'delete':
            deleteFromDisplay(1);
            break;
        case 'equal':
            const text = Array.from(divDisplayExpression.innerText);
            writeToAnswer(evaluateTree(buildTree(text)));
            break;
        case 'clear':
            deleteFromDisplay('clear');
            break;
        default:
            writeToExpression(button.display);
            break;
    }
};

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