import React, { useState } from 'react';
import Grid from '@mui/material/Grid';

import Board from './Board';
import '../styles/NestedTicTacToe.css';
import {checkWin, boardIsFull} from '../hooks/usegameLogic'

// Helper to create an empty nested board: 3x3 boards, each with 3x3 squares
function createEmptyNestedBoard() {
  return Array(3).fill().map(() =>
    Array(3).fill().map(() =>
      Array(3).fill().map(() => Array(3).fill(null))
    )
  );
}

function createAlmostWonBoard() {
    return [
        [  // Top Row
          [  // Top Left Board
            ['X', 'X', 'X'],
            [null, null, null],
            [null, null, null]
          ],
          [  // Top Center Board
            ['X', 'X', 'X'],
            [null, null, null],
            [null, null, null]
          ],
          [  // Top Right Board
            ['X', 'X', null],
            [null, null, null],
            [null, null, null]
          ]
        ],
        [ // Middle Row
          [  // Center Left Board
            [null, null, null],
            [null, null, null],
            [null, null, null]
          ],
          [ // Center Board (almost won for X)
            [null, null, null],
            [null, null, null],
            [null, null, null]
          ],
          [ // Center Right Board
            [null, null, null],
            [null, null, null],
            [null, null, null]
          ]
        ],
        [ // Bottom Row
          [ // Bottom Left Board
            [null, null, null],
            [null, null, null],
            [null, null, null]
          ],
          [ // Bottom Center Board
            [null, null, null],
            [null, null, null],
            [null, null, null]
          ],
          [ // Bottom Right Board
            [null, null, null],
            [null, null, null],
            [null, null, null]
          ]
        ]
      ];      
}

function GameInfo({ currentPlayer, overallBoard, nestedBoard }) {
    const winner = checkWin(overallBoard);
    const isTie = overallBoard.flat().every(cell => cell !== null) && !winner;
    let marker = null;
    if (winner === "X") {
        marker = <img src={`${process.env.PUBLIC_URL}/boardComponents/crossMarker-active.png`} alt="X" 
        style={{ width: '1.5em', height: '1.5em', verticalAlign: 'middle' }} />;
    } else if (winner === "O") {
        marker = <img src={`${process.env.PUBLIC_URL}/boardComponents/circleMarker-active.png`} alt="O" 
        style={{ width: '1.5em', height: '1.5em', verticalAlign: 'middle' }} />;
    } else if (currentPlayer === "X") {
        marker = <img src={`${process.env.PUBLIC_URL}/boardComponents/crossMarker-active.png`} alt="X" 
        style={{ width: '1.5em', height: '1.5em', verticalAlign: 'middle' }} />;
    } else if (currentPlayer === "O") {
        marker = <img src={`${process.env.PUBLIC_URL}/boardComponents/circleMarker-active.png`} alt="O" 
        style={{ width: '1.5em', height: '1.5em', verticalAlign: 'middle' }} />;
    }   

    return (
        <div className="game-info">
            {nestedBoard.every(nestedBoardRow => nestedBoardRow.every(boardRow => boardRow.every(boardCol => boardCol.every(cell => cell === null)))) ? (
                <>
                    <h2>Rules:</h2>
                    <ul class="rules-list">
                        <li>Play on any board.</li>
                        <li>Your move determines the board your opponent must play on next. e.g: playing in the centre square of any board forces your opponent to play their next move in the center board</li>
                        <li>If sent to a full board, your opponent can play anywhere.</li>
                    </ul>
                </>
            ) : (
                <>
                    <h2>Current Game State:</h2>
                    <Board 
                        board={overallBoard} 
                        active={true} 
                        disabled={true} // disable clicking
                    />
                </>
                )}      
                {winner ? (
                    <h2>Player {marker} wins!</h2>
                ) : isTie ? (
                    <h2>The game is a tie!</h2>
                ) : (
                    <h2>Current Player: {marker}</h2>
                )}

        </div>
    );
}

export default function NestedTicTacToe() {

//   const [nestedBoard, setNestedBoard] =  useState(createAlmostWonBoard());
  const [nestedBoard, setNestedBoard] = useState(createEmptyNestedBoard()) // useState(createAlmostWonBoard());
//   const [overallBoard, setOverallBoard] = useState([['X', 'X', null],[null, null, null],[null, null, null]]) 
  const [overallBoard, setOverallBoard] = useState(Array(3).fill().map(() => Array(3).fill(null)));
//   const [currentBoard, setCurrentBoard] = useState([0,2]); 
  const [currentBoard, setCurrentBoard] = useState(null); 
  const [currentPlayer, setCurrentPlayer] = useState('X');

  function handleSquareClick(boardRow, boardCol, squareRow, squareCol) {
    // Deep copy the nestedBoard for immutability
    const boardCopy = nestedBoard.map(b => b.map(c => c.map(r => [...r])));

    // Only allow move if the square is empty and it's the correct board
    if (!boardCopy[boardRow][boardCol][squareRow][squareCol] && 
        (!currentBoard || (boardRow === currentBoard[0] && boardCol === currentBoard[1]))) { 
      
        boardCopy[boardRow][boardCol][squareRow][squareCol] = currentPlayer;
        setNestedBoard(boardCopy);
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
        // if the targeted board is full, allow player to choose any board
        if (boardIsFull(boardCopy[squareRow][squareCol])) {
          setCurrentBoard(null); 
        }
        else {
            setCurrentBoard([squareRow, squareCol]);
        }
        // Check if this small board has been won
        if (checkWin(boardCopy[boardRow][boardCol]) && !overallBoard[boardRow][boardCol]) {
            const overallCopy = overallBoard.map(r => [...r]);
            overallCopy[boardRow][boardCol] = checkWin(boardCopy[boardRow][boardCol]);
            setOverallBoard(overallCopy);

            // Check if the overall game has been won
            if (checkWin(overallCopy)) {
                // set all boards to null to prevent further moves
                setCurrentBoard(null);

            }
        }
    }
  }

  // Renders all nested boards
  return (
    <Grid container spacing={2}>
        <Grid size={12}>
            <h1 className="app-header">NESTED TIC-TAC-TOE</h1>
        </Grid>
        <Grid size={7}>
            <div className='nested-board-container'>
            <img
                src={
                    checkWin(overallBoard) || currentBoard === null
                    ? `${process.env.PUBLIC_URL}/boardComponents/macroboard.png`
                    : `${process.env.PUBLIC_URL}/boardComponents/macroboard-inactive.png`
                }
                className="board-bg"
            />
                <div className="nested-board">
                {nestedBoard.map((board, boardRow) =>
                    <div key={boardRow} className="nested-board-row">
                    {board.map((squares, boardCol) =>
                        <Board
                        key={boardCol}
                        board={squares}
                        active={currentBoard === null || (currentBoard[0] === boardRow && currentBoard[1] === boardCol)}
                        disabled={checkWin(overallBoard)}
                        id={`board-${boardRow}-${boardCol}`}
                        winner={overallBoard[boardRow][boardCol]}
                        onSquareClick={(squareRow, squareCol) =>
                            handleSquareClick(boardRow, boardCol, squareRow, squareCol)
                        }
                        />
                    )}
                    </div>
                )}
                </div>
            </div>
        </Grid>
        <Grid size={5}>
            <GameInfo currentPlayer={currentPlayer} overallBoard={overallBoard} nestedBoard={nestedBoard}/>
            {/* Play Again */}
            {(checkWin(overallBoard) || (overallBoard.flat().every(cell => cell !== null) && !checkWin(overallBoard))) && (
                <button className="play-again-button" onClick={() => {
                    setNestedBoard(createEmptyNestedBoard());
                    setOverallBoard(Array(3).fill().map(() => Array(3).fill(null)));
                    setCurrentBoard(null);
                    setCurrentPlayer('X');
                }}>
                    <h2>Play Again</h2>
                </button>
            )}
        </Grid>
    </Grid>
  );
}
