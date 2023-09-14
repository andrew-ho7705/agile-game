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
                                    prevGameScore[index].defects === 0 ||
                                    isNaN(prevGameScore[index].defects)
                                        ? 0
                                        : -1 *
                                          (prevGameScore[index].estimatedScore -
                                              prevGameScore[index].ballsInBox +
                                              prevGameScore[index].defects),

                                totalScore:
                                    prevGameScore[index].defects === 0 ||
                                    isNaN(prevGameScore[index].defects)
                                        ? 0
                                        : prevGameScore[index].ballsInBox -
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
        <div>
            <div className="border">
                <div className="ml-36">
                    {[
                        "Estimated Score",
                        "Balls In Box",
                        "Defects",
                        "Total Score",
                        "Delta",
                    ].map((header, key) => (
                        <span key={key} className="border px-4">
                            {header}
                        </span>
                    ))}
                </div>
                <div>
                    {gameScore.map((score, iteration) => (
                        <div
                            key={iteration}
                            hidden={iteration > gameIteration - 1}
                        >
                            <div
                                iteration={iteration}
                                className="flex flex-row"
                            >
                                <span className="px-9">
                                    {"Iteration " + parseInt(iteration + 1)}
                                </span>
                                {iteration === 0 ? (
                                    <div
                                        id="estimated"
                                        className="w-36 mr-2 text-center"
                                    >
                                        {score.estimatedScore}
                                    </div>
                                ) : iteration > gameIteration - 2 ? (
                                    <input
                                        id="estimatedScore"
                                        type="text"
                                        className="border w-36 mr-2 align-middle text-black text-center"
                                        value={gameScore[iteration].estimatedScore.toString() | " "}
                                        onChange={(e) => {
                                            setGameScore((prevGameScore) => {
                                                return prevGameScore.map(
                                                    (score, index) => {
                                                        if (
                                                            index === iteration
                                                        ) {
                                                            return {
                                                                ...score,
                                                                estimatedScore:
                                                                    parseInt(
                                                                        e.target
                                                                            .value
                                                                    ),
                                                            };
                                                        } else {
                                                            return score;
                                                        }
                                                    }
                                                );
                                            });
                                        }}
                                    />
                                ): 
                                (
                                    <div
                                        id="estimatedScore"
                                        className="w-36 mr-2 text-black text-center"
                                    >
                                        {
                                            gameScore[gameIteration - 2]
                                                .estimatedScore | 0
                                        }
                                    </div>
                                )}
                                {iteration > gameIteration - 2 ? (
                                    <input
                                        id="ballsInBox"
                                        type="text"
                                        className="border w-28 mr-2 text-black text-center"
                                        onChange={(e) => {
                                            setGameScore((prevGameScore) => {
                                                return prevGameScore.map(
                                                    (score, index) => {
                                                        if (
                                                            index === iteration
                                                        ) {
                                                            return {
                                                                ...score,
                                                                ballsInBox:
                                                                    parseInt(
                                                                        e.target
                                                                            .value
                                                                    ) | 0,
                                                            };
                                                        } else {
                                                            return score;
                                                        }
                                                    }
                                                );
                                            });
                                        }}
                                    />
                                ) : (
                                    <div
                                        id="ballsInBox"
                                        className="w-28 mr-2 text-black text-center"
                                    >
                                        {
                                            gameScore[gameIteration - 2]
                                                .ballsInBox
                                        }
                                    </div>
                                )}

                                {iteration > gameIteration - 2 || iteration === 6 ? (
                                    <input
                                        id="defects"
                                        type="text"
                                        className="border w-20 mx-1 text-black text-center"
                                        onChange={(e) => {
                                            setGameScore((prevGameScore) => {
                                                return prevGameScore.map(
                                                    (score, index) => {
                                                        if (
                                                            index === iteration
                                                        ) {
                                                            return {
                                                                ...score,
                                                                defects:
                                                                    parseInt(
                                                                        e.target
                                                                            .value
                                                                    ) | 0,
                                                            };
                                                        } else {
                                                            return score;
                                                        }
                                                    }
                                                );
                                            });
                                        }}
                                    />
                                ) : (
                                    <div
                                        id="defects"
                                        className="w-20 mr-2 text-black text-center"
                                    >
                                        {gameScore[gameIteration - 2].defects}
                                    </div>
                                )}
                                <div
                                    id="totalScore"
                                    className="w-28 mr-1 text-center"
                                >
                                    {gameScore[iteration].ballsInBox -
                                        gameScore[iteration].defects}
                                </div>
                                <div
                                    id="delta"
                                    className="w-16 mr-1 text-center"
                                >
                                    {-1 *
                                        (gameScore[iteration].estimatedScore -
                                            gameScore[iteration].ballsInBox +
                                            gameScore[iteration].defects)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ScoreTable;
