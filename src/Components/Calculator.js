class Calculator {
    constructor(firstNumber, secondNumber){
        this.firstNumber = firstNumber;
        this.secondNumber = secondNumber;
    }
    
    add(){
        return parseFloat(this.firstNumber) + parseFloat(this.secondNumber);
    }

    subtract(){
        return parseFloat(this.firstNumber) - parseFloat(this.secondNumber);
    }

    multiply(){
        return parseFloat(this.firstNumber) * parseFloat(this.secondNumber);
    }

    divide(){
        return parseFloat(this.firstNumber) / parseFloat(this.secondNumber);
    }
}

export default Calculator;