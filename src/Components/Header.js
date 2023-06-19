import '../Styles/Header.css';
import Timer from './Timer';

const Header = (props) => {

    const { gameState, setGameState, setEndTime, stopTimer, setStopTimer } = props;

    const handleClick = (e) => {
        if (e.currentTarget.classname === "home") {
            setGameState(0);
        }
    }

    const getTime = () => {
        if (gameState === 0) {
            return "00:00.000";
        } else if (gameState === 1 || gameState === 2) {
            return <Timer gameState={gameState} setEndTime={setEndTime} stopTimer={stopTimer} />;
        }
    }

    return (<div id="header">
        <div className="left">Photo tagging game</div>
        <div className="center">
            <div className="title">Time elapsed:</div>
            <div className="timer">{getTime()}</div>
        </div>
        <div className="right">
            <button className='home' onClick={handleClick}></button>
        </div>
    </div>);
}

export default Header;