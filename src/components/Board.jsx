import Square from './Square';
import '../styles/Board.css';
import {checkWin} from '../hooks/usegameLogic'

export default function Board({ board, onSquareClick, active, disabled, winner }) {
   
    return (
        <div className="board-container" role="region">
            <div className="board">
                {board.map((row, rowIdx) =>
                    <div key={rowIdx} className="board-row">
                    {row.map((square, colIdx) =>
                        <Square
                        key={colIdx}
                        value={square}
                        active={active}
                        disabled={disabled}
                        id={`square-${rowIdx}-${colIdx}`}
                        onClick={() => onSquareClick(rowIdx, colIdx)}
                        />
                    )}
                    </div>
                )}
            </div>
            {active ? (
                <img
                src={`${process.env.PUBLIC_URL}/boardComponents/microboard-active.png`}
                alt="Active Board Highlight"
                className="active-board"
                aria-hidden="true"
                />
            ) : (
                <img
                src={`${process.env.PUBLIC_URL}/boardComponents/microboard-inactive.png`}
                alt="Inactive Board Overlay"
                className="inactive-board"
                aria-hidden="true"
                />
            )}
            {winner && (
                <img
                src={winner === 'X' ?
                    `${process.env.PUBLIC_URL}/boardComponents/crossMarker-active.png`
                    : `${process.env.PUBLIC_URL}/boardComponents/circleMarker-active.png`}
                alt={`${winner} won`}
                className="winner-background"
                aria-hidden="true"
                />
            )}
        </div>
    );
}