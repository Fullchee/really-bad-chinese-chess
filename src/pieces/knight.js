import Piece from './piece.js';

export default class Knight extends Piece {
  constructor(player){
    super(player, (player === 1 ? "https://upload.wikimedia.org/wikipedia/commons/0/04/Xiangqi_hl1.svg" : "https://upload.wikimedia.org/wikipedia/commons/9/9d/Xiangqi_hd1.svg"));
  }

  isMovePossible(src, dest){

    // TODO: can be blocked!
    if (true && src - 9) {
      return src - 17 === dest || src - 19 === dest;
    }
    if (true && src - 1) {
      src - 7 === dest || src + 11 === dest
    }
    return (
      src - 10 === dest || 
      src + 6 === dest || 
      src + 15 === dest || 
      src - 15 === dest || 
      src - 6 === dest || 
      src + 10 === dest || 
      src + 17 === dest);
  }

  /**
   * always returns empty array because of jumping
   * @return {[]}
   */
  getSrcToDestPath(){
    return [];
  }
}
