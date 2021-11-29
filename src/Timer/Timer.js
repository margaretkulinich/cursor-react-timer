import React, { useState, useEffect, useRef } from "react";
import "./styles.css";

export function Timer({
    time,
    step,
    autostart,
    onTick,
    onTimeEnd,
    onTimeStart,
    onTimePause
}) {
    const [timeState, setTimeState] = useState(time);
    const [timerOn, setTimerOn] = useState(autostart === true ? true : false);
    const [intervalIdState, setIntervalIdState] = useState();
    const divRef = useRef(null);

    const startTimer = () => {
        const intervalId = setInterval(() => {
            setTimeState((prevTime) => {
                if (prevTime <= 0 || prevTime <= step) {
                    clearInterval(intervalId);
    
                    return 0;
                }
    
                return prevTime - step;
            });
        }, step);

        setIntervalIdState(intervalId);
        onTimeStart(timeState);

        return intervalId;
    };

    const stopTimer = () => {
        clearInterval(intervalIdState);
        onTimePause(timeState);
    };

    useEffect(() => {
        if (timerOn) {
            startTimer();
        } else {
            stopTimer();
        }   
    }, [timerOn]);

    useEffect(() => {
        onTick(timeState);
        divRef.current.style.width = `${(timeState / time) * 100}%`;

        if (timeState === 0) {
            onTimeEnd(timeState);
            setTimeState(time);
            setTimerOn(false);

            return;
        }
    }, [timeState]);

    useEffect(() => {
        if (timeState === time && timerOn === false) {
            setTimerOn(true);
        }
    }, [timeState, timerOn]);

    return (
        <div>
            <div>{timeState} ms</div>
            <button className="button-start" onClick={() => setTimerOn(!timerOn)}>Start/Pause</button>
            <div className="indicator" ref={divRef}></div>
        </div>
    )
};
