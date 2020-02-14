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

  isMovePossible(src, dest) {
    return Math.abs(src - dest) % 9 === 0 || Math.abs(src - dest) % 7 === 0;
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
