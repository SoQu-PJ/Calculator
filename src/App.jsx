import { useState } from 'react'
import './App.css'

function App() {

  return (
    <main className='calculator'>
      <section id='display' className='display'>111</section>
      <section className='buttons'>
        <button id='clear'>AC</button>
        <button id='divide' className='arithmetic-signs'>/</button>
        <button id='multiply' className='arithmetic-signs'>X</button>
        <button id='subtract' className='arithmetic-signs'>-</button>
        <button id='add' className='arithmetic-signs'>+</button>
        <button id='nine'>9</button>
        <button id='eight'>8</button>
        <button id='seven'>7</button>
        <button id='six'>6</button>
        <button id='five'>5</button>
        <button id='four'>4</button>
        <button id='three'>3</button>
        <button id='two'>2</button>
        <button id='one'>1</button>
        <button id='zero'>0</button>
        <button id='decimal'>.</button>
        <button id='equals'>=</button>
      </section>
    </main>
  );
}

export default App
