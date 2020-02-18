import Piece from "./piece.js";

export default class Pawn extends Piece {
  constructor(player) {
    super(
      player,
      player === 1
        ? "https://upload.wikimedia.org/wikipedia/commons/0/0f/Xiangqi_sl1.svg"
        : "https://upload.wikimedia.org/wikipedia/commons/0/03/Xiangqi_sd1.svg"
    );
    // new piece of state!, if in these position, you can move 2!
    this.crossed = {
      1: [48, 49, 50, 51, 52, 53, 54, 55],
      2: [8, 9, 10, 11, 12, 13, 14, 15]
    };
  }

  /**
   * @param {int} pos
   * @return {boolean} - whether the pawn crossed the river
   */
  crossedRiver = pos => {
    return this.player === 1 ? pos < 45 : pos >= 45;
  };

  isMovePossible(src, dest) {
    if (this.player === 1) {
      if (dest === src - 9) {
        return true;
      }
      // allowed to go sideways once past the river
      else if (
        src < 45 &&
        ((dest === src - 1 && src % 9 !== 0) ||
          (dest === src + 1 && src % 9 !== 8))
      ) {
        return true;
      }
    } else if (this.player === 2) {
      if (dest === src + 9) {
        return true;
      } else if (
        src >= 45 &&
        ((dest === src - 1 && src % 9 !== 0) ||
          (dest === src + 1 && src % 9 !== 8))
      ) {
        return true;
      }
    }
    return false;
  }

  /**
   * returns array of one if pawn moves two steps, else returns empty array
   * @param  {[type]} src  [description]
   * @param  {[type]} dest [description]
   * @return {[type]}      [description]
   */
  getSrcToDestPath(src, dest) {
    // no jumping
    return [];
  }

  /**
   * @param {[int]} squares
   * @param {int} src
   * @return {[int]} - list of all possible moves from position src
   */
  getAllMoves = (squares, src) => {
    const possibleMoves = [];
    if (this.crossedRiver(src)) {
      if (src % 9 !== 0) {
        possibleMoves.push(src - 1);
      }
      if (src % 9 !== 8) {
        possibleMoves.push(src + 1);
      }
    }
    if (this.player === 1 && src >= 9) {
      possibleMoves.push(src - 9);
    }
    if (this.player === 2 && src <= 80) {
      possibleMoves.push(src + 9);
    }
    // remove friendly fire
    return possibleMoves.filter(pos => {
      if (squares[pos]) {
        return squares[pos].player !== this.player;
      }
      return true;
    });
  };
}
