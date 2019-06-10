import Piece from "./piece.js";

export default class Knight extends Piece {
  constructor(player) {
    super(
      player,
      player === 1
        ? "https://upload.wikimedia.org/wikipedia/commons/0/04/Xiangqi_hl1.svg"
        : "https://upload.wikimedia.org/wikipedia/commons/9/9d/Xiangqi_hd1.svg"
    );
  }

  isMovePossible(src, dest) {
    // TODO: check if the src -- 9 already has a piece
    // above
    if (src - 17 === dest || src - 19 === dest) {
      return src - 9; // check if it's not blocked
    }
    // left
    if (src - 11 === dest || src + 7 === dest) {
      return src - 1;
    }
    // right
    if (src - 7 === dest || src + 11 === dest) {
      return src + 1;
    }
    // below
    if (src + 17 === dest || src + 19 === dest) {
      return src + 9;
    }
  }

  /**
   * always returns empty array because of jumping
   * @return {[]}
   */
  getSrcToDestPath() {
    return [];
  }
}
