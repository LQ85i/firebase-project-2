import '../Styles/MainView.css';
import film_rats from '../Images/film-rats-halfsize.jpg'
import rat1 from '../Images/rat1.png'
import rat2 from '../Images/rat2.png'
import rat3 from '../Images/rat3.png'
import ScrollContainer from 'react-indiana-drag-scroll';
import { useEffect, useRef, useState } from 'react';

const MainView = (props) => {

    const [scale, setScale] = useState(1);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [scrollTop, setScrollTop] = useState(0);

    const scrollContainerRef = useRef(null);

    const scaleMin = 0.4;
    const scaleMax = 3.01;
    const originalHeight = 3100;

    useEffect(() => {
        const containerElement = scrollContainerRef.current;
        containerElement.scrollLeft = scrollLeft;
        containerElement.scrollTop = scrollTop;
    }, [scrollLeft, scrollTop, scale]);


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
        const scaleRatio = newScale / scale;

        const newScrollLeft = scaleRatio*(oldScrollLeft + mouseX) - mouseX;
        const newScrollTop = scaleRatio*(oldScrollTop + mouseY) - mouseY;

        const maxScrollLeft = imageWidth*scaleRatio - containerWidth;
        const maxScrollTop = imageHeight*scaleRatio - containerHeight;

        setScrollLeft(Math.min(Math.max(newScrollLeft, 0), maxScrollLeft));
        setScrollTop(Math.min(Math.max(newScrollTop, 0), maxScrollTop));
    }

    const handleDragScroll = (e) => {
        const container = scrollContainerRef.current;
        setScrollLeft(container.scrollLeft);
        setScrollTop(container.scrollTop);
    }

    return (<div id="main-view">
        <div className="header">
            <div className="title">Find these rats:</div>
            <div className="images">
                <img src={rat1} alt="" />
                <img src={rat2} alt="" />
                <img src={rat3} alt="" />
            </div>
        </div>
        <ScrollContainer
            className='art-container'
            hideScrollbars={false}
            innerRef={scrollContainerRef}
            onScroll={handleDragScroll}
        >
            <img
                className='art'
                src={film_rats}
                alt="" draggable={false}
                style={{
                    transformOrigin: "0 0",
                    //transform: `scale(${scale})`
                    height: originalHeight * scale
                }}
                onWheel={handleScroll}
            />
        </ScrollContainer>
    </div>);
}

export default MainView;