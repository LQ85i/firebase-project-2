import '../Styles/Header.css';
import Timer from './Timer';

const Header = (props) => {

    const { gameState, setGameState, setEndTime, stopTimer } = props;

    const handleClick = (e) => {
        if (e.currentTarget.className === "menu") {
            setGameState(0);
        }
    }

    const getTime = () => {
        if (gameState === 0 || gameState === 3) {
            return "00:00.000";
        } else if (gameState === 1 || gameState === 2) {
            return <Timer gameState={gameState} setEndTime={setEndTime} stopTimer={stopTimer} />;
        }
    }

    const getCenter = () => {
        let timerDivs = null;
        if (gameState !== 3) {
            timerDivs =
                <div className='timer-container'>
                    <div className="title">Time elapsed:</div>
                    <div className="timer">{getTime()}</div>
                </div>

        } else {
            timerDivs =
                <div className='timer-container hidden'>
                    <div className="title">Time elapsed:</div>
                    <div className="timer">{getTime()}</div>
                </div>
        }
        return timerDivs;
    }

    const getRight = () => {
        const menuButton = <button className='menu' onClick={handleClick}>Menu</button>
        if (gameState === 1) {
            return menuButton
        } else {
            return;
        }
    }

    return (<div id="header">
        <div className="left">Picture Tag: Rats</div>
        <div className="center">
            {getCenter()}
        </div>
        <div className="right">
            {getRight()}
        </div>
    </div>);
}

export default Header;