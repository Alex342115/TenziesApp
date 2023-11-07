import Die from "./components/die";
import Score from "./components/score";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import React from "react";
import Result from "./components/timer";

export default function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [rollCount, setRollCount] = React.useState(0);
  const [startGame, setStartGame] = React.useState(false);

  function newGame() {
    setTenzies(false);
    setDice(allNewDice);
    setRollCount(0);
    setStartGame(true);
  }

  function generateDice() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
      holdDice,
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateDice());
    }

    return newDice;
  }

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld === true);
    const randNum = dice[0].value;
    const allSame = dice.every((die) => die.value === randNum);

    if (allHeld && allSame) {
      setTenzies(true);
      setStartGame(false);
    }
  }, [dice]);

  function rollDice() {
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? { ...die } : generateDice();
        })
      );
      setRollCount(rollCount + 1);
    }
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : { ...die };
      })
    );
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  // <------------Custom Styling---------->
  const styleBtnNew = {
    width: "10rem",
    height: "2rem",
  };

  const styleBtnRoll = {
    width: "6rem",
    height: "2rem",
  };
  // <---------------------------------------->

  return (
    <main>
      {tenzies && <Confetti />}

      {!tenzies ? (
        <div>
          {" "}
          <h1 className="title">Tenzies</h1>
          <p className="about">
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>{" "}
        </div>
      ) : (
        <div>
          {" "}
          <h1 className="title">YOU WON!!</h1>
          <p className="about">
            You have Won!
            <br /> Wanna have another try?
            <br /> Click on<strong> New Game</strong>
          </p>{" "}
        </div>
      )}

      <Result value={startGame} />

      <div className="dice-container">{diceElements}</div>

      <div className="roll-counter">
        <Score value={rollCount} tenzies={tenzies} />
      </div>

      {!startGame ? (
        <button style={styleBtnNew} className="die-btn" onClick={newGame}>
          Start Game
        </button>
      ) : (
        <button style={styleBtnRoll} className="die-btn" onClick={rollDice}>
          Roll
        </button>
      )}
    </main>
  );
}
