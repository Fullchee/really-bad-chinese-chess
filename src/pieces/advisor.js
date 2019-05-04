import Piece from './piece.js';

export default class Advisor extends Piece {
    constructor(player) {
        super(player, (player === 1 ? "https://upload.wikimedia.org/wikipedia/commons/e/ed/Xiangqi_al1.svg" : "https://upload.wikimedia.org/wikipedia/commons/f/f5/Xiangqi_ad1.svg"));
    }

    isMovePossible(src, dest) {
        const possibleSquares = [3, 5, 13, 21, 23];
        return (Math.abs(src - dest) % 9 === 0 || Math.abs(src - dest) % 7 === 0);
    }

    /**
     * get path between src and dest (src and dest exclusive)
     * @param  {num} src  
     * @param  {num} dest 
     * @return {[array]}      
     */
    getSrcToDestPath(src, dest) {
        let path = [], pathStart, pathEnd, incrementBy;
        if (src > dest) {
            pathStart = dest;
            pathEnd = src;
        }
        else {
            pathStart = src;
            pathEnd = dest;
        }
        if (Math.abs(src - dest) % 9 === 0) {
            incrementBy = 9;
            pathStart += 9;
        }
        else {
            incrementBy = 7;
            pathStart += 7;
        }

        for (let i = pathStart; i < pathEnd; i += incrementBy) {
            path.push(i);
        }
        return path;
    }
}
