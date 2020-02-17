import PropTypes from "prop-types";
import React from "react";
import "../index.scss";

export default function Square(props) {
  return (
    <button
      className={`square ${props.shade} ${props.highlighted}`}
      onClick={props.onClick}
      style={props.style}
    >
      {props.number}
    </button>
  );
}

Square.propTypes = {
  number: PropTypes.number,
  onClick: PropTypes.func,
  shade: PropTypes.string,
  style: PropTypes.object
};
