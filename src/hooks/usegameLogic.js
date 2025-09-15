function allEqual(arr) {
    return arr.every(v => v !== null && v === arr[0]);
}
  
export function checkWin(board) {
    const lines = [
      // Rows
      [[0,0],[0,1],[0,2]],
      [[1,0],[1,1],[1,2]],
      [[2,0],[2,1],[2,2]],
      // Columns
      [[0,0],[1,0],[2,0]],
      [[0,1],[1,1],[2,1]],
      [[0,2],[1,2],[2,2]],
      // Diagonals
      [[0,0],[1,1],[2,2]],
      [[0,2],[1,1],[2,0]],
    ];
    for (let line of lines) {
      const [a,b,c] = line;
      const values = [board[a[0]][a[1]], board[b[0]][b[1]], board[c[0]][c[1]]];
      if (allEqual(values)) {
        return values[0]; // Return 'X' or 'O'
      }
    }
    return null;
}

export function boardIsFull(board) {
    return board.flat().every(cell => cell !== null);
}