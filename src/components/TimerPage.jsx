import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { getTime } from "../utils/Utils";
import { useNavigate } from "react-router-dom";
import { scoreTable, iterationScores } from "./ScoreTable";
import sfx from "../sounds/mixkit-alert-alarm-1005.mp3";

const TimerPage = ({ timeInSeconds, soundEnabled }) => {
    const [time, setTime] = useState(timeInSeconds);
    const [estimate, setEstimate] = useState(0);
    const navigate = useNavigate();
    const audio = useMemo(() => new Audio(sfx), []);

    useEffect(() => {
        const timerId = setInterval(() => {
            if (Math.round(time * 10) / 10 >= 0.1) {
                setTime((time) => time - 1);
                return;
            }
        }, 1000);

        if (Math.round(time * 10) / 10 === 0) {
            setTime(0);
            if (soundEnabled) audio.play();
            return;
        }

        return () => {
            clearInterval(timerId);
        };
    }, [time, navigate, timeInSeconds, audio, soundEnabled]);

    return (
        <div className="text-center py-56">
            <div className="text-8xl">{getTime(time)}</div>
            {!soundEnabled && (
                <div className="flex flex-col justify-center items-center">
                    <div className="text-4xl">
                        Estimate How Many Points Your Team Will Score In
                        Iteration 1!
                    </div>
                    <input
                        type="text"
                        id="estimate"
                        className="border border-black w-64 h-24 text-center text-6xl"
                        placeholder={estimate}
                        onChange={(e) => setEstimate(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                if (isNaN(estimate)) {
                                    alert("Error: Estimate must be a number!");
                                    return;
                                }
                                scoreTable[0].estimatedScore = estimate;
                                navigate("/game");
                            }
                        }}
                    ></input>
                </div>
            )}
            <div className="text-4xl"> {time === 0 ? "Time's Up!" : ""}</div>
            {time === 0 && soundEnabled ? (
                <Link
                    to="/game"
                    className="text-3xl px-5"
                    onClick={() => audio.pause()}
                >
                    Next
                </Link>
            ) : time === 0 && !soundEnabled ? (
                <div className="text-3xl px-5">Press Enter to Continue!</div>
            ) : null}

            <Link
                to={soundEnabled ? "/game" : "/"}
                className="text-3xl px-5"
                onClick={() => {
                    scoreTable = [
                        { ...iterationScores },
                        { ...iterationScores },
                        { ...iterationScores },
                        { ...iterationScores },
                        { ...iterationScores },
                    ];
                }}
            >
                Back
            </Link>
        </div>
    );
};
export default TimerPage;
