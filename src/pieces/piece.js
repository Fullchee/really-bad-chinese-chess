// REACT: composition > inheritance
// https://reactjs.org/docs/composition-vs-inheritance.html
export default class Piece {
    constructor(player, iconUrl) {
        this.player = player;
        this.style = { backgroundImage: "url('" + iconUrl + "')" };
    }
}
