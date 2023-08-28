import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { getTime } from "../utils/Utils";
import { useNavigate } from "react-router-dom";
import sfx from "../sounds/mixkit-alert-alarm-1005.mp3"

const TimerPage = ({ timeInSeconds }) => {
    const [time, setTime] = useState(timeInSeconds);
    const navigate = useNavigate();
    const audio = useMemo(() => new Audio(sfx), []);

    useEffect(() => {

        const timerId = setInterval(() => {
            if(Math.round(time * 10) / 10 >= 0.1) {
                setTime((time) => time - 1);
                return;
            }
        }, 1000);

        if(Math.round(time * 10) / 10  === 0) {
            setTime(0);
            audio.play();
            return;
        }

        return () => {
            clearInterval(timerId);
        };
    }, [time, navigate, timeInSeconds, audio]);

    return (
        <div className="text-center py-52">
            <div className="text-8xl">{getTime(time)}</div>
            {time === 0 && <div className="text-6xl">Time's Up!</div>}
            <Link to="/game" className="p-10 text-3xl" onClick={() => audio.pause()}>
                Back To Game Page
            </Link>
        </div>
    );
};
export default TimerPage;
