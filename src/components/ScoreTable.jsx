import { useState } from "react";

export const iterationScores = {
    estimatedScore: 0,
    ballsInBox: 0,
    defects: 0,
};

export const scoreTable = [
    { ...iterationScores },
    { ...iterationScores },
    { ...iterationScores },
    { ...iterationScores },
    { ...iterationScores },
];

const ScoreTable = () => {
    const gameIteration = 5;
    const [gameScore, setGameScore] = useState(scoreTable);

    return (
        <>
            <div className="ml-36">
                {[
                    "Estimated Score",
                    "Balls In Box",
                    "Defects",
                    "Total Score",
                    "∆",
                ].map((header, key) => (
                    <span key={key} className="border px-4">{header}</span>
                ))}
            </div>
            <div>
                {scoreTable.map((score, iteration) => (
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
                                        const updatedScore = [...gameScore];
                                        updatedScore[iteration].estimatedScore =
                                            parseInt(e.target.value);
                                        setGameScore(updatedScore);
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
                                    const updatedScore = [...gameScore];
                                    updatedScore[iteration].ballsInBox =
                                        parseInt(e.target.value);
                                    setGameScore(updatedScore);
                                }}
                            />
                            <input
                                id="defects"
                                type="text"
                                className="border w-20 mx-1 text-black"
                                onChange={(e) => {
                                    const updatedScore = [...gameScore];
                                    updatedScore[iteration].defects = parseInt(
                                        e.target.value
                                    );
                                    setGameScore(updatedScore);
                                }}
                            />
                            <div
                                id="totalScore"
                                className="w-28 mr-1 text-center"
                            >
                                {gameScore[iteration].ballsInBox -
                                    gameScore[iteration].defects}
                            </div>
                            <div id="delta" className="w-10 mr-1 text-center">
                                {-1*(gameScore[iteration].estimatedScore -
                                    (gameScore[iteration].ballsInBox +
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
