import React from 'react';
import './App.css';

function App() {
  return (
    <div className='app-container'>
      <h1 className='title'>数独解答アプリ</h1>
      {/*<InputForm />*/}
      <div className='sudoku-grid'>
        {Array.from({ length: 81 }, (_, index) => (
          <input
            key={index}
            type="text"
            className="sudoku-cell"
            maxLength={1}
          />
        ))}
      </div>
      <div className='button-container'>
        <button className='reset-button'>リセット</button>
        <button className='solve-button'>解答</button>
      </div>
    </div>
  );
};

export default App;
