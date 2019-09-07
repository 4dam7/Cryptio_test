import React from 'react';
import './App.css';
import Converter from './converter/Converter'
import cryptio from './cryptio.png'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img className="image" src={cryptio} width="234" height="62"/>
        <p className="title">Currency conversion service</p>
        <p3 className="subtitle">A Cryptio test</p3>
      </header>
      <Converter/>
    </div>
  );
}

export default App;
