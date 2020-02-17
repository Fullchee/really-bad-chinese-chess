import Piece from "./piece.js";

const possibleSquares = [3, 5, 13, 21, 23, 66, 68, 76, 84, 86];

export default class Advisor extends Piece {
  constructor(player) {
    super(
      player,
      player === 1
        ? "https://upload.wikimedia.org/wikipedia/commons/e/ed/Xiangqi_al1.svg"
        : "https://upload.wikimedia.org/wikipedia/commons/f/f5/Xiangqi_ad1.svg"
    );
  }

  /**
   * @param {[int]} squares
   * @param {int} src
   * @return {[int]} - list of all possible moves from position src
   */
  getAllMoves = (squares, src) => {
    const player = squares[src].player;
    return possibleSquares
      .filter(square => {
        return this.isOneDiagonalAway(src, square);
      })
      .filter(square => {
        // can't move to a piece that's the same team
        if (squares[square]) {
          return squares[square].player !== player;
        }
        return true;
      });
  };

  isOneDiagonalAway = (a, b) => {
    return Math.abs(a - b) === 10 || Math.abs(a - b) === 8;
  };

  /**
   * @param {int} src
   * @param {int} dest
   * @return {boolean}
   */
  isMovePossible(src, dest) {
    return (
      possibleSquares.includes(dest) &&
      (Math.abs(src - dest) % 10 === 0 || Math.abs(src - dest) % 8 === 0)
    );
  }

  /**
   * get path between src and dest (src and dest exclusive)
   * @param  {num} src
   * @param  {num} dest
   * @return {[array]}
   */
  getSrcToDestPath(src, dest) {
    return []; // no intermediate squares
  }
}
