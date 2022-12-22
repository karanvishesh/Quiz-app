import React from "react";
import { nanoid } from 'nanoid'
import QuizComponent from "./QuizComponent";
export default function QuizScreen() {
    const [quizzes, setQuizzes] = React.useState([])
    const [selectedOption, setSelectedOption] = React.useState([{ id: 0, value: 0 }])
    const [gameEnded, setGameEnded] = React.useState(false)
    const [score, setScore] = React.useState(0)
    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            // Generate random number
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }
    function fetchData() {
        fetch("https://opentdb.com/api.php?amount=5&difficulty=easy")
            .then(res => res.json())
            .then(data => {
                for (let i = 0; i < data.results.length; i++) {
                    data.results[i].question = data.results[i].question.replace(/&quot;/g, '"')
                    data.results[i].question = data.results[i].question.replace(/&#039;/g, 't')
                    setQuizzes(data.results.map(element => {
                        let arr = []
                        element.incorrect_answers.forEach(element => { arr.push({ val: element, is_selected: false, is_correct: false }) })
                        arr.push({ val: element.correct_answer, is_selected: false })
                        return {
                            id: nanoid(),
                            question: element.question,
                            correct_answer: element.correct_answer,
                            options: shuffleArray(arr)
                        }
                    }))
                }
            })
    }
    function handleOption(id, value) {
        setQuizzes(prevQuiz => prevQuiz.map(quiz => {
            if (quiz.id === id) {
                quiz.options.forEach(option => {
                    if (option.val === value) {
                        option.is_selected = true
                    }
                    else option.is_selected = false
                })
            }
            return quiz
        }))
        setSelectedOption(prevValue => {
            prevValue.push({ id: id, value: value })
            return prevValue
        })
    }


    React.useEffect(() => fetchData(), [0])

    function checkAnswers() {
        selectedOption.forEach(element => {
            quizzes.forEach(quiz => {
                if (quiz.id != 0 && quiz.id === element.id) {
                    quiz.options.forEach(option => {
                        if (option.val === element.value && option.val === quiz.correct_answer) {
                            setScore(prevScore => prevScore + 1)
                        }
                    })
                }
            })
        })
        setQuizzes(prevQuiz => prevQuiz.map(quiz => {
            quiz.options.forEach(option => {
                if (option.val === quiz.correct_answer) {
                    option.is_correct = true
                }
            })
            return quiz
        }))
        setGameEnded(true)
    }
    const quizElements = quizzes.map(
        quiz => {
            return <QuizComponent
                key={quiz.id}
                quiz={quiz}
                handleOption={handleOption}
                gameEnded={gameEnded}
            />
        }
    )
    async function startGame() {
        fetchData()
        await new Promise(resolve => setTimeout(resolve, 1250))
        setScore(0)
        setGameEnded(false)
        setSelectedOption([{ id: 0, value: 0 }])
    }
    return (
        <div className="quiz--section">
            {quizzes.length ?
                <div>
                    {quizElements}
                    {gameEnded ? <h2 className="gameend--message"> You scored {score}/{quizzes.length} correct answers </h2> : <div> </div>}
                    <button className="check--button btn" onClick={gameEnded ? startGame : checkAnswers}>{gameEnded ? "Play again" : "Check answers" } </button>
                   
                </div>
              
                :
                <div class="load">  </div>}

        </div>
    )
}