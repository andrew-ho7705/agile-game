import { useContext } from "react";
import {
    GameScoreContext,
    GameIterationContext,
    TeamNameContext,
} from "../App";
import { Link } from "react-router-dom";
import { scoreTable } from "../App";

export const End = () => {
    const [gameScore, setGameScore] = useContext(GameScoreContext);
    const [gameIteration] = useContext(GameIterationContext);
    const [teamName] = useContext(TeamNameContext);

    return (
        <div className="flex flex-row h-screen justify-center text-slate-50">
            <div>
                <span className="text-3xl">{teamName}</span>
                <div className="flex flex-row h-fit justify-center">
                    <div className="border border-cyan-900">
                        <div className="ml-36">
                            {[
                                "Estimated Score",
                                "Balls In Box",
                                "Defects",
                                "Total Score",
                                "Delta",
                            ].map((header, key) => (
                                <span
                                    key={key}
                                    className="border px-4 text-5xl border-cyan-900"
                                >
                                    {header}
                                </span>
                            ))}
                        </div>
                        <div>
                            {gameScore.map((_, iteration) => {
                                const currIteration = iteration;
                                return (
                                    <div
                                        id={iteration}
                                        key={iteration}
                                        hidden={iteration > gameIteration - 1}
                                        className="text-3xl py-8"
                                    >
                                        <div
                                            iteration={iteration}
                                            className="flex flex-row"
                                        >
                                            <span className="mx-2 text-3xl">
                                                {"Iteration " +
                                                    parseInt(iteration + 1)}
                                            </span>
                                            <div
                                                id="estimatedScore"
                                                className="w-80 ml-6 mr-12 text-center"
                                            >
                                                {
                                                    gameScore[currIteration]
                                                        .estimatedScore
                                                }
                                            </div>
                                            <div
                                                id="ballsInBox"
                                                className="w-52 ml-2 mr-14 text-black text-center"
                                            >
                                                {
                                                    gameScore[currIteration]
                                                        .ballsInBox
                                                }
                                            </div>
                                            <div
                                                id="defects"
                                                className="w-32 mr-12 text-center"
                                            >
                                                {
                                                    gameScore[currIteration]
                                                        .defects
                                                }
                                            </div>

                                            <div
                                                id="totalScore"
                                                className="w-56 mr-8 text-center"
                                            >
                                                {
                                                    gameScore[currIteration]
                                                        .totalScore
                                                }
                                            </div>
                                            <div
                                                id="delta"
                                                className="w-28 mr-1 text-center"
                                            >
                                                {gameScore[currIteration].delta}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <footer className="absolute bottom-0 left-1/3 mb-7">
                    <h1 className="text-6xl mt-10 mb-3">Thanks for Playing!</h1>
                    <Link
                        to="/"
                        onClick={setGameScore(scoreTable)}
                        className="text-5xl w-fit ml-28"
                    >
                        New Game?
                    </Link>
                </footer>
            </div>
        </div>
    );
};

export default End;
