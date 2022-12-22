import React from "react";

export default function QuizComponent(props) {
   console.log(props.quiz.options)
   const style1 = {
    backgroundColor: "#80E9A3",
    color: "black",
    cursor: "auto"
}
    const style2= {
        backgroundColor:"#fa709a", 
        color:"white"
    }
   
    const style3 = {
        backgroundColor: "#F5B7B1",
        color: "black",
        cursor: "auto"
    }
    const style4 = {
        backgroundColor: "transparent",
        border: "1px solid #D6DBF5",
        color : "#D6DBF5",
        cursor: "auto"
    }
    const optionElements = props.quiz.options.map(
        option => 
        <button
         onClick = {props.gameEnded ? {} : ()=>props.handleOption(props.quiz.id, option.val)}
         style = {
            props.gameEnded ? 
            option.is_correct ? style1 
            : option.is_selected ? style3 : style4
            : option.is_selected ? style2 : {}
         }
         className="quiz--option btn" >
            {option.val}
            </button>)
    return (
        <div className="quiz--component">
            <h1 className="quiz--question">{props.quiz.question}</h1>
            {optionElements}
            <hr />
        </div>
    )
}

