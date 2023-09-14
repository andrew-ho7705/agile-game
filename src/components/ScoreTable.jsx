import { useContext } from "react";
import { GameScoreContext, GameIterationContext } from "../App";

const ScoreTable = () => {
    const [gameScore, setGameScore] = useContext(GameScoreContext);
    const [gameIteration] = useContext(GameIterationContext);

    return (
        <>
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
                    <div key={iteration} hidden={iteration > gameIteration - 1}>
                        <div iteration={iteration} className="flex flex-row">
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
                            ) : (
                                <input
                                    id="estimatedScore"
                                    type="text"
                                    className="border w-36 mr-2 align-middle text-black"
                                    inputMode="numeric"
                                    onChange={(e) => {
                                        setGameScore((prevGameScore) => {
                                            return prevGameScore.map(
                                                (score, index) => {
                                                    if (index === iteration) {
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
                            )}
                            {/* <div
                                id="ballsInBox"
                                className="w-28 mr-2 text-center"
                            >
                                {score.ballsInBox}
                            </div> */}
                            <input
                                id="ballsInBox"
                                type="text"
                                className="border w-28 mr-2 text-black"
                                onChange={(e) => {
                                    setGameScore((prevGameScore) => {
                                        return prevGameScore.map(
                                            (score, index) => {
                                                if (index === iteration) {
                                                    return {
                                                        ...score,
                                                        ballsInBox: parseInt(
                                                            e.target.value
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
                            <input
                                id="defects"
                                type="text"
                                className="border w-20 mx-1 text-black"
                                onChange={(e) => {
                                    setGameScore((prevGameScore) => {
                                        return prevGameScore.map(
                                            (score, index) => {
                                                if (index === iteration) {
                                                    return {
                                                        ...score,
                                                        defects: parseInt(
                                                            e.target.value
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
                            <div
                                id="totalScore"
                                className="w-28 mr-1 text-center"
                            >
                                {gameScore[gameIteration - 1].defects === 0 || isNaN(gameScore[gameIteration - 1].defects)
                                    ? 0
                                    : gameScore[iteration].ballsInBox -
                                      gameScore[iteration].defects}
                            </div>
                            <div id="delta" className="w-10 mr-1 text-center">
                                {gameScore[gameIteration - 1].defects === 0 || isNaN(gameScore[gameIteration - 1].defects)
                                    ? 0
                                    : -1 * 
                                      ((gameScore[iteration].estimatedScore -
                                          gameScore[iteration].ballsInBox +
                                              gameScore[iteration].defects))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default ScoreTable;
