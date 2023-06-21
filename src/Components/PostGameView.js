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
import icon_check from '../Images/icon_check.svg'
import submitTime from "../database_functions/submitTime"
import { useState } from "react"

const PostGameView = (props) => {

    const { setGameState, endTime, characterIDs, setStopTimer } = props;

    const [submitComplete, setSubmitComplete] = useState(false);

    const rats = [rat1, rat2, rat3, rat4, rat5, rat6, rat7, rat8, rat9, rat10]

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
        if (e.currentTarget.className === "play-again") {
            setStopTimer(false)
            setGameState(1);
        } else if (e.currentTarget.className === "show-info") {
            setStopTimer(false)
            setGameState(0);
        } else if (e.currentTarget.className === "show-leaderboard") {
            setStopTimer(false)
            setGameState(3);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        submitTime(formData.get("name"), endTime);
        setSubmitComplete(true);
    }

    const getSubmitElement = () => {
        if (!submitComplete) {
            return <>
                <form className="form-submit-record" onSubmit={handleSubmit}>
                    <label className="input-title" htmlFor="name-field" >Your name:</label>
                    <input name="name" type="text" className="name-field" pattern="[a-zA-Z ]{1,10}" title="Please enter only upper or lower case letters (maximum 10 characters)" id="name-field" placeholder="Your name" required />
                    <button className="submit">Submit Time!</button>
                    <div className="optional">(Optional)</div>
                </form>
            </>
        } else {
            return (
                <div className="submitted-container">
                    <img
                        className="icon-check-circle"
                        src={icon_check}
                        alt=""
                    />
                    <div className="submit-complete">Time submitted!</div>

                </div>
            )
        }

    }

    return (<div id='post-game-view'>
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

            {getSubmitElement()}

            <button className='show-leaderboard' onClick={handleClick}>Show Leaderboard!</button>
            <div className="button-container">
                <button className='show-info' onClick={handleClick}>Show Info!</button>
                <button className='play-again' onClick={handleClick}>Play again!</button>
            </div>
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