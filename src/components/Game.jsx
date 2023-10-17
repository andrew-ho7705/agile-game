import { useContext } from "react";
import { Link } from "react-router-dom";
import ScoreTable from "./ScoreTable";
import {
    TimerContext,
    GameIterationContext,
    TeamNameContext,
    GameScoreContext,
} from "../App";

const Game = () => {
    const [typeOfTimer, setTypeOfTimer] = useContext(TimerContext);
    const [gameIteration] = useContext(GameIterationContext);
    const [teamName] = useContext(TeamNameContext);
    const [gameScore] = useContext(GameScoreContext);

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

    return (
        <div className="flex flex-row h-screen justify-center text-slate-50">
            <div>
                <span className="text-3xl">{teamName}</span>
                <div>
                    <ScoreTable />
                    <footer className="absolute bottom-0 ml-80 px-24 mb-5">
                        <div>
                            <ul className="px-5 text-3xl">
                                <input
                                    autoComplete="false"
                                    type="radio"
                                    id="Two Minute Timer"
                                    className="text-6xl mx-2 h-5 w-5"
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
                                    className="mx-2 h-5 w-5"
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
                                        className="text-6xl flex justify-center"
                                        onClick={handlePutGameScore}
                                    >
                                        End
                                    </Link>
                                ) : (
                                    <Link
                                        to={
                                            typeOfTimer === "oneMin"
                                                ? "timer2"
                                                : typeOfTimer === ""
                                                ? null
                                                : "timer1"
                                        }
                                        className="text-6xl flex justify-center"
                                    >
                                        Start
                                    </Link>
                                )}
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default Game;
