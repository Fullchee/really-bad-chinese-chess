import Piece from "./piece.js";

const ROW_SIZE = 9;

export default class Rook extends Piece {
  constructor(player) {
    super(
      player,
      player === 1
        ? "https://upload.wikimedia.org/wikipedia/commons/2/2e/Xiangqi_rl1.svg"
        : "https://upload.wikimedia.org/wikipedia/commons/f/f7/Xiangqi_rd1.svg"
    );
  }

  isMovePossible(src, dest) {
    let mod = src % ROW_SIZE;
    let diff = ROW_SIZE - mod;
    return (
      Math.abs(src - dest) % ROW_SIZE === 0 ||
      (dest >= src - mod && dest < src + diff)
    );
  }

  /**
   * get path between src and dest (src and dest exclusive)
   * @param  {num} src
   * @param  {num} dest
   * @return {[array]}
   */
  getSrcToDestPath(src, dest) {
    let path = [],
      pathStart,
      pathEnd,
      incrementBy;
    if (src > dest) {
      pathStart = dest;
      pathEnd = src;
    } else {
      pathStart = src;
      pathEnd = dest;
    }
    if (Math.abs(src - dest) % ROW_SIZE === 0) {
      incrementBy = ROW_SIZE;
      pathStart += ROW_SIZE;
    } else {
      incrementBy = 1;
      pathStart += 1;
    }

    for (let i = pathStart; i < pathEnd; i += incrementBy) {
      path.push(i);
    }
    return path;
  }

  /**
   * @param {[int]} squares
   * @param {int} src
   * @return {[int]} - list of all possible moves from position src
   */
  getAllMoves = (squares, src) => {
    let possibleMoves = [];
    // up
    let i = src - 9;
    while (Math.floor(i / 9) >= 0 && squares[i] === null) {
      possibleMoves.push(i);
      i -= 9;
    }
    if (this.hasEnemy(squares, i) && Math.floor(i / 9) >= 0) {
      possibleMoves.push(i);
    }
    i = src + 9;
    while (Math.floor(i / 9) <= 9 && squares[i] === null) {
      possibleMoves.push(i);
      i += 9;
    }
    if (this.hasEnemy(squares, i) && Math.floor(i / 9) <= 9) {
      possibleMoves.push(i);
    }
    i = src - 1;
    while (i % 9 < 8 && squares[i] === null) {
      possibleMoves.push(i);
      i -= 1;
    }
    if (this.hasEnemy(squares, i) && i % 9 < 8) {
      possibleMoves.push(i);
    }
    i = src + 1;
    while (i % 9 > 0 && squares[i] === null) {
      possibleMoves.push(i);
      i++;
    }
    if (this.hasEnemy(squares, i) && i % 9 > 0) {
      possibleMoves.push(i);
    }
    return possibleMoves.filter(pos => {
      if (squares[pos]) {
        return squares[pos].player !== this.player;
      }
      return true;
    });
  };
  hasEnemy = (squares, i) => {
    if (squares[i] && squares[i].player !== this.player) {
      return true;
    }
  };
}
