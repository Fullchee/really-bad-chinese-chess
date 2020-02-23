// REACT: composition > inheritance
// https://reactjs.org/docs/composition-vs-inheritance.html
export default class Piece {
  constructor(player, iconUrl) {
    this.player = player;
    this.style = { backgroundImage: "url('" + iconUrl + "')" };
  }
  getAllMoves = (squares, i) => {
    // to be implemented by the child
  };

  moveIsGood = (src, dest, hasEnemy, squares) => {
    return this.getAllMoves(squares, src).includes(dest);
  };
}
