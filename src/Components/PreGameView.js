import '../Styles/PreGameView.css'
import film_rats from '../Images/film-rats-halfsize.jpg'

const PreGameView = (props) => {

    const {setGameState} = props;

    const handleClick = (e) => {
        e.preventDefault()
        if(e.currentTarget.className==="start-game") {
            setGameState(1);
        }
    }

    return (<div id='pre-game-view'>
        <div className="header">
            <div className="title">Find these rats:</div>
            <div className="frames">
                <div className="frame">?</div>
                <div className="frame">?</div>
                <div className="frame">?</div>
            </div>
        </div>
        <div className='info-window'>
            <div className='title-1'>Picture Tag Game</div>
            <div className='title-2'>Instructions:</div>
            <div className='content'>
                <ol>
                    <li>Find the characters shown at the top by clicking in the artwork</li>
                    <li>There is a timer when you begin, show off your time in the leaderboard!</li>
                    <li>You can zoom with scrollwheel and move the picture around by dragging it</li>
                    <li>The characters are randomized when you play again</li>
                </ol>
            </div>
            <button className='start-game' onClick={handleClick}>Start Game!</button>
        </div>
        <div className='art-container'>
            <img
                className='art'
                src={film_rats}
                alt="" draggable={false}
            />
        </div>

    </div>);
}

export default PreGameView;