import '../Styles/Header.css';

const Header = (props) => {
    return ( <div id="header">
        <div className="left">Photo tagging game</div>
        <div className="center">
            <div className="title">Time elapsed:</div>
            <div className="timer">00:00.000</div>
        </div>
        <div className="right">menu</div>
    </div> );
}
 
export default Header;