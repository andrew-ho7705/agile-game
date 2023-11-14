import { useContext, useEffect } from "react";
import { GameScoreContext, GameIterationContext } from "../App";

const ScoreTable = () => {
    const [gameScore, setGameScore] = useContext(GameScoreContext);
    const [gameIteration] = useContext(GameIterationContext);

    useEffect(() => {
        if (gameIteration >= 2) {
            if (
                gameScore[gameIteration - 1] !== 0 &&
                !isNaN(gameScore[gameIteration - 1])
            ) {
                setGameScore((prevGameScore) => {
                    return prevGameScore.map((score, index) => {
                        if (index === gameIteration - 1) {
                            return {
                                ...score,
                                delta:
                                    -1 *
                                    (prevGameScore[index].estimatedScore -
                                        prevGameScore[index].ballsInBox +
                                        prevGameScore[index].defects),

                                totalScore:
                                    prevGameScore[index].ballsInBox -
                                    prevGameScore[index].defects,
                            };
                        }
                        return score;
                    });
                });
            }
        }
    }, [gameIteration, gameScore, setGameScore]);

    return (
        <div className="text-slate-50">
            <div className="border border-cyan-900 mt-2">
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
                            className="border border-cyan-900 md:px-4 md:text-xl lg:text-5xl flex-grow-0 flex-shrink-0 w-auto"
                        >
                            {header}
                        </span>
                    ))}
                </div>
                <div>
                    {gameScore.map((score, iteration) => {
                        const currIteration = iteration;
                        return (
                            <div
                                id={iteration}
                                key={iteration}
                                hidden={iteration > gameIteration - 1}
                                className="md:text-2xl lg:text-3xl lg:py-9"
                            >
                                <div
                                    iteration={iteration}
                                    className="flex flex-row"
                                >
                                    <span className="md:w-48 lg:mx-2 md:text-2xl lg:text-3xl">
                                        Iteration {parseInt(iteration + 1)}
                                    </span>
                                    {iteration === 0 ? (
                                        <div
                                            id="estimated"
                                            className="md:w-[180px] md:ml-[35px] lg:w-76 lg:ml-5 lg:mr-12 text-center"
                                        >
                                            {score.estimatedScore}
                                        </div>
                                    ) : iteration === gameIteration - 1 ? (
                                        <input
                                            autoComplete="false"
                                            id="estimatedScore"
                                            type="number"
                                            className="border md:w-[180px] md:h-fit md:ml-[65px] lg:w-76 lg:ml-5 lg:mr-10 text-center"
                                            value={
                                                isNaN(
                                                    gameScore[iteration]
                                                        .estimatedScore
                                                )
                                                    ? ""
                                                    : gameScore[iteration]
                                                        .estimatedScore
                                            }
                                            onChange={(e) => {
                                                setGameScore(
                                                    (prevGameScore) => {
                                                        return prevGameScore.map(
                                                            (score, index) => {
                                                                if (
                                                                    index ===
                                                                    iteration
                                                                ) {
                                                                    return {
                                                                        ...score,
                                                                        estimatedScore:
                                                                            parseInt(
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            ),
                                                                    };
                                                                } else {
                                                                    return score;
                                                                }
                                                            }
                                                        );
                                                    }
                                                );
                                            }}
                                        />
                                    ) : (
                                        <div
                                            id="estimatedScore"
                                            className="border md:w-[180px] md:ml-[65px] md:mr-10 lg:w-76 lg:ml-5 text-center"
                                        >
                                            {
                                                gameScore[currIteration]
                                                    .estimatedScore
                                            }
                                        </div>
                                    )}
                                    <div
                                        id="ballsInBox"
                                        className="border md:w-[140px] md:ml-10 lg:w-52 lg:ml-20 text-black text-center"
                                    >
                                        {
                                            gameScore[currIteration]
                                                .ballsInBox
                                        }
                                    </div>
                                    {iteration > gameIteration - 2 ? (
                                        <input
                                            autoComplete="false"
                                            id="defects"
                                            type="number"
                                            className="border border-red-700 md:w-[100px] md:h-fit md:-ml-12 md:-mr-12 lg:w-32 lg:mr-12 lg:ml-16 text-center"
                                            onChange={(e) => {
                                                setGameScore(
                                                    (prevGameScore) => {
                                                        return prevGameScore.map(
                                                            (score, index) => {
                                                                if (
                                                                    index ===
                                                                    iteration
                                                                ) {
                                                                    return {
                                                                        ...score,
                                                                        defects:
                                                                            parseInt(
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            ) |
                                                                            0,
                                                                    };
                                                                } else {
                                                                    return score;
                                                                }
                                                            }
                                                        );
                                                    }
                                                );
                                            }}
                                        />
                                    ) : (
                                        <div
                                            id="defects"
                                            className="md:-mr-10 lg:w-32 lg:mr-12 lg:ml-16 text-center"
                                        >
                                            {gameScore[currIteration].defects}
                                        </div>
                                    )}
                                    <div
                                        id="totalScore"
                                        className="md:w-52 md:ml-12 lg:w-56 lg:mr-8 lg:-ml-0 text-center"
                                    >
                                        {isNaN(
                                            gameScore[iteration].ballsInBox -
                                            gameScore[iteration].defects
                                        )
                                            ? 0
                                            : gameScore[iteration].ballsInBox -
                                            gameScore[iteration].defects}
                                    </div>
                                    <div
                                        id="delta"
                                        className="md:w-28 md:mr-1 lg:w-28 lg:mr-1 text-center"
                                    >
                                        {isNaN(
                                            -1 *
                                            (gameScore[iteration]
                                                .estimatedScore -
                                                gameScore[iteration]
                                                    .ballsInBox +
                                                gameScore[iteration]
                                                    .defects)
                                        )
                                            ? 0
                                            : -1 *
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
    );
};

export default ScoreTable;
