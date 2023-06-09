import '../Styles/ViewContainer.css';
import GameView from './GameView';
import PostGameView from './PostGameView';
import PreGameView from './PreGameView';
import LeaderboardView from './LeaderboardView'


const ViewContainer = (props) => {

    const { gameState, setGameState, endTime, characterIDs, setCharacterIDs, setStopTimer } = props;

    const getView = () => {
        if (gameState === 0) {
            return <PreGameView
                setGameState={setGameState}
            />
        } else if (gameState === 1) {
            return <GameView
                setGameState={setGameState}
                characterIDs={characterIDs}
                setCharacterIDs={setCharacterIDs}
                setStopTimer={setStopTimer}
            />
        } else if (gameState === 2) {
            return <PostGameView
                setGameState={setGameState}
                endTime={endTime}
                characterIDs={characterIDs}
                setStopTimer={setStopTimer}
            />
        } else if(gameState === 3) {
            return <LeaderboardView
            setGameState={setGameState}
            
            />
        }
    }

    return (<div id='view-container'>
        {getView()}
    </div>);
}

export default ViewContainer;