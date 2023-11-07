import React from "react";
// import Timer from "./timer";
export default function Score(props) {
  return (
    <div>
      <h4 className="counter-details">Roll Count: {props.value} </h4>
    </div>
  );
}
