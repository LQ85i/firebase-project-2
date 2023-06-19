import './Styles/App.css';
import { useState } from 'react';
import Header from './Components/Header'
import ViewContainer from './Components/ViewContainer'
import Footer from './Components/Footer'


function App() {
  // 0: pre-game, 1: game, 2: post-game
  const [gameState, setGameState] = useState(0);
  const [characterIDs, setCharacterIDs] = useState([-1, -1, -1]);
  const [stopTimer, setStopTimer] = useState(false);
  const [endTime, setEndTime] = useState(0);

  return (
    <div id="App">
      <Header
        gameState={gameState}
        setGameState={setGameState}
        endTime={endTime}
        setEndTime={setEndTime}
        stopTimer={stopTimer}
      />
      <ViewContainer
        gameState={gameState}
        setGameState={setGameState}
        endTime={endTime}
        characterIDs={characterIDs}
        setCharacterIDs={setCharacterIDs}
        setStopTimer={setStopTimer}
      />
      <Footer />
    </div>
  );
}

export default App;