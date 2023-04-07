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

    
  const clearHandler = () =>{
    setHistory(['0']);
    setNumbers(['0']);
    setFirstNumber({number: '', use: true});
    setSecondNumber({number: '', use: false, firstVis: true});
    setArithmeticSigns('');
    setEquals(false);
    setOldResult(0);
  }
  
  const setEquationHandler = e => {
    const textContent = e.target.textContent;
    
    if(!firstNumber.use){
      setSecondNumber(prev => ({...prev, number: secondNumber.number + textContent, use: true}));
      setNumbers(['0']);
    }  

    if(equals)
      clearHandler();
    
    setNumbers(prev => [...prev, textContent]);

  } 
  
  const setArithmeticSignsHandler = e => {
    setEquals(false);
    setArithmeticSigns('');

    setSecondNumber({number: '', use: true, firstVis: true});
    setHistory(['0']);

    // active equalsArithmeticSignsHandler function 
    // if(arithmeticSigns !== '' && secondNumber.number)
    //   equalsArithmeticSignsHandler();

    // select firstNumber
    if(firstNumber.use){
      setFirstNumber({number: parseFloat(numbers.join("")), use: false});
      setNumbers(['0']);
    }

    setArithmeticSigns(e.target.dataset.sign);
  }


  const equalsArithmeticSignsHandler = () => {
    // Set history when result 
    secondNumber.firstVis ? setHistory(prev => [...prev, firstNumber.number, arithmeticSigns, secondNumber.number]) :
                            setHistory(prev => [...prev, arithmeticSigns, secondNumber.number])

    setFirstNumber({number: '', use: false});
    setSecondNumber({number: '', use: true, firstVis: false});
    setArithmeticSigns('');

    let result;

    if(arithmeticSigns === '+')
      result = Cal.add();
    
    // assign result to firstNumber
    setFirstNumber({number: result, use: false});
    setNumbers([result]);
  }
  
  const equalsHandler = () => {
    const tmpFirstNumber = firstNumber.use ?  oldResult : parseFloat(firstNumber.number);
    const Cal = new Calc(tmpFirstNumber, parseFloat(secondNumber.number));

    setFirstNumber({number: oldResult, use: true})
 
    setEquals(true);
    setHistory(['0']);
      
    let result;
    
    if(arithmeticSigns === '+')
    result = Cal.add();
    
    setNumbers([result]);
  }
  
  useEffect(()=>{
    setOldResult(parseFloat(numbers.join("")));
  });

  console.log(firstNumber, secondNumber, secondNumber.firstVis, numbers);
  
  // console.log(firstNumber, secondNumber);\

  return (
    <main className='calculator'>
      <section id='display' className='display'>
        <p className='smallNumbers'>
        {`${history.filter(el => !/^0+/.test(el)).join("")}/${secondNumber.firstVis ? firstNumber.number:''}/${arithmeticSigns}/${secondNumber.number}/${equals ? '=' : ''}`}
        </p>
        <p className='selectNumber'>{arithmeticSigns === '' || equals ? parseFloat(numbers.join("")) : firstNumber.number}</p>
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
