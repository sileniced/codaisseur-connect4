module.exports = class Game {
  constructor() {
    this.turn = 1;

    this.board = [
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
    ];

    this.generateBoard = () => this.board.slice().reverse().reduce(this.generateRow, '');
    this.generateRow = (acc, row) => acc + `<tr>${row.reduce(this.generateCol, '')}</tr>`;
    this.generateCol = (acc, col, i) => acc + `<td data-col="${i}" class="color-${col}"></td>`;

    this.addTurn = col => {
      // console.log('checking for appropriate row');
      for (let row = 0; row < 6; row++) {
        if (this.board[row][col] === 0) {
          this.board[row][col] = this.turn;
          // console.log('going to check win condition');
          if (this.winCheck(row, col)) {
            // console.log(`${this.turn === 1 ? 'red' : 'yellow'} won`);
            return true;
          } else {
            // console.log('win condition is false');
            this.turn = this.turn === 1 ? 2 : 1;
            return false;
          }
        }
      }
    };

    this.winCheck = (row, col) => {
      // make a circle around the last turn and look for a connection of 4
      // MAKE RECURSIVE

      // console.log('starting position', {row, col});
      for (let x = -1; x < 2; x++) {
        if (!this.board[row + x]) continue;
        for (let y = -1; y < 2; y++) {
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