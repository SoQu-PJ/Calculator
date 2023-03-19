import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [displayValue, setDisplayValue] = useState(["0"]);
  const [firstNumber, setFirstNumber] = useState("");
  const [secondNumber, setSecondNumber] = useState("");

  const setEquation = e =>{
    setDisplayValue();
  } 

  useEffect(()=>{
    const displayButton = document.querySelectorAll(".display-button");
    

    displayButton.forEach(el => {
      el.addEventListener("click", setEquation);
      return () => el.removeEventListener("click", setEquation);
    });

  });

  return (
    <main className='calculator'>
      <section id='display' className='display'>{displayValue}</section>
      <section className='buttons'>
        <button id='clear' onClick={() => setDisplayValue(["0"])}>AC</button>

        <button id='divide' className='display-button arithmetic-signs'>/</button>
        <button id='multiply' className='display-button arithmetic-signs'>X</button>
        <button id='subtract' className='display-button arithmetic-signs'>-</button>
        <button id='add' className='display-button arithmetic-signs'>+</button>
        
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
