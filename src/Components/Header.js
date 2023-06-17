import '../Styles/Header.css';
import Timer from './Timer';

const Header = (props) => {

    const {gameState, setGameState} = props;

    const handleClick = (e) => {
        if(e.currentTarget.classname==="home") {
            setGameState(0);
        }
    }

    return (<div id="header">
        <div className="left">Photo tagging game</div>
        <div className="center">
            <div className="title">Time elapsed:</div>
            <div className="timer">{gameState===1 && <Timer/>}</div>
        </div>
        <div className="right">
            <button className='home' onClick={handleClick}></button>
        </div>
    </div>);
}

export default Header;