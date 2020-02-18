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
  isMovePossible(src, dest, hasEnemy, squares) {
    const possibleSquares = {
      2: [3, 4, 5, 12, 13, 14, 21, 22, 23],
      1: [66, 67, 68, 75, 76, 77, 84, 85, 86]
    };

    return (
      possibleSquares[this.player].includes(dest) &&
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
  getSrcToDestPath = (src, dest) => {
    return [];
  };
  /**
   * @param {[int]} squares
   * @param {int} src
   * @return {[int]} - list of all possible moves from position src
   */
  getAllMoves = (squares, src) => {
    let possibleMoves;

    switch (src) {
      case 84:
        possibleMoves = [75, 76, 85];
        break;
      case 85:
        possibleMoves = [84, 86, 76];
        break;
      case 86:
        possibleMoves = [76, 77, 85];
        break;
      case 75:
        possibleMoves = [66, 76, 84];
        break;
      case 76:
        possibleMoves = [66, 67, 68, 75, 76, 77, 84, 85, 86];
        break;
      case 77:
        possibleMoves = [68, 76, 86];
        break;
      case 66:
        possibleMoves = [67, 75, 76];
        break;
      case 67:
        possibleMoves = [66, 68, 76];
        break;
      case 68:
        possibleMoves = [67, 76, 77];
        break;
      case 3:
        possibleMoves = [4, 12, 13];
        break;
      case 4:
        possibleMoves = [3, 5, 13];
        break;
      case 5:
        possibleMoves = [4, 13, 14];
        break;
      case 12:
        possibleMoves = [3, 13, 21];
        break;
      case 13:
        possibleMoves = [3, 4, 5, 12, 14, 21, 22, 23];
        break;
      case 14:
        possibleMoves = [5, 13, 23];
        break;
      case 21:
        possibleMoves = [12, 13, 22];
        break;
      case 22:
        possibleMoves = [13, 21, 23];
        break;
      case 23:
        possibleMoves = [13, 14, 22];
        break;
      default:
        throw new Error("King in an illegal state " + src);
    }

    const [blackKing, redKing] = squares.filter(pos => {
      if (pos) {
        return pos.constructor.name === "King";
      }
    });

    // TODO: two kings cannot see each other
    // this.player

    // no friendly fire
    return possibleMoves.filter(pos => {
      if (squares[pos]) {
        return squares[pos].player !== this.player;
      }
      return true;
    });
  };
}
