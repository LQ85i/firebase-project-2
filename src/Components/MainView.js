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

    const scaleMin = 1;
    const scaleMax = 3.01;

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
        const mouseX = e.nativeEvent.offsetX;
        const mouseY = e.nativeEvent.offsetY;
        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;

        const zoomFactor = 1 - (1 / (1 + factor));
        const newScrollLeft = oldScrollLeft + (mouseX/containerWidth)*zoomFactor*containerWidth*delta;
        const newScrollTop = oldScrollTop + (mouseY/containerHeight)*zoomFactor*containerHeight*delta;

        const maxScrollLeft = container.scrollWidth - containerWidth;
        const maxScrollTop = container.scrollHeight - containerHeight;
        setScrollLeft(Math.min(Math.max(newScrollLeft, 0), maxScrollLeft));
        setScrollTop(Math.min(Math.max(newScrollTop, 0), maxScrollTop));
    }
    
    const handleClick = (e) => {
        console.log(scrollTop);
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
            onClick={handleClick}
        >
            <img
                className='art'
                src={film_rats}
                alt="" draggable={false}
                style={{
                    transformOrigin: "0 0",
                    transform: `scale(${scale})`
                }}
                onWheel={handleScroll}
            />
        </ScrollContainer>
    </div>);
}

export default MainView;