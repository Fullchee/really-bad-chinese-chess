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

  isMovePossible(src, dest) {
    // TODO: 4 directions
    // TODO: get the value of the killable item if it exists
    if (src < dest) {
      let horDiff = src % ROW_SIZE;
      let diff = ROW_SIZE - horDiff;
      return (
        Math.abs(src - dest) % ROW_SIZE === 0 ||
        (dest >= src - horDiff && dest < src + diff)
      );
    } else if (src > dest) {
    }
    return false; // can't move to self
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
}
