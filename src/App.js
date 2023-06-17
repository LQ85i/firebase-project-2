import './Styles/App.css';
import { useState } from 'react';
import Header from './Components/Header'
import Viewer from './Components/Viewer'
import Footer from './Components/Footer'


function App() {
  // 0: pre-game, 1: game, 2: post-game
  const [gameState, setGameState] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(-1);

  return (
    <div id="App">
      <Header gameState={gameState} setGameState={setGameState} startTime={startTime} endTime={endTime}/>
      <Viewer gameState={gameState} setGameState={setGameState}/>
      <Footer/>
    </div>
  );
}

export default App;