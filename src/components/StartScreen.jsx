import React from "react";
export default function StartScreen(props){
    return (
      	<div class="container">
      <div class="card">
      <div className="start--section">
        <h1 className="start--header">Quizzical</h1>
        <p>The perfect quiz app</p> 
        <button className="start--button btn" onClick={props.startGame}>Start Quiz</button>
        </div>
      </div>
      <div class="blob"></div>
    </div>
    )
}