class Calculator {
    constructor(previousNumber, currentNumber) {
        this.previousNumber = previousNumber;
        this.currentNumber = currentNumber;
        //clearing the inputs and set them to default values as soon as a new calculator is created
        this.clear()
    }

    //adding number to the screen
    appendNumber(number) {
        //converting to toString so that the numbers get appended and not added
        //i.e. we want 1 and 1 to be 11 and not 2
        this.current = this.current.toString() + number.toString();
    }

    //the operator the user selects
    chooseOperation (operation) {
        if (this.current === '') {
            return;
        }
        //if we have something computed 
        if (this.previous !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previous = this.current;
        this.current = '';
    }

    //calculate the value and put on screen
    compute() {
        let calculate;
        const num1 = Number(this.previous);
        const num2 = Number(this.current);

        //checking if a number is not inputted
        if (isNaN(num1) || isNaN(num2)) { 
            return; 
        }

        //calculations
        if (this.operation === '+') {
            calculate = num1 + num2;
        } else if (this.operation === '-') {
            calculate = num1 - num2;
        } else if (this.operation === '*') {
            calculate = num1 * num2;
        } else if (this.operation === '÷') {
            if (num2 === 0) {
                alert("Uh oh, You can't divide by 0");
                return 0;
            }
            calculate = num1 / num2;
        } else {
            return;
        }

        this.current = calculate;
        this.operation = undefined;
        this.previous = '';
    }

    //update the values inside the display
    updateDisplay() {
        this.currentNumber.innerText = this.current;

        //display previous number
        if (this.operation != null) {
            this.previousNumber.innerText = `${this.previous} ${this.operation}`;
        }
    }

    //clearing the calculator
    clear() {
        this.current = '';
        this.previous = '';
        this.operation = undefined;

        //Update the display to clear both current and previous numbers
        this.updateDisplay(); 
        
        //Clear the content of the previousNumber element
        this.previousNumber.innerText = ''; 
    }
}

//buttons
const numberButtons = document.querySelectorAll('.number');
const operationButtons = document.querySelectorAll('.operator');
const equalButton = document.querySelector('.equalSign');
const clearButton = document.querySelector('.clearSign');

const previousNumber = document.querySelector('.prevNum');
const currentNumber = document.querySelector('.currentNum');

//creating the calculator
const calculator = new Calculator(previousNumber, currentNumber);

numberButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        calculator.appendNumber(btn.innerText);
        calculator.updateDisplay();
    });
});

operationButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        calculator.chooseOperation(btn.innerText);
        calculator.updateDisplay();
    });
});

equalButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
});

clearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
});






