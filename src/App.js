import './Styles/App.css';
import { useState } from 'react';
import Header from './Components/Header'
import MainView from './Components/MainView'
import Footer from './Components/Footer'


function App() {
  // 0: pre-game, 1: game, 2: post-game
  const [gameState, setGameState] = useState(0);

  return (
    <div id="App">
      <Header/>
      <MainView/>
      <Footer/>
    </div>
  );
}

export default App;