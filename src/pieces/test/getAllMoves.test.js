import "@testing-library/jest-dom/extend-expect";
// NOTE: jest-dom adds handy assertions to Jest and is recommended, but not required

import React from "react";
import { render } from "@testing-library/react";
import initialiseChessBoard from "../../helpers/board-initialiser.js";
import Advisor from "../advisor";
import Canon from "../canon";

describe("getAllMoves", () => {
  let squares;
  beforeEach(() => {
    squares = initialiseChessBoard();
  });
  test("Advisor", () => {
    squares = initialiseChessBoard();
    expect(squares[84].getAllMoves(squares, 84)).toEqual([76]);
    squares[76] = new Advisor(1);
    expect(squares[84].getAllMoves(squares, 84)).toEqual([]);
    squares[76] = new Advisor(2);
    expect(squares[84].getAllMoves(squares, 84)).toEqual([76]);
  });
  test("canon", () => {
    expect(squares[64].getAllMoves(squares, 64)).toEqual([
      73,
      63,
      65,
      66,
      67,
      68,
      69,
      55,
      46,
      37,
      28,
      2
    ]);
    // squares[65] = new Canon(1);
  });
});
