import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [displayValue, setDisplayValue] = useState(['0']);
  const [arithmeticSigns, setArithmeticSigns] = useState({signs: '', use: false})
  const [firstNumber, setFirstNumber] = useState(['0']);
  const [secondNumber, setSecondNumber] = useState(['0']);

  const clearHandler = () =>{
    setDisplayValue(['0']);
    setFirstNumber(['0']);
    setSecondNumber(['0']);
    setArithmeticSigns({signs: '', use: false});
  }

  const setEquation = e =>{
    !arithmeticSigns.use ? setFirstNumber(prev => [...prev, e.target.textContent]) : setSecondNumber(prev => [...prev, e.target.textContent]);
    setDisplayValue(prev => [...prev, e.target.textContent]);
  } 
  
  useEffect(()=>{
    const displayButton = document.querySelectorAll(".display-button");
    
    
    displayButton.forEach(el => {
      el.addEventListener("click", setEquation);
      
      return ()=> el.removeEventListener("click", setEquation)
    });
  }, []);


  return (
    <main className='calculator'>
      <section id='display' className='display'>
        <p className='smallNumbers'>{displayValue.join("").replace(/^0+/,"")}</p>
        <p className='selectNumber'>{!arithmeticSigns.use ? parseFloat(firstNumber.join("")) : parseFloat(secondNumber.join(""))}</p>
      </section>
      <section className='buttons'>
        <button id='clear' onClick={clearHandler}>AC</button>

        <button id='divide' className='display-button arithmetic-signs' onClick={() => setArithmeticSigns({signs: "/", use: true})}>/</button>
        <button id='multiply' className='display-button arithmetic-signs' onClick={() => setArithmeticSigns({signs: "*", use: true})}>X</button>
        <button id='subtract' className='display-button arithmetic-signs' onClick={() => setArithmeticSigns({signs: "-", use: true})}>-</button>
        <button id='add' className='display-button arithmetic-signs' onClick={() => setArithmeticSigns({signs: "+", use: true})}>+</button>
        
        <button id='nine' className='display-button number'>9</button>
        <button id='eight' className='display-button number'>8</button>
        <button id='seven' className='display-button number'>7</button>
        <button id='six' className='display-button number'>6</button>
        <button id='five' className='display-button number'>5</button>
        <button id='four' className='display-button number'>4</button>
        <button id='three' className='display-button number'>3</button>
        <button id='two' className='display-button number'>2</button>
        <button id='one' className='display-button number'>1</button>
        <button id='zero' className='display-button number'>0</button>
        <button id='decimal' className='display-button number'>.</button>
        <button id='equals'>=</button>
      </section>
    </main>
  );
}

export default App
