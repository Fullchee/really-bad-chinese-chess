import "@testing-library/jest-dom/extend-expect";
// NOTE: jest-dom adds handy assertions to Jest and is recommended, but not required

import React from "react";
import { render } from "@testing-library/react";
import initialiseChessBoard from "../../helpers/board-initialiser.js";
import Advisor from "../advisor";

test("shows the children when the checkbox is checked", () => {
  const squares = initialiseChessBoard();
  expect(squares[84].getAllMoves(squares, 84)).toEqual([76]);
  squares[76] = new Advisor(1);
  expect(squares[84].getAllMoves(squares, 84)).toEqual([]);
  squares[76] = new Advisor(2);
  expect(squares[84].getAllMoves(squares, 84)).toEqual([76]);
});
