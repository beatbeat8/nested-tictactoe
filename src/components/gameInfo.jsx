export default function GameInfo({ currentPlayer, overallBoard }) {
  const winner = checkWin(overallBoard);
  const isTie = boardIsFull(overallBoard) && !winner;

  return (
    <div className="game-info">
      {winner ? (
        <h2>Player {winner} wins the game!</h2>
      ) : isTie ? (
        <h2>The game is a tie!</h2>
      ) : (
        <h2>Current Player: {currentPlayer}</h2>
      )}
    </div>
  );
}