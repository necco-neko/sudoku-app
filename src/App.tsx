import React, { useState } from 'react';
import './App.css';
import { solveSudoku } from './solver/solveSudoku';

const App: React.FC = () => {
  const [cells, setCells] = useState(Array(81).fill(0));
  const [filledCells, setFilledCells] = useState<number[]>([]);

  //リセットボタンの処理
  const handleReset = () => {
    setCells(Array(81).fill(0));
    setFilledCells([]);
  };

  //解答ボタンの処理
  const handleSolve = () => {
    const result = solveSudoku(cells);
    if (result === false) {
      alert("問題が解けません");
    } else {
      setCells(result.solved);
      setFilledCells(result.filledCells);
    }
  };

  //各セル入力変更時の処理
  const handleInputChange = (index: number, value: string) => {
    const updateCells = [...cells];
    //入力が数字で1~9の範囲内の場合に更新(それ以外は0とする)
    updateCells[index] = value.match(/^[1-9]$/) ? parseInt(value) : 0;
    setCells(updateCells);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    let nextIndex = index;

    switch (e.key) {
      case 'ArrowUp':
        if (index >= 9) nextIndex -= 9; //上方向へ移動
        break;
      case 'ArrowDown':
        if (index < 72) nextIndex += 9; //下方向へ移動
        break;
      case 'ArrowLeft':
        if (index !== 0) nextIndex -= 1; //左方向または前の行の右端に移動
        break;
      case 'ArrowRight':
        if (index !== 80) nextIndex += 1; //右方向または次の行の左端に移動
        break;
    }
      
    //移動先のインデックスが有効な範囲内か確認
    if (nextIndex >= 0 && nextIndex < 81) {
      const nextInput = document.getElementById(`cell-${nextIndex}`);
      nextInput?.focus();
    }
  };

  return (
    <div className='app-container'>
      <h1 className='title'>数独解答アプリ</h1>
      {/*<InputForm />*/}
      <div className='sudoku-grid'>
        {cells.map((cell, index) => (
          <input
            key={index}
            id={`cell-${index}`}
            type="text"
            className={`sudoku-cell ${filledCells.includes(index) ? 'filled' : ''}`}
            maxLength={1}
            value={cell !== 0 ? cell.toString() : ""}
            onChange={(e) => handleInputChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, index)}
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
