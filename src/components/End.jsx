import { useContext } from "react";
import {
    GameScoreContext,
    GameIterationContext,
    TeamNameContext,
} from "../App";

export const End = () => {
    const [gameScore] = useContext(GameScoreContext);
    const [gameIteration] = useContext(GameIterationContext);
    const [teamName] = useContext(TeamNameContext);

    return (
        <div className=" grid h-screen place-items-center text-slate-50">
            <div>
                <span className="text-3xl">{teamName}</span>
                <div className="flex flex-row h-fit justify-center">
                    <div className="border">
                        <div className="ml-36 mt-1 left-0">
                            {[
                                "Estimated Score",
                                "Balls In Box",
                                "Defects",
                                "Total Score",
                                "Delta",
                            ].map((header, key) => (
                                <span
                                    key={key}
                                    className="border md:px-4 md:text-xl lg:text-5xl flex-grow-0 flex-shrink-0 w-auto"
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
                                        className="md:text-2xl lg:text-3xl lg:py-8"
                                    >
                                        <div
                                            iteration={iteration}
                                            className="flex flex-row"
                                        >
                                            <span className="md:w-48 lg:mx-2 md:text-2xl lg:text-3xl">
                                                Iteration {parseInt(iteration + 1)}
                                            </span>
                                            <div
                                                id="estimatedScore"
                                                className="md:w-[140px] md:-ml-[20px] md:mr-[80px] lg:w-76 lg:ml-14 lg:mr-24 text-center"
                                            >
                                                {
                                                    gameScore[currIteration]
                                                        .estimatedScore
                                                }
                                            </div>
                                            <div
                                                id="ballsInBox"
                                                className="md:w-[80px] md:ml-[10px] md:mr-[25px] lg:w-52 lg:ml-20 text-black text-center"
                                            >
                                                {
                                                    gameScore[currIteration]
                                                        .ballsInBox
                                                }
                                            </div>
                                            <div
                                                id="defects"
                                                className="md:-mr-10 md:ml-10 lg:w-32 lg:mr-12 lg:ml-16 text-center"
                                            >
                                                {
                                                    gameScore[currIteration]
                                                        .defects
                                                }
                                            </div>

                                            <div
                                                id="totalScore"
                                                className="md:w-52 md:ml-12 lg:w-56 lg:mr-8 lg:-ml-0 text-center"
                                            >
                                                {gameScore[iteration].ballsInBox -
                                                    gameScore[iteration].defects}
                                            </div>
                                            <div
                                                id="delta"
                                                className="md:w-28 md:mr-1 lg:w-28 lg:mr-1 text-center"
                                            >
                                                {-1 *
                                                    (gameScore[iteration]
                                                        .estimatedScore -
                                                        gameScore[iteration]
                                                            .ballsInBox +
                                                        gameScore[iteration].defects)}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-8xl mx-auto">Thanks for Playing!</div>

        </div>
    );
};

export default End;
