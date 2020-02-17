import React from "react";

import "../index.scss";
import Board from "./Board.js";
import FallenSoldierBlock from "./FallenSoldierBlock.js";
import initialiseChessBoard from "../helpers/board-initialiser.js";

export default class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      squares: initialiseChessBoard(),
      redFallenSoldiers: [],
      blackFallenSoldiers: [],
      player: 1,
      sourceSelection: -1,
      status: "",
      turn: "red"
    };
  }

  handleClick = i => {
    if (this.state.sourceSelection === -1) {
      this.firstClick(i);
    } else if (this.state.sourceSelection > -1) {
      this.secondClick(i);
    } else {
      throw new Error(
        "handleClick: sourceSelection is less than -1?" +
          this.state.sourceSelection
      );
    }
  };

  /**
   * Click to select the piece to move
   * @param {int} i - square which contains the piece that will be moved
   */
  firstClick = i => {
    const squares = this.state.squares.slice();
    if (!squares[i] || squares[i].player !== this.state.player) {
      this.setState({
        status: "Wrong player. Choose player " + this.state.player + " pieces."
      });
      if (squares[i]) {
        // only undo the background on a non null
        squares[i].style = { ...squares[i].style, backgroundColor: "" };
      }
    } else {
      squares[i].style = {
        ...squares[i].style,
        backgroundColor: "RGB(111,143,114)"
      };
      this.setState({
        status: "Choose destination for the selected piece",
        sourceSelection: i
      });
    }
  };

  /**
   * Triggered on click to decide where to put the previously selected piece
   * @param {int} i - destination square
   */
  secondClick = i => {
    const squares = this.state.squares.slice();
    squares[this.state.sourceSelection].style = {
      ...squares[this.state.sourceSelection].style,
      backgroundColor: ""
    };
    // squares[this.state.sourceSelection].style.backgroundColor = null;
    if (squares[i] && squares[i].player === this.state.player) {
      this.setState({
        status: "Wrong selection. Choose valid source and destination again.",
        sourceSelection: -1
      });
      return;
    }

    const redFallenSoldiers = this.state.redFallenSoldiers.slice();
    const blackFallenSoldiers = this.state.blackFallenSoldiers.slice();
    const isMovePossible = squares[this.state.sourceSelection].isMovePossible(
      this.state.sourceSelection,
      i,
      this.squareHasEnemy(i),
      squares
    );
    const srcToDestPath = squares[this.state.sourceSelection].getSrcToDestPath(
      this.state.sourceSelection,
      i
    );

    if (isMovePossible && this.isPathOpen(srcToDestPath)) {
      if (squares[i] !== null) {
        if (squares[i].player === 1) {
          redFallenSoldiers.push(squares[i]);
        } else {
          blackFallenSoldiers.push(squares[i]);
        }
      }
      squares[i] = squares[this.state.sourceSelection];
      squares[this.state.sourceSelection] = null;
      let player = this.state.player === 1 ? 2 : 1;
      let turn = this.state.turn === "red" ? "black" : "red";
      this.setState({
        sourceSelection: -1,
        squares: squares,
        redFallenSoldiers: redFallenSoldiers,
        blackFallenSoldiers: blackFallenSoldiers,
        player: player,
        status: "",
        turn: turn
      });
    } else {
      this.setState({
        status: "Wrong selection. Choose valid source and destination again.",
        sourceSelection: -1
      });
    }
  };

  /**
   * @param {int} i - square number
   * @return {boolean} - whether the square has a piece that's not this.state.player's
   */
  squareHasEnemy = i => {
    const squareOwner = this.state.squares[i] && this.state.squares[i].player;
    if (squareOwner) {
      return squareOwner !== this.state.player;
    }
    return false;
  };

  /**
   * Check all path indices are null.
   * Edge cases: moving one square: array is empty
   * knight: arr is also empty so  move is legal.
   * canon: return true, ignore this, the isMovePossible handles the validity
   * @param  {[type]}  srcToDestPath [array of board indices comprising path between src and dest]
   * @return {Boolean}
   */
  isPathOpen = srcToDestPath => {
    if (
      this.state.squares[this.state.sourceSelection].constructor.name ===
      "Canon"
    ) {
      return true;
    }

    for (let square of srcToDestPath) {
      if (this.state.squares[square] !== null) {
        return false;
      }
    }
    return true;
  };

  render() {
    return (
      <div>
        <div className="game">
          <div className="game-board">
            <Board
              squares={this.state.squares}
              onClick={i => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <h3>Turn</h3>
            <div
              id="player-turn-box"
              style={{ backgroundColor: this.state.turn }}
            ></div>
            <div className="game-status">{this.state.status}</div>

            <div className="fallen-soldier-block">
              {
                <FallenSoldierBlock
                  redFallenSoldiers={this.state.redFallenSoldiers}
                  blackFallenSoldiers={this.state.blackFallenSoldiers}
                />
              }
            </div>
          </div>
        </div>

        <div className="icons-attribution">
          <div>
            {" "}
            <small>
              {" "}
              Chess Icons And Favicon (extracted) By en:User:Cburnett [
              <a href="http://www.gnu.org/copyleft/fdl.html">GFDL</a>,{" "}
              <a href="http://creativecommons.org/licenses/by-sa/3.0/">
                CC-BY-SA-3.0
              </a>
              , <a href="http://opensource.org/licenses/bsd-license.php">BSD</a>{" "}
              or <a href="http://www.gnu.org/licenses/gpl.html">GPL</a>],{" "}
              <a href="https://commons.wikimedia.org/wiki/Category:SVG_chess_pieces">
                via Wikimedia Commons
              </a>{" "}
            </small>
          </div>
        </div>
      </div>
    );
  }
}
