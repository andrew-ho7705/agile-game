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

    const handleRadioClick = () => {
        const option1 = document.getElementById("One Minute Timer");
        const option2 = document.getElementById("Two Minute Timer");

        option1.addEventListener("change", () => {
            if (option1.checked) option2.checked = false;
        });

        option2.addEventListener("change", () => {
            if (option2.checked) option1.checked = false;
        });
    };

    const handlePutGameScore = async () => {
        const apiURL =
            "https://vpgrj907we.execute-api.us-east-2.amazonaws.com/dev/gameScores";
        const requestBody = {
            TableName: "GameScores",
            Item: {
                teamName: {
                    S: teamName,
                },
                gameScore: {
                    L: [
                        {
                            M: {
                                estimatedScore: {
                                    N: gameScore[0].estimatedScore.toString(),
                                },
                                ballsInBox: {
                                    N: gameScore[0].ballsInBox.toString(),
                                },
                                defects: {
                                    N: gameScore[0].defects.toString(),
                                },
                                totalScore: {
                                    N: gameScore[0].totalScore.toString(),
                                },
                                delta: {
                                    N: gameScore[0].delta.toString(),
                                },
                            },
                        },
                        {
                            M: {
                                estimatedScore: {
                                    N: gameScore[1].estimatedScore.toString(),
                                },
                                ballsInBox: {
                                    N: gameScore[1].ballsInBox.toString(),
                                },
                                defects: {
                                    N: gameScore[1].defects.toString(),
                                },
                                totalScore: {
                                    N: gameScore[1].totalScore.toString(),
                                },
                                delta: {
                                    N: gameScore[1].delta.toString(),
                                },
                            },
                        },
                        {
                            M: {
                                estimatedScore: {
                                    N: gameScore[2].estimatedScore.toString(),
                                },
                                ballsInBox: {
                                    N: gameScore[2].ballsInBox.toString(),
                                },
                                defects: {
                                    N: gameScore[2].defects.toString(),
                                },
                                totalScore: {
                                    N: gameScore[2].totalScore.toString(),
                                },
                                delta: {
                                    N: gameScore[2].delta.toString(),
                                },
                            },
                        },
                        {
                            M: {
                                estimatedScore: {
                                    N: gameScore[3].estimatedScore.toString(),
                                },
                                ballsInBox: {
                                    N: gameScore[3].ballsInBox.toString(),
                                },
                                defects: {
                                    N: gameScore[3].defects.toString(),
                                },
                                totalScore: {
                                    N: gameScore[3].totalScore.toString(),
                                },
                                delta: {
                                    N: gameScore[3].delta.toString(),
                                },
                            },
                        },
                        {
                            M: {
                                estimatedScore: {
                                    N: gameScore[4].estimatedScore.toString(),
                                },
                                ballsInBox: {
                                    N: gameScore[4].ballsInBox.toString(),
                                },
                                defects: {
                                    N: gameScore[4].defects.toString(),
                                },
                                totalScore: {
                                    N: gameScore[4].totalScore.toString(),
                                },
                                delta: {
                                    N: gameScore[4].delta.toString(),
                                },
                            },
                        },
                    ],
                },
            },
        };

        try {
            await fetch(apiURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

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
                // audio.play();
                return;
            }

            return () => {
                clearInterval(timerId);
            };
        }
    }, [time, timeTicking, audio, setAudioPlaying]);

    return (
        <div className="h-screen lg:justify-center text-slate-50">
            <span className="text-3xl">{teamName}</span>
            <ScoreTable />
            <footer className="absolute lg:bottom-0 bottom-auto md:ml-[280px] lg:ml-[440px] items-center">
                    <ul className="px-5 md:text-xl lg:text-3xl">
                        <input
                            autoComplete="false"
                            type="radio"
                            id="Two Minute Timer"
                            className="mx-2 md:h-3 md:w-3 lg:h-5 lg:w-5"
                            onClick={() => {
                                setTypeOfTimer("twoMin");
                                handleRadioClick();
                            }}
                        />
                        Two Minute Timer
                        <input
                            autoComplete="false"
                            type="radio"
                            id="One Minute Timer"
                            className="mx-2 md:h-3 md:w-3 lg:h-5 lg:w-5"
                            onClick={() => {
                                setTypeOfTimer("oneMin");
                                handleRadioClick();
                            }}
                        />
                        One Minute Timer
                    </ul>
                    <div className="flex flex-col">
                        {gameIteration === 5 &&
                        gameScore[4].ballsInBox !== 0 ? (
                            <Link
                                to="/end"
                                className="md:text-4xl lg:text-6xl flex justify-center"
                                onClick={handlePutGameScore}
                            >
                                End
                            </Link>
                        ) : typeOfTimer !== "" ? (
                            <button
                                onClick={() => {
                                    setTimeTicking(true);
                                    navigate(
                                        `/game/timer${
                                            typeOfTimer === "oneMin" ? 2 : 1
                                        }`
                                    );
                                }}
                                className="md:text-4xl lg:text-6xl flex justify-center"
                            >
                                Start
                            </button>
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
