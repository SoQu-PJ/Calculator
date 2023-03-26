import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [displayValue, setDisplayValue] = useState(['0']);
  const [arithmeticSigns, setArithmeticSigns] = useState('')
  const [firstNumber, setFirstNumber] = useState(['0']);
  const [secondNumber, setSecondNumber] = useState(['0']);

  const clearHandler = () =>{
    setDisplayValue(['0']);
    setFirstNumber(['0']);
    setSecondNumber(['0']);
    setArithmeticSigns('');
  }

  const setEquationHandler = e => {
    setDisplayValue(prev => [...prev, e.target.textContent]);
    arithmeticSigns === '' ? setFirstNumber(prev => [...prev, e.target.textContent]) : setSecondNumber(prev => [...prev, e.target.textContent]);
    
  } 

  const setArithmeticSignsHandler = e => {
    setDisplayValue(prev => [...prev, e.target.dataset.sign]); 
    setArithmeticSigns(e.target.dataset.sign);
  }

  const equalsHandler = () => {
    let result;

    if(arithmeticSigns === '/')
      result = (parseFloat(firstNumber.join("")) / parseFloat(secondNumber.join(""))).toFixed(9);
    else if(arithmeticSigns === '*')
      result = (parseFloat(firstNumber.join("")) * parseFloat(secondNumber.join(""))).toFixed(9);
    else if(arithmeticSigns === '-')
      result = (parseFloat(firstNumber.join("")) - parseFloat(secondNumber.join(""))).toFixed(9);
    else if(arithmeticSigns === '+')
      result = (parseFloat(firstNumber.join("")) + parseFloat(secondNumber.join(""))).toFixed(9);
    else 
      result = firstNumber;

    setFirstNumber([result]);
    setSecondNumber(['0']);
    setArithmeticSigns('');
  }

  useEffect(()=>{

  })

  return (
    <main className='calculator'>
      <section id='display' className='display'>
        <p className='smallNumbers'>{displayValue.join("").replace(/^0+/,"")}</p>
        <p className='selectNumber'>{arithmeticSigns === '' ? parseFloat(firstNumber.join("")) : parseFloat(secondNumber.join(""))}</p>
      </section>
      <section className='buttons'>
        <button id='clear' onClick={clearHandler}>AC</button>

        <button id='divide' className='display-button arithmetic-signs' data-sign="/" onClick={setArithmeticSignsHandler}>/</button>
        <button id='multiply' className='display-button arithmetic-signs' data-sign="*" onClick={setArithmeticSignsHandler}>X</button>
        <button id='subtract' className='display-button arithmetic-signs' data-sign="-" onClick={setArithmeticSignsHandler}>-</button>
        <button id='add' className='display-button arithmetic-signs' data-sign="+" onClick={setArithmeticSignsHandler}>+</button>
        
        <button id='nine' className='display-button number' onClick={setEquationHandler}>9</button>
        <button id='eight' className='display-button number' onClick={setEquationHandler}>8</button>
        <button id='seven' className='display-button number' onClick={setEquationHandler}>7</button>
        <button id='six' className='display-button number' onClick={setEquationHandler}>6</button>
        <button id='five' className='display-button number' onClick={setEquationHandler}>5</button>
        <button id='four' className='display-button number' onClick={setEquationHandler}>4</button>
        <button id='three' className='display-button number' onClick={setEquationHandler}>3</button>
        <button id='two' className='display-button number' onClick={setEquationHandler}>2</button>
        <button id='one' className='display-button number' onClick={setEquationHandler}>1</button>
        <button id='zero' className='display-button number' onClick={setEquationHandler}>0</button>
        <button id='decimal' className='display-button number' onClick={setEquationHandler}>.</button>
        <button id='equals' onClick={equalsHandler}>=</button>
      </section>
    </main>
  );
}

export default App
