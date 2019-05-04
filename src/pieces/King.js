import Piece from './piece.js';

export default class King extends Piece {
    constructor(player) {
        const whiteKingURL = "https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg";
        const blackKingURL = "https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg";
        super(player, (player === 1 ? whiteKingURL : blackKingURL));
    }

    /**
     * @param {int} src - square number: 1 to 64 or 0 to 63
     * @param {int} dest - destination square number 1 to 64?
     * @return {boolean} - whether the move is legal or not
     */
    isMovePossible(src, dest) {
        return (src - 9 === dest ||
            src - 8 === dest ||
            src - 7 === dest ||
            src + 1 === dest ||
            src + 9 === dest ||
            src + 8 === dest ||
            src + 7 === dest ||
            src - 1 === dest);
    }

    /**
     * always returns empty array because of one step
     * @return {[]}
     */
    getSrcToDestPath(src, dest) {
        return [];
    }
}
