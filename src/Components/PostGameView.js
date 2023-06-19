import "../Styles/PostGameView.css"
import film_rats from '../Images/film-rats-halfsize.jpg'
import rat1 from '../Images/rat1.png'
import rat2 from '../Images/rat2.png'
import rat3 from '../Images/rat3.png'
import rat4 from '../Images/rat4.png'
import rat5 from '../Images/rat5.png'
import rat6 from '../Images/rat6.png'
import rat7 from '../Images/rat7.png'
import rat8 from '../Images/rat8.png'
import rat9 from '../Images/rat9.png'
import rat10 from '../Images/rat10.png'
import icon_check_circle from '../Images/icon_check_circle.svg'

const PostGameView = (props) => {

    const {setGameState, endTime, characterIDs, setStopTimer} = props;


    const rats = [rat1,rat2,rat3,rat4,rat5,rat6,rat7,rat8,rat9,rat10]

    const formatTime = (time) => {
        const milliseconds = time % 1000;
        const seconds = Math.floor((time / 1000) % 60);
        const minutes = Math.floor((time / 1000 / 60) % 60);
    
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = seconds.toString().padStart(2, '0');
        const formattedMilliseconds = milliseconds.toString().padStart(3, '0');
    
    
        return `${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;
      };

    const handleClick = (e) => {
        e.preventDefault()
        if(e.currentTarget.className==="start-game") {
            setStopTimer(false)
            setGameState(1);
        }
    }

    return ( <div id='post-game-view'>
    <div className="header" onClick={handleClick}>
        <div className="title">Find these rats:</div>
        <div className="images">
            <div className="frame found">
                <img className='rat1' src={rats[characterIDs[0]]} alt="" />
                <img
                    className="icon-check-circle"
                    src={icon_check_circle}
                    alt=""
                />
            </div>
            <div className="frame found">
                <img className='rat2' src={rats[characterIDs[1]]} alt="" />
                <img
                    className="icon-check-circle"
                    src={icon_check_circle}
                    alt=""
                />
            </div>
            <div className="frame found">
                <img className='rat3' src={rats[characterIDs[2]]} alt="" />
                <img
                    className="icon-check-circle"
                    src={icon_check_circle}
                    alt=""
                />
            </div>

        </div>
    </div>
    <div className='info-window'>
        <div className='title-1'>Congratulations!</div>
        <div className='title-2'>Your time:</div>
        <div className="end-time">{formatTime(endTime)}</div>
        
        <button className='start-game' onClick={handleClick}>Play Again!</button>
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
 
export default PostGameView;