import '../styles/Square.css';
import React from 'react';

export default function Square({ value, onClick, style, active, disabled }) {
    const [tilt] = React.useState(() => {
        if (value === "X") {
            return Math.floor(Math.random() * 16) - 8; // -15 to 15 for X
        } else if (value === "O") {
            return Math.floor(Math.random() * 361) - 180; // -180 to 180 for O
        }
        return 0;
    });

    let marker = null;
    if (active) {
        if (value === "X") {
            marker = <img src={`${process.env.PUBLIC_URL}/boardComponents/crossMarker-active.png`} alt="X" 
            style={{ width: '100%', height: '100%', transform: `rotate(${tilt}deg)` }} />;
        } else if (value === "O") {
            marker = <img src={`${process.env.PUBLIC_URL}/boardComponents/circleMarker-active.png`} alt="O" 
            style={{ width: '100%', height: '100%', transform: `rotate(${tilt}deg)` }} />;
        }
    }
    else {
        if (value === "X") {
            marker = <img src={`${process.env.PUBLIC_URL}/boardComponents/crossMarker-inactive.png`} alt="X" 
            style={{ width: '100%', height: '100%', transform: `rotate(${tilt}deg)` }} />;
        } else if (value === "O") {
            marker = <img src={`${process.env.PUBLIC_URL}/boardComponents/circleMarker-inactive.png`} alt="O" 
            style={{ width: '100%', height: '100%', transform: `rotate(${tilt}deg)` }} />;
        }
    }
    
    return (
        <button className="square" style={style} onClick={onClick} disabled={!(active && !disabled)}>
            {marker}
        </button>
    );
}
