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
    // TODO:
    return [];
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
