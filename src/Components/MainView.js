import '../Styles/MainView.css';
import film_rats from '../Images/film-rats-halfsize.jpg'
import rat1 from '../Images/rat1.png'
import rat2 from '../Images/rat2.png'
import rat3 from '../Images/rat3.png'
import icon_check_circle from '../Images/icon_check_circle.svg'
import ScrollContainer from 'react-indiana-drag-scroll';
import { useEffect, useRef, useState } from 'react';
import handleSubmit from '../handles/handlesubmit';

const MainView = (props) => {

    const [scale, setScale] = useState(1);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [scrollTop, setScrollTop] = useState(0);
    const [showClicked, setShowClicked] = useState(false);
    const [clickedPos, setClickedPos] = useState([0, 0]);
    const [clickedPosDB, setClickedPosDB] = useState([0, 0]);
    const [characterIDs, setCharacterIDs] = useState([-1, -1, -1]);
    const [charactersFound, setCharactersFound] = useState({});
    const [artContainerSize, setArtContainerSize] = useState([0, 0]);

    const scrollContainerRef = useRef(null);

    const scaleMin = 0.2;
    const scaleMax = 3.01;
    const originalHeight = 3100;

    useEffect(() => {
        const containerElement = scrollContainerRef.current;
        containerElement.scrollLeft = scrollLeft;
        containerElement.scrollTop = scrollTop;
    }, [scrollLeft, scrollTop, scale]);

    useEffect(() => {
        const container = scrollContainerRef.current;
        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;
        setArtContainerSize([containerWidth, containerHeight]);

        fetchCharacterIDs();
    }, []);

    const fetchCharacterIDs = () => {
        // TODO
        // request firebase for IDs

        const IDs = [0, 1, 2];
        setCharacterIDs(IDs);

        let obj = {};
        obj[IDs[0]] = false;
        obj[IDs[1]] = false;
        obj[IDs[2]] = false;
        setCharactersFound(obj)
    }

    const handleScroll = (e) => {

        const factor = 0.2;
        const delta = -e.deltaY / 120;
        let newScale = scale + delta * factor;

        if (newScale < scaleMin) { return }
        if (newScale > scaleMax) { return }


        setScale(newScale);

        const container = scrollContainerRef.current;
        const oldScrollLeft = container.scrollLeft;
        const oldScrollTop = container.scrollTop;
        const rect = e.target.parentNode.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;
        const imageWidth = container.scrollWidth;
        const imageHeight = container.scrollHeight;


        setArtContainerSize([containerWidth, containerHeight]);

        const scaleRatio = newScale / scale;

        const newScrollLeft = scaleRatio * (oldScrollLeft + mouseX) - mouseX;
        const newScrollTop = scaleRatio * (oldScrollTop + mouseY) - mouseY;

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
            checkIfCharacterFound(characterIDs[index]);
            setShowClicked(false);
        }
        else {
            setShowClicked(false);
        }
    }

    const checkIfCharacterFound = async (characterID) => {

        handleSubmit(characterID, clickedPosDB, charactersFound, setCharactersFound);
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
        //const leftEdgeX = scrollLeft;
        const rightEdgeX = scrollLeft + artContainerSize[0];
        //const distanceLeft = clickedPos[0] - leftEdgeX;
        const distanceRight = rightEdgeX - clickedPos[0];
        const circleRadius = 75 * scale;
        const menuWidth = 220;
        let left = 0;
        if (distanceRight < circleRadius + menuWidth) {
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
        let top = 0;
        if (distanceBottom < menuHeight) {
            // close to bottom
            top = clickedPos[1] - menuHeight * scale;
        } else if (distanceTop < menuHeight) {
            // close to top
            top = clickedPos[1] + menuHeight * scale;
        } else {
            // between
            top = clickedPos[1];
        }
        return top + "px"
    }

    return (<div id="main-view">
        <div className="header" onClick={handleClick}>
            <div className="title">Find these rats:</div>
            <div className="images">
                <div className={charactersFound[characterIDs[0]] ? "frame found" : "frame"}>
                    <img className='rat1' src={rat1} alt="" />
                    <img
                        className={charactersFound[characterIDs[0]] ? "icon-check-circle" : "icon-check-circle hidden"}
                        src={icon_check_circle}
                        alt=""
                    />
                </div>
                <div className={charactersFound[characterIDs[1]] ? "frame found" : "frame"}>
                    <img className='rat2' src={rat2} alt="" />
                    <img
                        className={charactersFound[characterIDs[1]] ? "icon-check-circle" : "icon-check-circle hidden"}
                        src={icon_check_circle}
                        alt=""
                    />
                </div>
                <div className={charactersFound[characterIDs[2]] ? "frame found" : "frame"}>
                    <img className='rat3' src={rat3} alt="" />
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
                        <img className='rat1' src={rat1} alt="" onClick={handleClick} />
                        <img
                            className={charactersFound[characterIDs[0]] ? "icon-check-circle" : "icon-check-circle hidden"}
                            src={icon_check_circle}
                            alt=""
                        />
                    </div>
                    <div className={charactersFound[characterIDs[1]] ? "frame found" : "frame"}>
                        <img className='rat2' src={rat2} alt="" onClick={handleClick} />
                        <img
                            className={charactersFound[characterIDs[1]] ? "icon-check-circle" : "icon-check-circle hidden"}
                            src={icon_check_circle}
                            alt=""
                        />
                    </div>
                    <div className={charactersFound[characterIDs[2]] ? "frame found" : "frame"}>
                        <img className='rat3' src={rat3} alt="" onClick={handleClick} />
                        <img
                            className={charactersFound[characterIDs[2]] ? "icon-check-circle" : "icon-check-circle hidden"}
                            src={icon_check_circle}
                            alt=""
                        />
                    </div>
                </div>
            </div>
        </ScrollContainer>
    </div>);
}

export default MainView;