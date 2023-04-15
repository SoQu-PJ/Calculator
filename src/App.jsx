import { useState, useEffect } from 'react'
import Calc from './Components/Calculator';
import decreaseFontSize from './Components/ChangeFontSize';
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

    // set default fontSize
    document.querySelector('.selectNumber').style.fontSize = ''
  }

  const changeFontSize = async () => {
    const parseNumbers =  parseFloat(numbers.join("")).toString().length;
    const selectNumber = document.querySelector('.selectNumber'); 

    if(parseNumbers > 10 && parseNumbers < 18){
      decreaseFontSize(4, '.selectNumber')
    }

    // console.log(selectNumber.style.fontSize);
  }

  
  // set number 
  const setEquationHandler = e => {
    const textContent = e.target.textContent;
    
    // style fontSize
    changeFontSize();
    
    // reset number when select three or more numbers
    if(secondNumber.number === '' && secondNumber.use)
      setNumbers(['0']);
    
    // set secondNumber else set secondNumber with dot
    if(!firstNumber.use && textContent !== '.')
      setSecondNumber(prev => ({...prev, number: secondNumber.number + textContent, use: true}));
    else if(!numbers.find(name => name === '.') && !firstNumber.use && textContent === '.')
      setSecondNumber(prev => ({...prev, number: secondNumber.number + textContent, use: true}));
    
    // if set secondNumber with dot and secondNumber === ''
    if(textContent === '.' && !firstNumber.use && secondNumber.number === '')  
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
    // Set history when result 
    secondNumber.firstVis ? setHistory(prev => [...prev, firstNumber.number, arithmeticSigns, secondNumber.number]) :
                            setHistory(prev => [...prev, arithmeticSigns, secondNumber.number]);

    // set and parse first and second number
    const Cal = new Calc(firstNumber.number === '' ? arithmeticSigns === '*' || arithmeticSigns === '/' ? 1 : 0 : firstNumber.number, 
                parseFloat(secondNumber.number === '' ? arithmeticSigns === '*' || arithmeticSigns === '/' ? 1 : 0 : secondNumber.number));


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

    // style fontSize
    if(result.toString().length > 11)
      decreaseFontSize(20, '.selectNumber');
    
    // assign result to firstNumber
    setFirstNumber({number: result, use: false});
    setNumbers([result]);
  }
  
  // set equals
  const equalsHandler = () => {
    // reset fontSize
    document.querySelector('.selectNumber').style.fontSize = ''

    // use firstNumber or oldResult 
    const tmpFirstNumber = firstNumber.use ?  oldResult : parseFloat(firstNumber.number);
    // set and parse first and second number
    const Cal = new Calc(tmpFirstNumber === '' ? arithmeticSigns === '*' || arithmeticSigns === '/' ? 1 : 0 : tmpFirstNumber, 
                parseFloat(secondNumber.number === '' ? arithmeticSigns === '*' || arithmeticSigns === '/' ? 1 : 0 : secondNumber.number));

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
    
    // style FontSize
    if(result.toString().length > 11)
      decreaseFontSize(20, '.selectNumber');

    // set result
    setNumbers([result]);
  }
  
  useEffect(()=>{
    // set oldResult
    if(firstNumber.use || secondNumber.use)
      setOldResult(parseFloat(numbers.join("")));

    // style fontSize
    const parseNumbers = parseFloat(numbers.join("")).toString().length;
    if(parseNumbers < 11)
      document.querySelector('.selectNumber').style.fontSize = ''
  });

  console.log(firstNumber, secondNumber, secondNumber.firstVis, numbers, equals, arithmeticSigns, oldResult, numbers.join("").replace(/0+/, '0'));
  
  return (
    <main className='calculator'>
      <section id='display' className='display'>
        <p className='smallNumbers'>
        {`${history.join("").replace(/^0/, '')}${secondNumber.firstVis ? firstNumber.number:''}${arithmeticSigns}${secondNumber.number}${equals ? '=' : ''}`}
        </p>
        <p className='selectNumber'>
        {numbers.join('').replace(/0+/, '0').replace(/\b0(?=\d)/, '')}
        </p>
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
