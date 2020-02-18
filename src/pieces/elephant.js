import Piece from "./piece.js";

export default class Elephant extends Piece {
  constructor(player) {
    super(
      player,
      player === 1
        ? "https://upload.wikimedia.org/wikipedia/commons/7/77/Xiangqi_el1.svg"
        : "https://upload.wikimedia.org/wikipedia/commons/1/1a/Xiangqi_ed1.svg"
    );
  }

  // TODO: use getAllMoves instead
  isMovePossible(src, dest) {
    return Math.abs(src - dest) % 9 === 0 || Math.abs(src - dest) % 7 === 0;
  }

  /**
   * @param {[int]} squares
   * @param {int} src
   * @return {[int]} - list of all possible moves from position src
   */
  getAllMoves = (squares, src) => {
    let possibleMoves = [];
    const row = Math.floor(src / 9);
    const col = src % 9;
    // top left
    if (row >= 2) {
      if (col >= 2) possibleMoves.push(src - 20);
      if (col <= 7) possibleMoves.push(src - 16);
    }
    // down
    if (row <= 7) {
      if (col >= 2) possibleMoves.push(src + 16);
      if (col <= 7) possibleMoves.push(src + 20);
    }
    // elephants can't cross the river
    possibleMoves =
      src < 45
        ? possibleMoves.filter(pos => pos < 45)
        : possibleMoves.filter(pos => pos >= 45);
    return possibleMoves.filter(pos => {
      if (squares[pos]) {
        return squares[pos].player !== this.player;
      }
      return true;
    });
  };

  /**
   * get path between src and dest (src and dest exclusive)
   * @param  {num} src
   * @param  {num} dest
   * @return {[array]}
   */
  getSrcToDestPath(src, dest) {
    return [];
  }
}
