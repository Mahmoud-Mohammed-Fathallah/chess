import { useEffect, useState } from 'react';
import './App.css';
import Board from './components/Board';
import {gameSubject,newGame} from './Game.js';

function App() {
  let [board, setBoard] = useState([]);
  let [gameOver, setGameOver] = useState(false);
  let [result, setResult] = useState(null);

  useEffect(()=>{
    const sub = gameSubject.subscribe(game => {
      setBoard(game.board)
      setGameOver(game.gameOver)
      setResult(game.result)
    })
    return ()=> sub.unsubscribe();
  },[])
  return (
    <div className="App">
      <div className='top-bar'>
        {gameOver && <div className='result'>{result}</div>}
        <button className='btn' onClick={()=>newGame()}>
          new game
        </button>
      </div>
      <Board board={board}/>
    </div>
  );
}

export default App;
