
const mismatchedParenthesisErrorMessage = 'Error: Mismatched Parenthesis';
const zeroDivisionError = 'Error: Division by Zero';
const syntaxErrorMessage = 'SyntaxError'
const operationFunctions = {
    '**': (a,b) => a**b,
    '*': (a,b) => a*b, 
        '/': (a,b) => {
            try{ return a/b;}
            catch(err) {return zeroDivisionError;}
        },
    '+': (a,b) => a+b,
    '-': (a,b) => a-b, 
}
const nonNumeric = Array.from('+-*/()').concat('**');

// HTML and CSS references
divCalculator = Array.from(document.getElementsByClassName('calculator'))[0];
divDisplayExpression = Array.from(document.getElementsByClassName('expression'))[0];
divDisplayAnswer = Array.from(document.getElementsByClassName('answer'))[0];
divInputs = Array.from(document.getElementsByClassName('inputs'))[0];
divOperators = Array.from(document.getElementsByClassName('operators'))[0];
divNumbers = Array.from(document.getElementsByClassName('numbers'))[0];

// Create HTML Items
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
makeButtons();
function addButtonListeners() {
    buttons.forEach(button => {
        document.getElementById(button.id).addEventListener('click', btnClick);
    });
};

const keys = Array.from('.1234567890()*/=-+c').concat('Backspace', 'Enter');
const keyMap = [

    { key:'1', text: "1" },
    { key:'2', text: "2" },
    { key:'3', text: "3" },
    { key:'4', text: "4" },
    { key:'5', text: "5" },
    { key:'6', text: "6" },
    { key:'7', text: "7" },
    { key:'8', text: "8" },
    { key:'9', text: "9" },
    { key:'0', text: "0" },
    { key:'.', text: "." },
    
    { key:'=', text: "equal" },
    { key:'+', text: "+" },
    { key:'-', text: "-" },
    { key:'*', text: "*" },
    { key:'/', text: "/" },
    { key:'(', text: "(" },
    { key:')', text: ")" },
    { key:'Enter', text: "equal" },
    { key:'Backspace', text: 'delete'},
    { key:'c', text: 'clear'}
];
function keyPress(e) {
    if (keys.includes(e.key)) {
        keyToChooser(keyMap.find(obj => obj.key === e.key));
    }
}



// CALCULATION FUNCTIONS
function convertInputToMathArray(inputArray) {
    function combinePow(input) {
        // input is an array
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
    function makeMultiDigitNumbers (input) {
        for (let i = 0; i < input.length; i++) {
            if (i!==input.length-1 && !nonNumeric.includes(input[i]) && !nonNumeric.includes(input[i+1])) {
                input[i] = input[i] + input[i+1];
                input.splice(i+1, 1);
                i--;
            }
        }
        return input;
    };
    
    function convertStringsToNumbers(input) {
        return input.map(item => {
            if(!nonNumeric.includes(item)) {
                return parseFloat(item);
            } else {
                return item;
            }
        });
    };
    function addOperators(input) {
        for (let i = 0; i < input.length; i++) {
            if(Object.keys(operationFunctions).includes(input[i])) {
                input[i] = operationFunctions[input[i]];
            }
        }
        return input;
    };
    function groupByParenthesis(input) {
        const first = input.findIndex(char => char === '(');
        if (first === -1) return input; // no parenthesis
        let count = 0;
        let matched = false;
        let end;
        for (let i = first + 1; i < input.length; i++) {
            if (input[i] === '(') {
                count++;
            } else if (input[i] === ')' && count === 0) {
                end = i;
                matched = true;
            } else if (input[i] === ')') {
                count--;
            }
        }
        if (!matched) {
            writeToAnswer(mismatchedParenthesisErrorMessage);
        }
        if (input[first+1] === operationFunctions['-']) {
            input.splice(first+1, 0, 0);
            end++;
        }
    
        const pre = input.slice(0, first);
        const expr = input.slice(first + 1, end); // dropping the ()
        const rest = input.slice(end + 1); // dropping the ()
        return pre.concat([groupByParenthesis(expr)]).concat(groupByParenthesis(rest));
    };
    
    return groupByParenthesis(addOperators(convertStringsToNumbers(makeMultiDigitNumbers(combinePow(inputArray)))));
}

function evaluateMathArray (mathArray) {
    if(typeof(mathArray)!== 'object') return mathArray;
    let count = 0;

    while(mathArray.length!==1 || count !== 100) {

        let opers = Array.from(Object.values(operationFunctions));
        count++;

        while (opers.length) {
            let indx = mathArray.findIndex(item => item === opers[0]);
            if (indx === 0 || indx === mathArray.length-1) {
                return syntaxErrorMessage; //leading or trailing operator
            }
            else if (indx===-1) {
                opers = opers.slice(1); //No operator found
            } else {
                if (typeof(mathArray[indx-1]) === 'function' ||
                    typeof(mathArray[indx+1]) === 'function') {
                        return syntaxErrorMessage; //two operators 
                } else {
                    mathArray.splice(indx-1, 3, mathArray[indx](
                        evaluateMathArray(mathArray[indx-1]), 
                        evaluateMathArray(mathArray[indx+1])
                    ));
                }
            }
        }
    }
    return mathArray[0];
}

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

function btnToChooser(id) {
    let button = buttons.find(obj => obj.id === id);
    chooser(id.slice(4), button.diplay);
 
}
function keyToChooser(key) {
    chooser(key.text, key.text);    
}

function chooser(switchText, writeText) {
    // All event listeners call chooser, which looks up the function to call
    switch (switchText) {
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
            writeToExpression(writeText);
            break;
    }
};
function btnClick(e) {
    btnToChooser(e.target.id);
}




function startup() {
    addButtonListeners();
window.addEventListener('keydown', keyPress);
};
window.addEventListener('load', startup);