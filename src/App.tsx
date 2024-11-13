import React, { useState } from 'react';
import './App.css';
import { solveSudoku } from './solver/solveSudoku';

const App: React.FC = () => {
  const [cells, setCells] = useState(Array(81).fill(0));

  //リセットボタンの処理
  const handleReset = () => {
    setCells(Array(81).fill(0));
  };

  //解答ボタンの処理
  const handleSolve = () => {
    const result = solveSudoku(cells);
    if (result === false) {
      alert("問題が解けません");
    } else {
      setCells(result);
    }
  };

  //各セル入力変更時の処理
  const handleInputChange = (index: number, value: string) => {
    const updateCells = [...cells];
    //入力が数字で1~9の範囲内の場合に更新(それ以外は0とする)
    updateCells[index] = value.match(/^[1-9]$/) ? parseInt(value) : 0;
    setCells(updateCells);
  };

  return (
    <div className='app-container'>
      <h1 className='title'>数独解答アプリ</h1>
      {/*<InputForm />*/}
      <div className='sudoku-grid'>
        {cells.map((cell, index) => (
          <input
            key={index}
            type="text"
            className="sudoku-cell"
            maxLength={1}
            value={cell !== 0 ? cell.toString() : ""}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
        ))}
      </div>
      <div className='button-container'>
        <button className='reset-button' onClick={handleReset}>リセット</button>
        <button className='solve-button' onClick={handleSolve}>解答</button>
      </div>
    </div>
  );
};

export default App;
