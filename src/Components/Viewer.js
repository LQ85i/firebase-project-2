import '../Styles/Viewer.css';
import GameView from './GameView';
import PostGameView from './PostGameView';
import PreGameView from './PreGameView';


const Viewer = (props) => {

    const { gameState, setGameState } = props;

    const getView = () => {
        if (gameState === 0) {
            return <PreGameView setGameState={setGameState} />
        } else if (gameState === 1) {
            return <GameView />
        } else if (gameState === 2) {
            return <PostGameView />
        }
    }

    return (<div>
        {getView()}
    </div>);
}

export default Viewer;