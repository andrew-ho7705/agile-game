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
                            className="border border-cyan-900 px-4 text-3xl md:text-4xl lg:text-5xl flex-grow-0 flex-shrink-0 w-auto"
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
                                className="text-3xl py-8"
                            >
                                <div
                                    iteration={iteration}
                                    className="flex flex-row"
                                >
                                    <span className="mx-2 text-xl md:text-2xl lg:text-3xl">
                                        {"Iteration " + parseInt(iteration + 1)}
                                    </span>
                                    {iteration === 0 ? (
                                        <div
                                            id="estimated"
                                            className="w-80 ml-6 mr-12 text-center"
                                        >
                                            {score.estimatedScore}
                                        </div>
                                    ) : iteration === gameIteration - 1 ? (
                                        <input
                                            autoComplete="false"
                                            id="estimatedScore"
                                            type="number"
                                            className="border w-80 ml-5 mr-12 text-center"
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
                                            className="w-80 ml-5 mr-12 text-center"
                                        >
                                            {
                                                gameScore[currIteration]
                                                    .estimatedScore
                                            }
                                        </div>
                                    )}
                                    {iteration > gameIteration - 2 ? (
                                        <input
                                            autoComplete="false"
                                            id="ballsInBox"
                                            type="number"
                                            className="border border-red-700 w-52 ml-2 mr-14 text-center"
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
                                                                        ballsInBox:
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
                                            id="ballsInBox"
                                            className="w-52 ml-2 mr-14 text-black text-center"
                                        >
                                            {
                                                gameScore[currIteration]
                                                    .ballsInBox
                                            }
                                        </div>
                                    )}

                                    {iteration > gameIteration - 2 ? (
                                        <input
                                            autoComplete="false"
                                            id="defects"
                                            type="number"
                                            className="border border-red-700 w-32 mr-12 text-center"
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
                                            className="w-32 mr-12 text-center"
                                        >
                                            {gameScore[currIteration].defects}
                                        </div>
                                    )}
                                    <div
                                        id="totalScore"
                                        className="w-56 mr-8 text-center"
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
                                        className="w-28 mr-1 text-center"
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
