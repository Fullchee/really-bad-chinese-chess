import Piece from "./piece.js";

export default class King extends Piece {
  constructor(player) {
    const redKingURL =
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Xiangqi_gl1.svg/800px-Xiangqi_gl1.svg.png";
    const blackKingURL =
      "https://upload.wikimedia.org/wikipedia/commons/6/69/Xiangqi_gd1.svg";
    super(player, player === 1 ? redKingURL : blackKingURL);
  }

  /**
   * @param {int} src - square number: 0 to 63
   * @param {int} dest - destination square number 0 to 63
   * @return {boolean} - whether the move is legal or not
   */
  isMovePossible(src, dest) {
    const possibleSquares = [
      3,
      4,
      5,
      12,
      13,
      14,
      21,
      22,
      23,
      66,
      67,
      68,
      75,
      76,
      77,
      84,
      85,
      86
    ];

    return (
      possibleSquares.includes(dest) &&
      (src - 9 === dest ||
        src - 8 === dest ||
        src - 10 === dest ||
        src + 1 === dest ||
        src + 9 === dest ||
        src + 8 === dest ||
        src + 10 === dest ||
        src - 1 === dest)
    );
  }

  /**
   * always returns empty array because of one step
   * @return {[]}
   */
  getSrcToDestPath(src, dest) {
    return [];
  }
}
