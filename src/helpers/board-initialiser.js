import Elephant from "../pieces/elephant.js";
import King from "../pieces/king.js";
import Knight from "../pieces/knight.js";
import Pawn from "../pieces/pawn.js";
import Rook from "../pieces/rook.js";
import Advisor from "../pieces/advisor.js";
import Canon from "../pieces/canon.js";

export default function initialiseChessBoard() {
  const squares = Array(90).fill(null);

  // squares[27] = new Pawn(2);
  for (let i = 27; i < 36; i += 2) {
    squares[i] = new Pawn(2);
    squares[i + 27] = new Pawn(1);
  }
  squares[0] = new Rook(2);
  squares[8] = new Rook(2);
  squares[81] = new Rook(1);
  squares[89] = new Rook(1);

  squares[1] = new Knight(2);
  squares[7] = new Knight(2);
  squares[82] = new Knight(1);
  squares[88] = new Knight(1);

  squares[2] = new Elephant(2);
  squares[6] = new Elephant(2);
  squares[83] = new Elephant(1);
  squares[87] = new Elephant(1);

  squares[3] = new Advisor(2);
  squares[4] = new King(2);
  squares[5] = new Advisor(2);

  squares[84] = new Advisor(1);
  squares[85] = new King(1);
  squares[86] = new Advisor(1);

  squares[19] = new Canon(2);
  squares[25] = new Canon(2);

  squares[64] = new Canon(1);
  squares[70] = new Canon(1);

  return squares;
}
