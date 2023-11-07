import logo from "./trophy.svg";
import React from "react";
import "../index.css";

export default function Result(props) {
  const [bestScore, setBestScore] = React.useState(0);
  const [num, setNum] = React.useState(0);

  var intervalRef = React.useRef();

  const increaseNum = () => setNum((prev) => prev + 1);

  React.useEffect(() => {
    if (props.value === true) {
      intervalRef.current = setInterval(increaseNum, 1000);
    } else {
      clearInterval(intervalRef.current);
      setNum(0);
    }
    if (bestScore == 0) {
      setBestScore(num);
    } else {
      if (num !== 0) {
        if (bestScore > num) {
          setBestScore(num);
        }
      }
    }
  }, [props.value]);

  return (
    <div>
      <div className="best-score">
        {" "}
        <img className="best-score-img" src={logo} alt="logo" />
        <h4 className="best-score-title"> Best Score:{bestScore}</h4>
      </div>
      <h4 className="timer-sect">Timer: {num}</h4>
    </div>
  );
}
