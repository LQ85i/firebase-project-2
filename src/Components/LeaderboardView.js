import "../Styles/LeaderboardView.css"
import film_rats from '../Images/film-rats-halfsize.jpg'
import requestLeaderboard from '../database_functions/requestLeaderboard'
import { useEffect, useState } from "react";


const LeaderboardView = (props) => {

    const { setGameState } = props;
    const [leaderboardTable, setLeaderboardTable] = useState(null);


    useEffect(() => {
        getLeaderboardTable()
            .then((result) => setLeaderboardTable(result))
            .catch((error) => console.error(error));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const formatTime = (time) => {
        const milliseconds = time % 1000;
        const seconds = Math.floor((time / 1000) % 60);
        const minutes = Math.floor((time / 1000 / 60) % 60);

        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = seconds.toString().padStart(2, '0');
        const formattedMilliseconds = milliseconds.toString().padStart(3, '0');


        return `${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;
    }

    const getLeaderboardTable = async () => {
        let rows = [];

        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };

        let data = await requestLeaderboard();
        if (data.length === 0) {
            const row = <tr key={0}>
                <td className="table-cell empty" colSpan={3}>No records found.</td>
            </tr>
            rows.push(row);
            return rows;
        }
        //sort data by time
        data.sort(function (a, b) { return parseInt(a.time) - parseInt(b.time) });

        //add data to rows
        for (let i = 0; i < data.length; i++) {
            const submission = data[i];
            const rank = i;
            const name = submission.name;
            const time = formatTime(submission.time);
            const date = new Date(submission.date).toLocaleString('en-GB', options).replace(/\//g, '.');

            const row = <tr key={i}>
                <td className="table-cell rank">{rank}</td>
                <td className="table-cell name">{name}</td>
                <td className="table-cell time">{time}</td>
                <td className="table-cell date">{date}</td>
            </tr>
            rows.push(row);
        }
        return rows;
    }

    const handleClick = (e) => {
        e.preventDefault()
        if (e.currentTarget.className === "start-game") {
            setGameState(1);
        } else if (e.currentTarget.className === "show-info") {
            setGameState(0);
        }
    }

    return (<div id='leaderboard-view'>
        <div className='info-window'>
            <div className='title-1'>Leaderboard</div>
            <div className="table-header">
                <div className="rank">#</div>
                <div className="name">Name</div>
                <div className="time">Time</div>
                <div className="date">Date</div>
            </div>
            <div className="table-container">

                <table className="table">
                    <tbody>
                        {leaderboardTable ? leaderboardTable :
                            <tr>
                                <td className="table-cell loading" colSpan={3}>Loading...</td>
                            </tr>
                        }
                    </tbody>
                </table>

            </div>
            <div className="button-container">
                <button className='show-info' onClick={handleClick}>Show Info!</button>
                <button className='start-game' onClick={handleClick}>Start Game!</button>
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

export default LeaderboardView;