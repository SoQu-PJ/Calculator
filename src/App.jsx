import { useState, useEffect } from 'react'
import Calc from './assets/Calculator';
import './App.css'

function App() {
  const [history, setHistory] = useState(['0']);
  const [numbers, setNumbers] = useState(['0']);
  const [arithmeticSigns, setArithmeticSigns] = useState('')
  const [firstNumber, setFirstNumber] = useState({number: '', use: true});
  const [secondNumber, setSecondNumber] = useState({number: '', use: false, firstVis: true});
  const [equals, setEquals] = useState(false);
  const [oldResult, setOldResult] = useState(0);

  // restart calculator
  const clearHandler = () =>{
    setHistory(['0']);
    setNumbers(['0']);
    setFirstNumber({number: '', use: true});
    setSecondNumber({number: '', use: false, firstVis: true});
    setArithmeticSigns('');
    setEquals(false);
    setOldResult(0);
  }
  
  // set number 
  const setEquationHandler = e => {
    const textContent = e.target.textContent;

    // reset number when select three or more numbers
    if(secondNumber.number === '')
      setNumbers(['0']);

    // set second number
    if(!firstNumber.use && textContent !== '.'){
      setSecondNumber(prev => ({...prev, number: secondNumber.number + textContent, use: true}));
    }else if(textContent === '.' && !firstNumber.use && secondNumber.number === '')  
      setSecondNumber(prev => ({...prev, number: 0 + textContent, use: true}));


    // clear if select number after equals
    if(equals)
      clearHandler();
    
    // Protection by multiple dot
    if(!numbers.find(name => name === '.'))  
      setNumbers(prev => [...prev, textContent]) 
    else if(textContent !== '.')
      setNumbers(prev => [...prev, textContent])

  } 
  
  // set arithmeticSignsHandler
  const setArithmeticSignsHandler = e => {
    let textContent = e.target.dataset.sign;

    // change firstNumber negative
    if(firstNumber.number === '' && textContent === '-')
      setFirstNumber({number: '0', use: false});

    // active equalsArithmeticSignsHandler function 
    if(arithmeticSigns !== '' && secondNumber.number !== '')
      equalsArithmeticSignsHandler();

    // select firstNumber
    if(firstNumber.use){
      setFirstNumber({number: parseFloat(numbers.join("")), use: false});
      setNumbers(['0']);
    }

    if(equals){
      setSecondNumber(prev => ({...prev, use: true, firstVis: true}));
      setHistory(['0']);
      setEquals(false);
    }

    setArithmeticSigns(textContent);
  }


  const equalsArithmeticSignsHandler = () => {
    // set and parse first and second number
    const Cal = new Calc(parseFloat(firstNumber.number === '' ? 0 : firstNumber.number), parseFloat(secondNumber.number === '' ? 0 : secondNumber.number));

    // Set history when result 
    secondNumber.firstVis ? setHistory(prev => [...prev, firstNumber.number, arithmeticSigns, secondNumber.number]) :
                            setHistory(prev => [...prev, arithmeticSigns, secondNumber.number]);

    // clear second number
    setSecondNumber({number: '', use: true, firstVis: false});
    // clear arithmeticSigns
    setArithmeticSigns('');

    let result;

    // if performs arithmetic operations
    if(arithmeticSigns === '+')
      result = Cal.add();
    else if(arithmeticSigns === '-')
      result = Cal.subtract();
    else if(arithmeticSigns === '*')
      result = Cal.multiply();
    else if(arithmeticSigns === '/')
      result = Cal.divide();
    
    // assign result to firstNumber
    setFirstNumber({number: result, use: false});
    setNumbers([result]);
  }
  
  // set equals
  const equalsHandler = () => {
    // use firstNumber or oldResult 
    const tmpFirstNumber = firstNumber.use ?  oldResult : parseFloat(firstNumber.number);
    // set and parse first and second number
    const Cal = new Calc(tmpFirstNumber === '' ? 0 : tmpFirstNumber, parseFloat(secondNumber.number === '' ? 0 : secondNumber.number));

    setEquals(true);
    setFirstNumber({number: oldResult, use: true});
    
    
    secondNumber.number === '' && setArithmeticSigns('');
    let result;
    
    // if performs arithmetic operations
    if(arithmeticSigns === '+')
      result = Cal.add();
    else if(arithmeticSigns === '-')
      result = Cal.subtract();
    else if(arithmeticSigns === '*')
      result = Cal.multiply();
    else if(arithmeticSigns === '/')
      result = Cal.divide();
    else
      result = oldResult;
    
    // set result
    setNumbers([result]);
  }
  
  useEffect(()=>{
    // set oldResult
    if(firstNumber.use)
      setOldResult(parseFloat(numbers.join("")));
  });

  console.log(firstNumber, secondNumber, secondNumber.firstVis, numbers, equals, arithmeticSigns);
  
  return (
    <main className='calculator'>
      <section id='display' className='display'>
        <p className='smallNumbers'>
        {`${history.filter(el => !/^0+/.test(el)).join("")}${secondNumber.firstVis ? firstNumber.number:''}${arithmeticSigns}${secondNumber.number}${equals ? '=' : ''}`}
        </p>
        <p className='selectNumber'>{parseFloat(numbers.join(""))}</p>
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
