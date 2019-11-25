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
      this.board[i][j] = this.currentPlayer; // todo: add error handling if position already filled
      this.checkForWin();
    });
  }

  checkForWin() {
    // this.gameStatus = this.getGameStatus(), if win / tie, update gameOver
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

  getGameStatus() {
    // loop through winning combos
    // if any is all current player, return 'win'
    // if all squares filled, return 'tie'
    // else return 'in progress'
  }
}

var game = new Game();
game.startGame();
