import React, { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [table, setTable] = useState([]);
  const [turn, setTurn] = useState("X");
  const [existWinner, setExistWinner] = useState(false);

  const turnPlayer = (index) => {
    const tableCopy = [...table];
    if (tableCopy[index] === "-" && !existWinner) {
      tableCopy[index] = turn;
      setTable(tableCopy);
      verifyWinner(tableCopy);
      setTurn(NEXT_TURN[turn]);
    }
  };

  useEffect(() => {
    setTable(Array(9).fill("-"));
  }, []);

  const checkThree = (a, b, c) => {
    return a === b && b === c && a !== "-" && b !== "-" && c !== "-";
  };
  const verifyWinner = (table) => {
    if (
      checkThree(table[0], table[1], table[2]) ||
      checkThree(table[3], table[4], table[5]) ||
      checkThree(table[6], table[7], table[8]) ||
      checkThree(table[0], table[3], table[6]) ||
      checkThree(table[1], table[4], table[7]) ||
      checkThree(table[2], table[5], table[8]) ||
      checkThree(table[0], table[4], table[8]) ||
      checkThree(table[2], table[4], table[6])
    ) {
      setExistWinner(true);
    }
  };

  const NEXT_TURN = {
    X: "O",
    O: "X"
  };

  return (
    <div className="App">
      <h1>TIC CTAC TOE</h1>
      {table.map((item, index) => {
        return (
          <React.Fragment key={index}>
            {index % 3 === 0 && <br />}
            <button type="button" onClick={() => turnPlayer(index)}>
              {item}
            </button>
          </React.Fragment>
        );
      })}
      {existWinner && <p>The winner is {NEXT_TURN[turn]}</p>}
    </div>
  );
}
