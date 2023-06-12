import { useEffect, useState } from "react";
import '../Styles/MessageBox.css';

const MessageBox = (props) => {
    const { msgText, msgType, msgBoxDuration } = props; // string, string, int
    const [className, setClassName] = useState("message-box");


    useEffect(() => {
        setTimeout(() => {
            // required for fade-in
            setClassName(className + " " + msgType + " visible")
        }, 100)
        

        
        setTimeout(() => {
            // required for fade-out effect
            setClassName("message-box " + msgType)
        }, msgBoxDuration - 250);
        //eslint-disable-next-line
    }, []);


    return (
        <div className={className}>
            <p>{msgText}</p>
        </div>
    );
}

export default MessageBox;