//class for storing the functions and inputs
class Calculator {
    constructor(previousTextElement, currentTextElement) {
        this.previousTextElement = previousTextElement
        this.currentTextElement = currentTextElement
        this.clear()
    }
    // clear function
    clear(){
        this.current = ''
        this.previous = ''
        this.operation = undefined
    }
    // delete function
    delete(){
        this.current = this.current.toString().slice(0,-1)
        // slice function is used to remove the current digits 
    }
    // to ad numbers to the screen
    appendNumber(number) {
        if (number === '.' && this.current.includes('.')) return
        this.current = this.current.toString() + number.toString()
  }

    // choose operation function
    chooseOperation(operation){
        if(this.current == '') return
        if(this.previous == '') {
            this.compute()
        }
        this.operation = operation
        this.previous = this.current
        this.current = ''
    }
    // compute operation function
    compute(){
        let computing
        const priv = parseFloat(this.previous)
        const curr = parseFloat(this.current)
        if(isNaN(priv) || isNaN(curr))return
        // switch is  another way of else if  like  if you wanted to use so many else if you can use 
        // switch also  switch==if and else == case
        switch(this.operation) {
            case '+':
                computing = priv + curr
                break
            case '-':
                computing = priv - curr
                break
            case '*':
                computing = priv * curr
                break
            case '÷':
                computing = priv / curr
                break
            default:
                return
        }
        this.current = computing
        this.operation = undefined
        this.previous = ''
    }
    displayNumber(number) {
        const stringNumber = number.toString()
        const integers = parseFloat(stringNumber.split('.')[0])
        const decimals = stringNumber.split('.')[1]
        let integersDisplay
        if (isNaN(integers)) {
            integersDisplay = ''
        } else {
            integersDisplay = integers.toLocaleString('en',{maximumFractionDigits: 0})
        }
        if(decimals != null){
            return `${integersDisplay}.${decimals}`
        }else {
            return integersDisplay
        }
    }
    // updating the output
    updateDisplay(){
        this.currentTextElement.innerText = this.displayNumber(this.current)
        if(this.operation != null){
            this.previousTextElement.innerText = `${this.displayNumber(this.previous)} ${this.operation}`
        } else{
            this.previousTextElement.innerText =''
        }
    }
}
// number variables
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const clearAllButton = document.querySelector('[data-clear-all]')
const previousTextElement = document.querySelector('[data-previous]')
const currentTextElement = document.querySelector('[data-current]')

const calculator = new Calculator(previousTextElement,currentTextElement)

// to make the buttons and functions in  html to work and display in the output

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})

clearAllButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})
