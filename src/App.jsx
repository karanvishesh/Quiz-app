import './App.css'
import React from 'react'
import StartScreen from './components/StartScreen'
import QuizScreen from './components/QuizScreen'
function App() {
  const [gameStarted, setGameStarted] = React.useState(false)
  function startGame(){
    setGameStarted(true)
  }
  return (
  gameStarted ? <QuizScreen/> :  <StartScreen startGame = {startGame}/>
  )
}

export default App
