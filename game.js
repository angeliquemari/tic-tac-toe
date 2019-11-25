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
    this.gameOver = false;
    this.gameStatus = undefined;
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
      this.board[i][j] = this.currentPlayer;
      this.checkForWin();
    });
  }

  checkForWin() {
    // check this.board for win, if won, update gameOver and gameStatus
    this.gameOver = true; // placeholder
    this.gameStatus = `Game over! ${this.currentPlayer} won.`; // placeholder
    if (!this.gameOver) {
      this.currentPlayer = (this.currentPlayer === 'X') ? 'O' : 'X';
      this.placePiece();
    } else {
      console.log(this.gameStatus);
      rl.close();
    }
  }
}

var game = new Game();
game.startGame();
