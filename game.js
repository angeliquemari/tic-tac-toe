const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class Game {
  constructor() {
    this.board = [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ];
    this.currentPlayer = 'X';
    this.piecesPlacedCount = 0;
    this.gameOver = false;
    this.gameStatus = 'in progress';
  }
  startGame() {
    this.placePiece();
  }

  placePiece() {
    console.log('Board:', this.board);
    let prompt = `Player ${this.currentPlayer}, where do you want to place your piece? (Format answer: i, j) `;
    rl.question(prompt, (position) => {
      let ij = position.split(', ');
      let i = ij[0];
      let j = ij[1];
      if (this.board[i][j]) {
        console.log('There is already a piece there, please try again.');
        return this.placePiece();
      }
      this.board[i][j] = this.currentPlayer;
      this.piecesPlacedCount++;
      this.checkForWin(i, j);
    });
  }

  checkForWin(i, j) {
    this.gameStatus = this.getGameStatus(i, j);
    if (this.gameStatus !== 'in progress') this.gameOver = true;
    if (!this.gameOver) {
      this.currentPlayer = (this.currentPlayer === 'X') ? 'O' : 'X';
      this.placePiece();
    } else {
      if (this.gameStatus === 'tie') {
        console.log('Game over. It was a tie!');
      } else {
        console.log(`Game over. ${this.currentPlayer} won!`);
      }
      rl.close();
    }
  }

  getGameStatus(i, j) {
    if (this.piecesPlacedCount === 9) return 'tie';
    // loop through row
    let counter = 0;
    for (let y = 0; y < 3; y++) {
      if (this.board[i][y] === this.currentPlayer) counter++;
    }
    if (counter === 3) return 'win';
    // loop through column
    counter = 0;
    for (let x = 0; x < 3; x++) {
      if (this.board[x][j] === this.currentPlayer) counter++;
    }
    if (counter === 3) return 'win';
    // loop through major diagonal
    counter = 0;
    let diagonal = [[0, 0], [1, 1], [2, 2]];
    for (let z = 0; z < 3; z++) {
      let x = diagonal[z][0];
      let y = diagonal[z][1];
      if (this.board[x][y] === this.currentPlayer) counter++;
    }
    if (counter === 3) return 'win';
    // loop through minor diagonal
    counter = 0;
    diagonal = [[2, 0], [1, 1], [0, 2]];
    for (let z = 0; z < 3; z++) {
      let x = diagonal[z][0];
      let y = diagonal[z][1];
      if (this.board[x][y] === this.currentPlayer) counter++;
    }
    return 'in progress';
  }
}

var game = new Game();
game.startGame();
