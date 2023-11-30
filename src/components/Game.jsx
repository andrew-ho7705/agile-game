import { useState, useEffect, useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import ScoreTable from "./ScoreTable";
import {
    TimerContext,
    GameIterationContext,
    TeamNameContext,
    GameScoreContext,
} from "../App";
import sfx from "../sounds/mixkit-alert-alarm-1005.mp3";
import { useNavigate } from "react-router-dom";

const Game = () => {
    const [typeOfTimer, setTypeOfTimer] = useContext(TimerContext);
    const [gameIteration] = useContext(GameIterationContext);
    const [teamName] = useContext(TeamNameContext);
    const [gameScore] = useContext(GameScoreContext);
    const [time, setTime] = useState(0);
    const [timeTicking, setTimeTicking] = useState(true);
    const [, setAudioPlaying] = useState(false);
    const audio = useMemo(() => new Audio(sfx), []);
    const navigate = useNavigate();

    useEffect(() => {
        if (timeTicking) {
            const timerId = setInterval(() => {
                if (Math.round(time * 10) / 10 >= 0.1) {
                    setTime((time) => time - 0.25);
                    return;
                }
            }, 250);

            if (Math.round(time * 10) / 10 === 0) {
                setTimeTicking(false);
                setTime(0);
                setAudioPlaying(true);
                return;
            }

            return () => {
                clearInterval(timerId);
            };
        }
    }, [time, timeTicking, audio, setAudioPlaying]);

    return (
        <div className="grid h-screen place-items-center lg:justify-center text-slate-50">

            <div className="flex flex-col lg:mx-8">
                <ScoreTable />
            </div>
            <footer className="flex flex-col text-center">
                <ul className="px-5 md:text-xl lg:text-3xl">
                    <input
                        autoComplete="false"
                        type="radio"
                        id="Two Minute Timer"
                        className="mx-2 md:h-3 md:w-3 lg:h-5 lg:w-5"
                        onClick={() => {
                            setTypeOfTimer("twoMin")
                        }}
                        checked={typeOfTimer === "twoMin"}
                    />
                    <span
                        onClick={() => {
                            setTypeOfTimer("twoMin");
                        }}
                    >
                        Two Minute Timer
                    </span>
                    <input
                        autoComplete="false"
                        type="radio"
                        id="One Minute Timer"
                        className="mx-2 md:h-3 md:w-3 lg:h-5 lg:w-5"
                        onClick={() => {
                            setTypeOfTimer("oneMin");
                        }}
                        checked={typeOfTimer === "oneMin"}
                    />
                    <span
                        onClick={() => {
                            setTypeOfTimer("oneMin");
                        }}
                    >
                        One Minute Timer
                    </span>
                </ul>
                <div className="flex flex-col">
                    {gameIteration === 5 &&
                        gameScore[4].ballsInBox !== 0 ? (
                        <Link
                            to="/end"
                            className="md:text-4xl lg:text-6xl flex justify-center"
                        >
                            End
                        </Link>
                    ) : typeOfTimer !== "" ? (
                        <div className="flex justify-center">
                            <button
                                onClick={() => {
                                    setTimeTicking(true);
                                    navigate(
                                        `/game/timer${typeOfTimer === "oneMin" ? 2 : 1
                                        }`
                                    );
                                }}
                                className="md:text-4xl lg:text-6xl "
                            >
                                Start
                            </button>
                        </div>
                    ) : (
                        <div className="md:text-4xl lg:text-6xl flex justify-center">
                            Select a timer!
                        </div>
                    )}
                </div>

            </footer>
        </div>
    );
};

export default Game;
