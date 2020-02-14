import Piece from "./piece.js";

export default class Advisor extends Piece {
  constructor(player) {
    super(
      player,
      player === 1
        ? "https://upload.wikimedia.org/wikipedia/commons/e/ed/Xiangqi_al1.svg"
        : "https://upload.wikimedia.org/wikipedia/commons/f/f5/Xiangqi_ad1.svg"
    );
  }

  isMovePossible(src, dest) {
    const possibleSquares = [3, 5, 13, 21, 23, 66, 68, 76, 84, 86];
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
    return [];
  }
}
