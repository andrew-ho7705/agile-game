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
import { formatTime } from "../utils/Utils";

const Game = () => {
    const [typeOfTimer, setTypeOfTimer] = useContext(TimerContext);
    const [gameIteration, setGameIteration] = useContext(GameIterationContext);
    const [teamName] = useContext(TeamNameContext);
    const [gameScore, setGameScore] = useContext(GameScoreContext);
    const [time, setTime] = useState(0);
    const [timeTicking, setTimeTicking] = useState(false);
    const [audioPlaying, setAudioPlaying] = useState(false);
    const [endpoint, setEndpoint] = useState("");
    const audio = useMemo(() => new Audio(sfx), []);

    useEffect(() => {
        async function fetchServerIP() {
            try {
                const response = await fetch('http://0.0.0.0:5000/check-light');
                const data = await response.json();
                const serverIP = data.ip;
                // Now you can make further calls using this IP
                setEndpoint(`http://${serverIP}:5000/check-light`)
            } catch (error) {
                console.error('Error getting server public IP:', error);
            }
        }
        
        fetchServerIP();
    }, []);

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
                audio.play();
                return;
            }

            return () => {
                clearInterval(timerId);
            };
        }
    }, [time, timeTicking, audio]);

    useEffect(() => {
        if (timeTicking && typeOfTimer === "twoMin") {
            fetch(endpoint)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data.diff);
                    if (data.diff > 3 && typeOfTimer === "twoMin") {
                        console.log("ball detected");
                        setGameScore((prevGameScore) => {
                            const updatedGameScore = [...prevGameScore];
                            updatedGameScore[gameIteration - 1] = {
                                ...updatedGameScore[gameIteration - 1],
                                ballsInBox:
                                    updatedGameScore[gameIteration - 1]
                                        .ballsInBox + 1,
                            };
                            return updatedGameScore;
                        });
                    }
                })
                .catch((error) =>
                    console.error("Error fetching light status:", error)
                );
        }
    }, [typeOfTimer, gameIteration, setGameScore, timeTicking, time, endpoint]);

    return (
        <div className="flex flex-row h-screen justify-center text-slate-50">
            <div>
                <span className="text-3xl">{teamName}</span>
                <div>
                    <ScoreTable />
                    <footer className="absolute bottom-0 ml-80 mb-5 flex flex-row items-center">
                        <div>
                            <ul className="px-5 text-3xl">
                                <input
                                    autoComplete="false"
                                    type="radio"
                                    id="Two Minute Timer"
                                    className="text-6xl mx-2 h-5 w-5"
                                    onClick={() => {
                                        setTypeOfTimer("twoMin");
                                        setTime(60);
                                        handleRadioClick();
                                    }}
                                />
                                Two Minute Timer
                                <input
                                    autoComplete="false"
                                    type="radio"
                                    id="One Minute Timer"
                                    className="mx-2 h-5 w-5"
                                    onClick={() => {
                                        setTypeOfTimer("oneMin");
                                        setTime(15);
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
                                        className="text-6xl flex justify-center"
                                        onClick={handlePutGameScore}
                                    >
                                        End
                                    </Link>
                                ) : !timeTicking && !audioPlaying ? (
                                    <button
                                        onClick={() => setTimeTicking(true)}
                                        className="text-6xl flex justify-center"
                                    >
                                        Start
                                    </button>
                                ) : timeTicking ? '' : (
                                    <button
                                        onClick={() => {
                                            audio.pause();
                                            setAudioPlaying(false);
                                            if (typeOfTimer === 'oneMin') {
                                                setGameIteration(gameIteration + 1);
                                            }
                                        }}
                                        className="text-6xl flex justify-center"
                                    >
                                        {typeOfTimer === 'oneMin' ? 'Next Iteration' : 'Stop Audio'}
                                    </button>
                                )}
                            </div>
                        </div>
                        <div>
                            <div className="text-6xl">
                                {typeOfTimer === "" ? "0:00" : formatTime(time)}
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default Game;
