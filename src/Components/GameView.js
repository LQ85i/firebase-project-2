import '../Styles/GameView.css';
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
import icon_zoom_in from '../Images/icon_zoom_in.svg'
import icon_zoom_out from '../Images/icon_zoom_out.svg'
import ScrollContainer from 'react-indiana-drag-scroll';
import { useEffect, useRef, useState } from 'react';
import checkForCharacter from '../database_functions/checkForCharacter';
import MessageBox from './MessageBox';
import getActiveCharacters from '../Functions/getActiveCharacters';

const GameView = (props) => {
    const { setGameState, characterIDs, setCharacterIDs, setStopTimer } = props;

    const [scale, setScale] = useState(1);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [scrollTop, setScrollTop] = useState(0);
    const [showClicked, setShowClicked] = useState(false);
    const [clickedPos, setClickedPos] = useState([0, 0]);
    const [clickedPosDB, setClickedPosDB] = useState([0, 0]);
    const [charactersFound, setCharactersFound] = useState({});
    const [artContainerSize, setArtContainerSize] = useState([0, 0]);

    const [msgCharNotFound, setMsgCharNotFound] = useState(false);
    const [showMsgBox, setShowMsgBox] = useState(false);
    const [msgText, setMsgText] = useState("");
    const [msgType, setMsgType] = useState("");


    const scrollContainerRef = useRef(null);

    const rats = [rat1, rat2, rat3, rat4, rat5, rat6, rat7, rat8, rat9, rat10]

    const msgBoxDuration = 5000;
    const scaleMin = 0.2;
    const scaleMax = 3.01;
    const originalHeight = 3100;

    useEffect(() => {
        const containerElement = scrollContainerRef.current;
        containerElement.scrollLeft = scrollLeft;
        containerElement.scrollTop = scrollTop;
    }, [scrollLeft, scrollTop, scale]);

    useEffect(() => {
        const containerElement = scrollContainerRef.current;
        const containerWidth = containerElement.offsetWidth;
        const containerHeight = containerElement.offsetHeight;
        setArtContainerSize([containerWidth, containerHeight]);
        fetchCharacterIDs();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    useEffect(() => {
        if (showMsgBox) {
            const timer = setTimeout(() => {
                setShowMsgBox(false);
            }, msgBoxDuration);
            return () => {
                clearTimeout(timer);
            }
        }
    }, [showMsgBox]);

    useEffect(() => {
        let sum = 0;
        for (let i = 0; i < 3; i++) {
            const id = characterIDs[i];
            if (charactersFound[id]) {
                sum++;
            }
        }
        if (sum === 1 || sum === 2) {
            setMsgText("You found a correct rat!");
            setMsgType("character-found");
            setShowMsgBox(true);
        }
        else if (sum === 3) {
            setMsgText("You found all three rats!");
            setMsgType("character-found");
            setShowMsgBox(true);
            setStopTimer(true);
            setTimeout(() => {
                setGameState(2);
            }, 3000);

        }

    }, [charactersFound, characterIDs, setGameState, setStopTimer]);

    useEffect(() => {
        if (msgCharNotFound) {
            setMsgText("No correct rat found, try again!");
            setMsgType("character-not-found");
            setShowMsgBox(true);
            setMsgCharNotFound(false);
        }
    }, [msgCharNotFound]);

    const fetchCharacterIDs = () => {
        // TODO
        // request firebase for IDs
        const IDs = getActiveCharacters();
        setCharacterIDs(IDs);

        let obj = {};
        obj[IDs[0]] = false;
        obj[IDs[1]] = false;
        obj[IDs[2]] = false;
        setCharactersFound(obj)
    }

    const handleScroll = (e) => {
        const delta = -e.deltaY;
        const factor = 0.2;
        const amount = delta / 120;
        let newScale = scale + amount * factor;
        const rect = e.target.parentNode.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        zoomImage(newScale, mouseX, mouseY);
    }

    const zoomImage = (newScale, x, y) => {
        // changes the image size and position to simulate zooming

        if (newScale < scaleMin) { return }
        if (newScale > scaleMax) { return }

        setScale(newScale);

        const container = scrollContainerRef.current;
        const oldScrollLeft = container.scrollLeft;
        const oldScrollTop = container.scrollTop;

        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;
        const imageWidth = container.scrollWidth;
        const imageHeight = container.scrollHeight;


        setArtContainerSize([containerWidth, containerHeight]);

        const scaleRatio = newScale / scale;

        const newScrollLeft = scaleRatio * (oldScrollLeft + x) - x;
        const newScrollTop = scaleRatio * (oldScrollTop + y) - y;

        const maxScrollLeft = imageWidth * scaleRatio - containerWidth;
        const maxScrollTop = imageHeight * scaleRatio - containerHeight;

        const actualScrollLeft = Math.min(Math.max(newScrollLeft, 0), maxScrollLeft);
        const actualScrollTop = Math.min(Math.max(newScrollTop, 0), maxScrollTop)

        setScrollLeft(actualScrollLeft);
        setScrollTop(actualScrollTop);
        const clickedX = clickedPos[0] * scaleRatio;
        const clickedY = clickedPos[1] * scaleRatio;

        setClickedPos([clickedX, clickedY]);
        setClickedPosDB([parseInt(clickedX / newScale), parseInt(clickedY / newScale)])
    }

    const handleDragScroll = (e) => {
        const container = scrollContainerRef.current;
        setScrollLeft(container.scrollLeft);
        setScrollTop(container.scrollTop);
    }
    const handleClick = (e) => {
        const targetClass = e.currentTarget.className;
        if (e.currentTarget.parentNode.className === "frame found") {
            return;
        }
        if (targetClass === "art" || targetClass === "clicked") {
            if (showClicked) {
                setShowClicked(false);
                return;
            }
            saveClick(e);
            setShowClicked(true);
        } else if (e.currentTarget.parentNode.className === "frame") {
            const index = [...e.currentTarget.parentNode.parentNode.children].indexOf(e.currentTarget.parentNode);
            setShowMsgBox(false);
            checkIfCharacterFound(characterIDs[index]);
            setShowClicked(false);
        } else if (e.currentTarget.className === "zoom-in") {
            let newScale = scale + 0.3;
            const container = scrollContainerRef.current;
            const rect = container.getBoundingClientRect();
            const x = (rect.right - rect.left) / 2;
            const y = (rect.bottom - rect.top) / 2;
            if(newScale > scaleMax) {
                newScale = scaleMax;
            }
            zoomImage(newScale, x, y);
        } else if (e.currentTarget.className === "zoom-out") {
            let newScale = scale - 0.3;
            const container = scrollContainerRef.current;
            const rect = container.getBoundingClientRect();
            const x = (rect.right - rect.left) / 2;
            const y = (rect.bottom - rect.top) / 2;
            if(newScale < scaleMin) {
                newScale = scaleMin;
            }
            zoomImage(newScale, x, y);
        }
        else {
            setShowClicked(false);
        }
    }

    const checkIfCharacterFound = async (characterID) => {
        checkForCharacter(
            characterID,
            clickedPosDB,
            charactersFound,
            setCharactersFound,
            setMsgCharNotFound
        );
    }

    const saveClick = (e) => {
        const rect = e.target.parentNode.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const relativeX = mouseX + scrollLeft;
        const relativeY = mouseY + scrollTop;
        setClickedPos([relativeX, relativeY]);
        setClickedPosDB([parseInt(relativeX / scale), parseInt(relativeY / scale)])
    }

    const getClickMenuLeftPos = () => {
        const leftEdgeX = scrollLeft;
        const rightEdgeX = scrollLeft + artContainerSize[0];
        const distanceLeft = clickedPos[0] - leftEdgeX;
        const distanceRight = rightEdgeX - clickedPos[0];
        const circleRadius = 75 * scale;
        const menuWidth = 220;
        const mobileWidth = 480;
        let left = 0;
        if (artContainerSize[0] < mobileWidth && distanceRight < 75 + menuWidth / 4) {
            // mobile, close to right
            left = clickedPos[0] - 75 - menuWidth / 1.6;
        } else if (artContainerSize[0] < mobileWidth && distanceLeft < 75 + menuWidth / 4) {
            // mobile, close to left
            left = clickedPos[0] + 75 - menuWidth / 3;
        } else if (artContainerSize[0] < mobileWidth) {
            // mobile, center
            left = clickedPos[0] - 75 - menuWidth / 5;
        } else if (distanceRight < circleRadius + menuWidth) {
            // close to right
            left = clickedPos[0] - menuWidth - circleRadius;
        } else {
            // close to left and between
            left = clickedPos[0] + circleRadius;
        }
        return left + "px"
    }

    const getClickMenuTopPos = () => {
        const topEdgeX = scrollTop;
        const bottomEdgeX = scrollTop + artContainerSize[1];
        const distanceTop = clickedPos[1] - topEdgeX;
        const distanceBottom = bottomEdgeX - clickedPos[1];
        const menuHeight = 70;
        const mobileWidth = 480;
        let top = 0;
        if (artContainerSize[0] < mobileWidth && distanceTop < 75 + menuHeight) {
            // mobile, close to top
            top = clickedPos[1] + 75 + menuHeight / 5;
        } else if (artContainerSize[0] < mobileWidth) {
            // mobile, elsewhere
            top = clickedPos[1] - 75 - menuHeight / 3;
        } else if (distanceBottom < menuHeight) {
            // close to bottom
            top = clickedPos[1] - menuHeight;
        } else if (distanceTop < menuHeight) {
            // close to top
            top = clickedPos[1] + menuHeight;
        } else {
            // between
            top = clickedPos[1];
        }
        return top + "px"
    }
    return (<div id="game-view">
        <div className="header" onClick={handleClick}>
            <div className="title">Find these rats:</div>
            <div className="images">

                <div className={charactersFound[characterIDs[0]] ? "frame found" : "frame"}>
                    <img className='rat1' src={rats[characterIDs[0]]} alt="" />
                    <img
                        className={charactersFound[characterIDs[0]] ? "icon-check-circle" : "icon-check-circle hidden"}
                        src={icon_check_circle}
                        alt=""
                    />
                </div>
                <div className={charactersFound[characterIDs[1]] ? "frame found" : "frame"}>
                    <img className='rat2' src={rats[characterIDs[1]]} alt="" />
                    <img
                        className={charactersFound[characterIDs[1]] ? "icon-check-circle" : "icon-check-circle hidden"}
                        src={icon_check_circle}
                        alt=""
                    />
                </div>
                <div className={charactersFound[characterIDs[2]] ? "frame found" : "frame"}>
                    <img className='rat3' src={rats[characterIDs[2]]} alt="" />
                    <img
                        className={charactersFound[characterIDs[2]] ? "icon-check-circle" : "icon-check-circle hidden"}
                        src={icon_check_circle}
                        alt=""
                    />
                </div>
            </div>
        </div>
        <ScrollContainer
            className='art-container'
            hideScrollbars={false}
            innerRef={scrollContainerRef}
            onScroll={handleDragScroll}
            handleClick={handleClick}
            nativeMobileScroll={false}
        >
            <img
                className='art'
                src={film_rats}
                alt="" draggable={false}
                style={{
                    transformOrigin: "0 0",
                    height: originalHeight * scale
                }}
                onWheel={handleScroll}
                onClick={handleClick}
            />
            <div
                className={showClicked ? "clicked visible" : "clicked"}
                style={{
                    left: clickedPos[0],
                    top: clickedPos[1],
                    width: (showClicked ? 150 * scale : 0) + "px",
                    height: (showClicked ? 150 * scale : 0) + "px"
                }}
                onWheel={handleScroll}
                onClick={handleClick}
            />
            <div
                className={showClicked ? "clicked-menu visible" : "clicked-menu"}
                style={{
                    left: getClickMenuLeftPos(),
                    top: getClickMenuTopPos(),
                    width: (showClicked ? 200 : 0) + "px",
                    height: (showClicked ? 100 : 0) + "px",
                }}
            >
                <div className='images'>
                    <div className={charactersFound[characterIDs[0]] ? "frame found" : "frame"}>
                        <img className='rat' src={rats[characterIDs[0]]} alt="" onClick={handleClick} />
                        <img
                            className={charactersFound[characterIDs[0]] ? "icon-check-circle" : "icon-check-circle hidden"}
                            src={icon_check_circle}
                            alt=""
                        />
                    </div>
                    <div className={charactersFound[characterIDs[1]] ? "frame found" : "frame"}>
                        <img className='rat' src={rats[characterIDs[1]]} alt="" onClick={handleClick} />
                        <img
                            className={charactersFound[characterIDs[1]] ? "icon-check-circle" : "icon-check-circle hidden"}
                            src={icon_check_circle}
                            alt=""
                        />
                    </div>
                    <div className={charactersFound[characterIDs[2]] ? "frame found" : "frame"}>
                        <img className='rat' src={rats[characterIDs[2]]} alt="" onClick={handleClick} />
                        <img
                            className={charactersFound[characterIDs[2]] ? "icon-check-circle" : "icon-check-circle hidden"}
                            src={icon_check_circle}
                            alt=""
                        />
                    </div>
                </div>
            </div>
        </ScrollContainer>

        <div className='zoom-buttons'>
            <button className='zoom-in' onClick={handleClick}>
                <img src={icon_zoom_in} alt="" />
            </button>
            <button className='zoom-out' onClick={handleClick}>
                <img src={icon_zoom_out} alt="" />
            </button>

        </div>
        {showMsgBox && <MessageBox msgText={msgText} msgType={msgType} msgBoxDuration={msgBoxDuration} />}
    </div>);
}

export default GameView;