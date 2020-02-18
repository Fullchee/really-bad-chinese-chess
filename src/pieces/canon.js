import Piece from "./piece.js";

const ROW_SIZE = 9;

export default class Canon extends Piece {
  constructor(player) {
    super(
      player,
      player === 1
        ? "https://upload.wikimedia.org/wikipedia/commons/1/1f/Xiangqi_cl1.svg"
        : "https://upload.wikimedia.org/wikipedia/commons/4/43/Xiangqi_cd1.svg"
    );
  }

  /**
   *
   * @return {boolean}
   */
  isMovePossible = (src, dest, squareHasEnemy, squares) => {
    // check if vertical
    if (src === dest) {
      return false; // can't move to self
    }
    if (!this.isVertical(src, dest) && !this.isHorizontal(src, dest)) {
      return false;
    }
    if (squareHasEnemy) {
      const srcToDest = this.getSrcToDestPath(src, dest);
      let middlePieces = 0;
      for (let square of srcToDest) {
        if (squares[square]) {
          middlePieces++;
        }
      }
      return middlePieces === 1;
      // check if there's something to skip over
    } else {
      // same thing as rook
      let mod = src % ROW_SIZE;
      let diff = ROW_SIZE - mod;
      return (
        Math.abs(src - dest) % ROW_SIZE === 0 ||
        (dest >= src - mod && dest < src + diff)
      );
    }
  };

  /**
   * @param {[int]} squares
   * @param {int} src
   * @return {[int]} - list of all possible moves from position src
   */
  getAllMoves = (squares, src) => {
    let possibleMoves = [];
    let jump;
    // up
    let i = src - 9;
    jump = 1;
    // up
    while (Math.floor(i / 9) >= 0 && jump >= 0) {
      debugger;
      if (jump === 1 && squares[i] === null) possibleMoves.push(i);
      if (jump === 0 && squares[i] !== null) {
        possibleMoves.push(i);
        break;
      }
      if (squares[i] !== null) jump -= 1;
      i -= 9;
    }
    // down
    i = src + 9;
    jump = 1;
    while (Math.floor(i / 9) <= 9 && jump >= 0) {
      if (jump === 1 && squares[i] === null) possibleMoves.push(i);
      if (jump === 0 && squares[i] !== null) {
        possibleMoves.push(i);
        break;
      }
      if (squares[i] !== null) jump -= 1;
      i += 9;
    }
    // left
    i = src - 1;
    jump = 1;
    while (i % 9 < 8 && jump >= 0) {
      if (jump === 1 && squares[i] === null) possibleMoves.push(i);
      if (jump === 0 && squares[i] !== null) {
        possibleMoves.push(i);
        break;
      }
      if (squares[i] !== null) jump -= 1;
      i -= 1;
    }
    // right
    i = src + 1;
    jump = 1;
    while (i % 9 > 0 && jump >= 0) {
      if (jump === 1 && squares[i] === null) possibleMoves.push(i);
      if (jump === 0 && squares[i] !== null) {
        possibleMoves.push(i);
        break;
      }
      if (squares[i] !== null) jump -= 1;
      i++;
    }

    return possibleMoves.filter(pos => {
      if (squares[pos]) {
        return squares[pos].player !== this.player;
      }
      return true;
    });
  };

  /**
   * @param {int} src
   * @param {int} dest
   * @return {boolean}
   */
  isVertical(src, dest) {
    return src % ROW_SIZE === dest % ROW_SIZE;
  }
  /**
   * @param {int} src
   * @param {int} dest
   * @return {boolean}
   */
  isHorizontal(src, dest) {
    return Math.floor(src / ROW_SIZE) === Math.floor(dest / ROW_SIZE);
  }

  /**
   * get path between src and dest (src and dest exclusive)
   * @param  {int} src
   * @param  {int} dest
   * @return {[array]} - array of square numbers from src to dest
   */
  getSrcToDestPath = (src, dest) => {
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
  };
}
