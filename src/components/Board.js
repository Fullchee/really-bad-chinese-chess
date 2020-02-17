import PropTypes from "prop-types";
import React from "react";

import "../index.scss";
import Square from "./Square.js";

export default class Board extends React.Component {
  renderSquare(i, squareShade, isHighlighted) {
    return (
      <Square
        key={i}
        highlighted={isHighlighted ? "highlighted" : ""}
        piece={this.props.squares[i]}
        style={this.props.squares[i] ? this.props.squares[i].style : null}
        shade={squareShade}
        onClick={() => this.props.onClick(i)}
        number={i}
      />
    );
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.highlightedSquares !== prevProps.highlightedSquares) {
      
    }
  }

  render() {
    const board = [];
    for (let i = 0; i < 10; i++) {
      const squareRows = [];
      for (let j = 0; j < 9; j++) {
        const squareShade =
          (isEven(i) && isEven(j)) || (!isEven(i) && !isEven(j))
            ? "light-square"
            : "dark-square";
        const square = i * 9 + j;
        squareRows.push(
          this.renderSquare(
            square,
            squareShade,
            this.props.highlightedSquares.includes(square)
          )
        );
      }
      board.push(
        <div key={`row-${i}`} className="board-row">
          {squareRows}
        </div>
      );
    }

    return <div>{board}</div>;
  }
}

Board.propTypes = {
  highlightedSquares: PropTypes.arrayOf(PropTypes.number),
  onClick: PropTypes.func,
  squares: PropTypes.array
};

function isEven(num) {
  return num % 2 === 0;
}
