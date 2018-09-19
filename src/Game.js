module.exports = class Game {
  constructor() {

    this.grid = { ROWS: 6, COLS: 7 };
    this.board = [...Array(this.grid.ROWS)].map(() => Array(this.grid.COLS).fill(0));

    this.turn = 1;

    this.displayBoard = () => {
      const displayRow = (acc, row) => acc + `<tr>${row.reduce(displayCol, '')}</tr>`;
      const displayCol = (acc, col, i) => acc + `<td data-col="${i}" class="color-${col}"></td>`;
      return [...this.board].reverse().reduce(displayRow, '');
    };

    this.addTurn = col => {

      // console.log('checking for appropriate row');
      for (let row = 0; row < this.grid.ROWS; row++) {
        if (this.board[row][col] === 0) {
          this.board[row][col] = this.turn;
          this.turn = this.turn === 1 ? 2 : 1;
          // console.log('going to check win condition');
          return this.winCheck(row, col);
        }
      }




    };

    this.winCheck = (row, col) => {
      // make a circle around the last turn and look for a connection of 4
      // MAKE RECURSIVE

      // console.log('starting position', {row, col});
      for (const x of [-1, 0, 1]) {
        if (!this.board[row + x]) continue;
        for (const y of [-1, 0, 1]) {
          if ((x === 0 && y === 0) || !this.board[row + x][col + y]) continue;
          // console.log('inbounds', {x,y});
          if (this.board[row + x][col + y] === this.turn) {
            // console.log('connection', {x, y});
            if (this.lineCheck(row, col, x, y, true)) {
              // console.log('someone won', this.turn);
              return true;
            }
          }
        }
      }

      return false;
    };

    this.lineCheck = (row, col, x, y, direction) => {
      // for (let l = 2; l < 4; l++) {
      //
      // }

      const check = (l) =>
        this.board[row + (x * l)] &&
        this.board[row + (x * l)][col + (y * l)] === this.turn;

      if (check(2)) {
        // console.log('three connected?');
        if (check(3)) {
          // console.log('four connected?');
          return true;
        } else {
          if (direction) return this.lineCheck(row + (x * 2), col + (y * 2), -x, -y, false);
        }
      } else {
        if (direction) return this.lineCheck(row + x, col + y, -x, -y, false);
      }

      return false
    }

  }
};