import "./gameSquare.css";
import { useState, useEffect } from "react";

function GameSquare(props) {
  const O_TEXT = "O";
  const X_TEXT = "X";
  const [gameData, setGameData] = useState({});
  const [wontText, setWonText] = useState('TIC TAC TOE GAME');

  useEffect(() => {
    console.log(123);
    setGameData({
      currentPlayer: X_TEXT,
      spaces: Array(9).fill(null),
      wonStatus: false,
    })
  }, []);

  const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [6,4,2],
  ];

  let playerText = document.getElementById("playerText");
  let boxes = Array.from(document.getElementsByClassName("box"));
  let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks');

  const boxClicked = ((e) => {
    const id = e.target.id;
    if(!gameData.wonStatus && !gameData.spaces[id]) {
      gameData.spaces[id] = gameData.currentPlayer;
      e.target.innerText = gameData.currentPlayer;
      if(playerHasWon() !== false ) {
        playerText.style.backgroundColor = winnerIndicator;
        setWonText(`Player ${gameData.currentPlayer} has won!`);
        let winningBlocks = playerHasWon();
        winningBlocks.map(box => boxes[box].style.backgroundColor = winnerIndicator)
        gameData.wonStatus = true;
        return;
      }
      gameData.currentPlayer = (gameData.currentPlayer === X_TEXT) ? O_TEXT : X_TEXT;
    }
  });

  const playerHasWon = (() => {
    for (const condition of winningCombos) {
      let [a,b,c] = condition;
      if(gameData.spaces[a] && (gameData.spaces[a] === gameData.spaces[b] && gameData.spaces[a] === gameData.spaces[c])) {
        return [a,b,c];
      }
    }
    return false;
  })

  const restartGame = ((e) => {
    // Restart the game.
    if(gameData.spaces.includes('X') || gameData.spaces.includes('O')) {
      gameData.spaces.fill(null);
      boxes.forEach(box => {
        box.innerText = '';
        box.style.backgroundColor = '';
      })
      playerText.innerText = wontText;
      gameData.currentPlayer = X_TEXT;
      gameData.wonStatus = false;
    }
  })

// this component can be used to represent each square of the tic tac toe board
  return (
    <div>
      <div className="container">
      <h1>This is your game square component</h1>
        <h2 id="playerText">{wontText}</h2>
        <button id="restartBtn" onClick={restartGame}>Restart</button>
        <div id="gameboard">
          <div className="box" id="0" onClick={boxClicked}></div>
          <div className="box" id="1" onClick={boxClicked}></div>
          <div className="box" id="2" onClick={boxClicked}></div>
          <div className="box" id="3" onClick={boxClicked}></div>
          <div className="box" id="4" onClick={boxClicked}></div>
          <div className="box" id="5" onClick={boxClicked}></div>
          <div className="box" id="6" onClick={boxClicked}></div>
          <div className="box" id="7" onClick={boxClicked}></div>
          <div className="box" id="8" onClick={boxClicked}></div>
        </div>
      </div>
    </div>
  );
}

export default GameSquare;
